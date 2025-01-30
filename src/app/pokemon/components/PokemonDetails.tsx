"use client";

import { PokeAPI } from "pokeapi-types";
import { PokemonTypeDetails } from "./PokemonTypeDetails";

interface PokemonDetailsProps {
  details: PokeAPI.Pokemon;
}

export function PokemonDetails({ details }: PokemonDetailsProps) {
  const { types } = details;

  return (
    <div className="flex flex-col gap-4">
      <PokemonTypeDetails types={types} />
    </div>
  );
}
