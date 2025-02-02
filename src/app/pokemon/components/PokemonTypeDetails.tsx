"use client";

import { Badge } from "@/components/ui/badge";
import { PokeAPI } from "pokeapi-types";

interface PokemonDetailsProps {
  types: PokeAPI.PokemonType[];
}

export default function PokemonTypeDetails({ types }: PokemonDetailsProps) {
  return (
    <div className="flex gap-1 items-center">
      <span>Type:</span>
      {types.map(({ slot, type }) => (
        <div key={slot}>
          <Badge className="capitalize">{type.name}</Badge>
        </div>
      ))}
    </div>
  );
}
