"use client";

import { PokeAPI } from "pokeapi-types";
import PokemonMoves from "./PokemonMoves";
import PokemonStatsDetails from "./PokemonStatsDetails";
import PokemonStatsTable from "./PokemonStatsTable";
import PokemonTypeDetails from "./PokemonTypeDetails";
import PokemonEvolutions from "./PokemonEvolutions";

interface PokemonDetailsProps {
  details: PokeAPI.Pokemon;
}

export default function PokemonDetails({ details }: PokemonDetailsProps) {
  const { id, height, moves, name, stats, types, weight } = details;

  return (
    <div className="flex flex-col gap-4">
      <PokemonTypeDetails types={types} />
      <PokemonStatsTable id={id} weight={weight} height={height} />
      <PokemonMoves moves={moves} />
      <PokemonStatsDetails stats={stats} />
      <PokemonEvolutions name={name} />
      {/* Weaknesses */}
    </div>
  );
}
