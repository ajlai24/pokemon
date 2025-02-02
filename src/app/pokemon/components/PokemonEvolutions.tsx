"use client";

import { PokeAPI } from "pokeapi-types";
import { getPokemonEvolutions } from "../services/pokemon";
import { useQuery } from "@tanstack/react-query";
import CenteredLoader from "@/components/CenteredLoader";
import Link from "next/link";
import React from "react";

interface PokemonEvolutionsProps {
  name: PokeAPI.Pokemon["name"];
}

function findEvolutionsAfter(chain: PokeAPI.ChainLink, name: string) {
  let found = false;
  const result: string[] = [];

  function traverseEvolution(chain: PokeAPI.ChainLink) {
    if (!chain) return;

    if (found) {
      result.push(chain.species.name); // Add all subsequent evolutions after the name is found
    }

    if (chain.species.name === name) {
      found = true;
    }

    // Recursively check the evolutions
    if (chain.evolves_to && chain.evolves_to.length > 0) {
      for (const evolution of chain.evolves_to) {
        traverseEvolution(evolution);
      }
    }
  }

  traverseEvolution(chain);
  return result;
}

export default function PokemonEvolutions({ name }: PokemonEvolutionsProps) {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["pokemonEvolutions", name],
    queryFn: () => getPokemonEvolutions(name),
  });

  const EvolutionContent = () => {
    if (isLoading) {
      return (
        <div className="col-span-full h-full">
          <CenteredLoader />
        </div>
      );
    }
    if (isError) {
      return <div>Failed to load evolutions</div>;
    }
    const evolutionChain = data?.chain;
    const evolutions = evolutionChain
      ? findEvolutionsAfter(evolutionChain, name)
      : [];

    return (
      <div>
        {evolutions.length === 0 && <div>None</div>}
        <div className="flex gap-2">
          {evolutions.map((name, index) => (
            <React.Fragment key={name}>
              <Link
                href={`/pokemon/${name}`}
                className="capitalize text-blue-500"
              >
                {name}
              </Link>
              {index < evolutions.length - 1 && <span className="mx-2">→</span>}
            </React.Fragment>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div>
      <h2 className="text-xl">Evolutions</h2>
      <EvolutionContent />
    </div>
  );
}
