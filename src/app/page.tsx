import PokeDex from "./pokemon/components/PokeDex";
import {
  fetchAllPokemonNames,
  fetchPokemon,
  fetchPokemonTypes,
  ITEMS_PER_PAGE,
} from "./pokemon/services/pokemon";

export default async function Home() {
  // Fetch data on server
  // Initial list of pokemon
  const filters = {
    limit: ITEMS_PER_PAGE.toString(),
    offset: "0",
  };
  const pokemonData = await fetchPokemon(filters);

  // Get Pokemon types for filters
  const pokemonTypes = await fetchPokemonTypes();

  // Get all Pokemon names for search
  const allPokemonNames = await fetchAllPokemonNames();

  return (
    <PokeDex
      initialPokemonData={pokemonData}
      initialPokemonTypes={pokemonTypes}
      allPokemonNames={allPokemonNames}
    />
  );
}
