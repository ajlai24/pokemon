import PokeDex from "./pokemon/components/PokeDex";
import { fetchPokemon } from "./pokemon/services/pokemon";

export default async function Home() {
  const filters = {
    limit: "24",
    offset: "0",
  };
  const pokemonData = await fetchPokemon(filters);

  return <PokeDex initialPokemonData={pokemonData} />;
}
