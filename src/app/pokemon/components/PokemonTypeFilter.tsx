"use client";

import { Checkbox } from "@/components/ui/checkbox";
import { useFiltersStore } from "@/stores/useFilterStore";
import { PokeAPI } from "pokeapi-types";

interface PokemonTypeFilterProps {
  types?: PokeAPI.PokemonType["type"][];
}

export default function PokemonTypeFilter({ types }: PokemonTypeFilterProps) {
  const { selectedTypes, toggleSelectedType } = useFiltersStore();

  const handleCheckboxChange = async (
    value: PokeAPI.PokemonType["type"]["name"]
  ) => {
    await toggleSelectedType(value);
  };

  return (
    <div>
      {types?.map(({ name }) => (
        <div key={name} className="flex items-center space-x-2 pb-2">
          <Checkbox
            className="w-6 h-6 text-xl"
            id={name}
            checked={selectedTypes?.[name] || false}
            onCheckedChange={() => handleCheckboxChange(name)}
          />
          <label
            htmlFor={name}
            className="font-medium leading-none cursor-pointer capitalize"
          >
            {name}
          </label>
        </div>
      ))}
    </div>
  );
}
