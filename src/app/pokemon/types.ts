import { PokeAPI } from "pokeapi-types";

export interface PokemonRowType extends PokeAPI.NamedAPIResource {
  id: string;
}

export interface PokemonListResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: PokemonRowType[];
}
