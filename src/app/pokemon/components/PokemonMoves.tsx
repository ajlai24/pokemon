"use client";

import { Badge } from "@/components/ui/badge";
import { PokeAPI } from "pokeapi-types";

interface PokemonMovesProps {
  moves: PokeAPI.PokemonMove[];
}

export default function PokemonMoves({ moves }: PokemonMovesProps) {
  return (
    <div className="flex flex-wrap gap-1 items-center">
      <span className="text-xs">Moves:</span>
      {moves.map(({ move: { name } }) => (
        <div key={name}>
          <Badge>{name}</Badge>
        </div>
      ))}
    </div>
  );
}
