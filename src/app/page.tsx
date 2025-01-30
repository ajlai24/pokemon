import PokeDex from "./pokemon/components/PokeDex";
import {
  fetchPokemon,
  fetchPokemonTypes,
  ITEMS_PER_PAGE,
} from "./pokemon/services/pokemon";

export default async function Home() {
  // Initial list of pokemon
  const filters = {
    limit: ITEMS_PER_PAGE.toString(),
    offset: "0",
  };
  const pokemonData = await fetchPokemon(filters);

  // Get Pokemon types for filters
  const pokemonTypes = await fetchPokemonTypes();

  return (
    <PokeDex
      initialPokemonData={pokemonData}
      initialPokemonTypes={pokemonTypes}
    />
  );
}
