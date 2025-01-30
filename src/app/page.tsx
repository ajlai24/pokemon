import PokeDex from "./pokemon/components/PokeDex";
import { fetchPokemon, fetchPokemonTypes } from "./pokemon/services/pokemon";

export default async function Home() {
  const filters = {
    limit: "24",
    offset: "0",
  };
  const pokemonData = await fetchPokemon(filters);

  const pokemonTypes = await fetchPokemonTypes();

  return (
    <PokeDex
      initialPokemonData={pokemonData}
      initialPokemonTypes={pokemonTypes}
    />
  );
}
