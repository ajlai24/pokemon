"use client";

import { Badge } from "@/components/ui/badge";
import { PokeAPI } from "pokeapi-types";

interface PokemonDetailsProps {
  types: PokeAPI.PokemonType[];
}

export function PokemonTypeDetails({ types }: PokemonDetailsProps) {
  return (
    <div className="flex gap-1 items-center">
      <span className="text-xs">Type:</span>
      {types.map(({ slot, type }) => (
        <div key={slot}>
          <Badge>{type.name}</Badge>
        </div>
      ))}
    </div>
  );
}
