"use client";

import CenteredLoader from "@/components/CenteredLoader";
import { Badge } from "@/components/ui/badge";
import { useQuery } from "@tanstack/react-query";
import { PokeAPI } from "pokeapi-types";
import { getPokemonWeaknesses } from "../services/pokemon";

interface PokemonEvolutionsProps {
  types: PokeAPI.PokemonType[];
}

export default function PokemonWeaknesses({ types }: PokemonEvolutionsProps) {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["pokemonWeaknesses"],
    queryFn: () => getPokemonWeaknesses(types),
  });

  const WeaknessesContent = () => {
    if (isLoading) {
      return (
        <div className="col-span-full h-full">
          <CenteredLoader />
        </div>
      );
    }

    if (isError) {
      return <div>Failed to load weaknesses</div>;
    }
    return (
      <div className="flex flex-wrap gap-1">
        {data?.map((weakness) => (
          <Badge key={weakness} className="capitalize">
            {weakness}
          </Badge>
        ))}
      </div>
    );
  };

  return (
    <div>
      <h2 className="text-xl">Weaknesses</h2>
      <WeaknessesContent />
    </div>
  );
}
