import { PokeAPI } from "pokeapi-types";
import { PokemonListResponse, PokemonRowType } from "../types";

export const ITEMS_PER_PAGE = 24;

interface PokemonFetchFilters {
  limit?: string;
  offset?: string;
  [key: string]: string | undefined; // To handle additional dynamic filters
}

/**
 * Get paginated Pokemon list
 * @param filters
 * @returns
 */
export const fetchPokemon = async (
  filters: PokemonFetchFilters
): Promise<PokemonListResponse> => {
  const { limit = "24", offset = "0" } = filters;
  const res = await fetch(
    `https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`
  );

  if (!res.ok) {
    throw new Error("Failed to fetch Pokémon list");
  }

  const data = await res.json();

  const results = data.results.map((item: { name: string; url: string }) => ({
    id: item.url.match(/\/(\d+)\//)?.[1], // Extract the ID from the URL
    name: item.name,
    url: item.url,
  }));

  return { ...data, results };
};

/**
 * Fetches all Pokemon types for filtering
 * @returns {Promise<PokeAPI.PokemonType["type"][]>}  A promise that resolves to an array of Pokemon types
 */
export const fetchPokemonTypes = async (): Promise<
  PokeAPI.PokemonType["type"][]
> => {
  const res = await fetch("https://pokeapi.co/api/v2/type/");
  if (!res.ok) {
    throw new Error("Failed to fetch Pokémon types");
  }
  const data = await res.json();
  return data.results;
};

/**
 * Fetch pokemon list by type
 * @param type
 * @param limit
 * @returns {Promise<PokeAPI.TypePokemon["pokemon"][]>} A promise that resolves to list of pokemon by type
 */
const fetchPokemonByType = async (
  type: string,
  offset: number,
  limit = ITEMS_PER_PAGE
): Promise<PokeAPI.TypePokemon["pokemon"][]> => {
  const response = await fetch(
    `https://pokeapi.co/api/v2/type/${type}?offset=${offset}&limit=${limit}`
  );
  const data = await response.json();

  // Extract the Pokémon from the type response
  const pokemonList = data.pokemon.map(
    (entry: { pokemon: { name: string; url: string } }) => entry.pokemon
  );

  return pokemonList;
};

/**
 * Fetches all Pokemon of provided list of types (fire, water, electric, etc.)
 * It doesn't look like the API has a way to filter the pokemon endpoint with type params
 * so this is used to fetch all pokemon of selected types, aggregate them, and ensure there are no duplicates
 * @param types
 * @returns {Promise<PokemonRowType[]>} A promise that resolves to a whole list of all pokemon by provided types with no duplicates
 */
export const fetchPokemonByTypes = async (
  types: string[]
): Promise<PokemonRowType[]> => {
  const promises = types.map((type) => fetchPokemonByType(type, 0, 10000));
  const results = await Promise.all(promises);

  const allPokemon = results.flat();
  const uniquePokemon = Array.from(
    new Map(allPokemon.map((item) => [item.name, item])).values()
  );
  const formattedPokemon = uniquePokemon.map((item) => {
    const id = item.url.match(/\/(\d+)\/?$/)?.[1] ?? ""; // Extract ID from the URL
    return {
      id,
      name: item.name,
      url: item.url,
    };
  });

  return formattedPokemon;
};
