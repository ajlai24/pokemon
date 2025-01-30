import { PokeAPI } from "pokeapi-types";
import { PokemonListResponse } from "../types";

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
