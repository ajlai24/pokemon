"use client";

import { PokeAPI } from "pokeapi-types";
import PokemonMoves from "./PokemonMoves";
import PokemonStatsDetails from "./PokemonStatsDetails";
import PokemonStatsTable from "./PokemonStatsTable";
import PokemonTypeDetails from "./PokemonTypeDetails";
import PokemonEvolutions from "./PokemonEvolutions";
import PokemonWeaknesses from "./PokemonWeaknesses";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import PokemonImage from "./PokemonImage";

interface PokemonDetailsProps {
  details: PokeAPI.Pokemon;
  showBackNav?: boolean;
}

export default function PokemonDetails({
  details,
  showBackNav = false,
}: PokemonDetailsProps) {
  const router = useRouter();
  const { id, height, moves, name, species, sprites, stats, types, weight } =
    details;

  return (
    <div className="flex flex-col gap-4">
      {showBackNav && (
        <>
          <button
            onClick={() => router.back()}
            className="flex items-center gap-2 px-4 py-2 text-sm font-medium bg-gray-100 rounded-lg hover:bg-gray-200"
          >
            <ArrowLeft size={16} />
            Back
          </button>
          <h2 className="text-xl capitalize text-center">{name}</h2>
        </>
      )}
      <PokemonImage src={sprites.front_default} alt={name || ""} />
      <PokemonTypeDetails types={types} />
      <PokemonStatsTable id={id} weight={weight} height={height} />
      <PokemonMoves moves={moves} />
      <PokemonStatsDetails stats={stats} />
      <PokemonEvolutions species={species} />
      <PokemonWeaknesses types={types} />
    </div>
  );
}
