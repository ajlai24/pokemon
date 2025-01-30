"use client";

import LoadMore from "@/components/LoadMore";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { PokeAPI } from "pokeapi-types";
import { fetchPokemon, fetchPokemonTypes } from "../services/pokemon";
import { PokemonListResponse } from "../types";
import PokemonSidebar from "./PokemonSidebar";
import PokemonTable from "./PokemonTable";
import { useHasSelectedTypes } from "@/stores/useFilterStore";
import FilteredPokemon from "./FilteredPokemon";

interface PokeDexProps {
  initialPokemonData: PokemonListResponse;
  initialPokemonTypes: PokeAPI.PokemonType["type"][];
}

export default function PokeDex({
  initialPokemonData,
  initialPokemonTypes,
}: PokeDexProps) {
  const hasSelectedTypes = useHasSelectedTypes();

  const {
    data: pokemonTypes,
    isLoading: isLoadingTypes,
    isError: isErrorTypes,
  } = useQuery({
    queryKey: ["pokemonTypes"],
    queryFn: fetchPokemonTypes,
    initialData: initialPokemonTypes,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isError,
  } = useInfiniteQuery({
    queryKey: ["pokemonList"],
    queryFn: ({ pageParam = 0 }) => {
      const filters = {
        limit: "24",
        offset: (pageParam * 24).toString(),
      };

      return fetchPokemon(filters);
    },
    initialPageParam: 0,
    initialData: {
      pages: [initialPokemonData],
      pageParams: [0],
    },
    getNextPageParam: (lastPage, allPages, lastPageParam) => {
      const totalFetched = lastPage.results.length;

      // If there are more Pokémon to fetch (more than the current fetched count), fetch the next page
      return totalFetched < lastPage.count ? lastPageParam + 1 : undefined;
    },
    getPreviousPageParam: (lastPage, allPages, lastPageParam) => {
      return lastPageParam === 0 ? undefined : lastPageParam - 1;
    },
    enabled: hasSelectedTypes,
  });

  if (isError) return <div>Uh oh - something went wrong</div>;

  const pokemonList = data?.pages.flatMap((page) => page.results) || [];

  if (pokemonList.length === 0) {
    return <div className="pt-4">0 Results</div>;
  }

  return (
    <>
      <PokemonSidebar
        pokemonTypes={pokemonTypes}
        isLoadingTypes={isLoadingTypes}
        isErrorTypes={isErrorTypes}
      />
      <div className="w-full p-2">
        {hasSelectedTypes ? (
          <FilteredPokemon />
        ) : (
          <>
            <PokemonTable isLoading={isLoading} pokemonList={pokemonList} />
            <LoadMore
              onLoadMore={fetchNextPage}
              hasNextPage={hasNextPage}
              isFetchingNextPage={isFetchingNextPage}
            />
          </>
        )}
      </div>
    </>
  );
}
