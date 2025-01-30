"use client";

import { AutoComplete, Option } from "@/components/Autocomplete";
import { useRouter } from "next/navigation";
import { PokeAPI } from "pokeapi-types";
import { useState } from "react";

interface PokemonSearchProps {
  allPokemonNames: PokeAPI.NamedAPIResource["name"][];
}

export default function PokemonSearch({ allPokemonNames }: PokemonSearchProps) {
  const [loadingSuggestions, setLoadingSuggestions] = useState(false);
  const [searchSuggestions, setSearchSuggestions] = useState<Option[]>([]);
  const router = useRouter();

  const handleQueryChange = async (searchInput: string) => {
    setLoadingSuggestions(true);

    const suggestions = [];
    for (const name of allPokemonNames) {
      if (name.startsWith(searchInput)) {
        suggestions.push({
          value: name,
          label: name,
        });
      }
    }
    setSearchSuggestions(suggestions.slice(0, 5) || []);
    setLoadingSuggestions(false);
  };

  const handleSelect = (option: Option | undefined) => {
    if (option) {
      router.push(`/pokemon/${option?.value}`);
    }
  };

  return (
    <AutoComplete
      options={searchSuggestions}
      emptyMessage="No results."
      placeholder="Search..."
      isLoading={loadingSuggestions}
      onQueryChange={handleQueryChange}
      onSelect={handleSelect}
    />
  );
}
