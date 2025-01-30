import { PokeAPI } from "pokeapi-types";
import { create } from "zustand";

export type SelectedFilters = Record<
  PokeAPI.PokemonType["type"]["name"],
  boolean
>;

interface FilterStore {
  selectedTypes: SelectedFilters;
  toggleSelectedType: (type: PokeAPI.PokemonType["type"]["name"]) => void;
  hasSelectedTypes: boolean;
  searchInput: string;
  setSearchInput: (input: string) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

export const useFiltersStore = create<FilterStore>((set) => ({
  selectedTypes: {},
  toggleSelectedType: (type) =>
    set((state) => {
      const newFilters = { ...state.selectedTypes };
      newFilters[type] = !newFilters[type];
      return { selectedTypes: newFilters };
    }),
  hasSelectedTypes: false,
  searchInput: "",
  setSearchInput: (input) => set({ searchInput: input }),
  searchQuery: "",
  setSearchQuery: (query) => set({ searchQuery: query }),
}));

export const useHasSelectedTypes = () => {
  const selectedTypes = useFiltersStore((state) => state.selectedTypes);
  return Object.values(selectedTypes).some((value) => value === true);
};
