"use client";

import LoadMore from "@/components/LoadMore";
import { useHasSelectedTypes } from "@/stores/useFilterStore";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { PokeAPI } from "pokeapi-types";
import { fetchPokemon, fetchPokemonTypes } from "../services/pokemon";
import { PokemonListResponse } from "../types";
import FilteredPokemon from "./FilteredPokemon";
import PokemonSidebar from "./PokemonSidebar";
import PokemonTable from "./PokemonTable";

interface PokeDexProps {
  initialPokemonData: PokemonListResponse;
  initialPokemonTypes: PokeAPI.PokemonType["type"][];
  allPokemonNames: PokeAPI.NamedAPIResource["name"][];
}

export default function PokeDex({
  initialPokemonData,
  initialPokemonTypes,
  allPokemonNames,
}: PokeDexProps) {
  const hasSelectedTypes = useHasSelectedTypes();

  const {
    data: pokemonNames,
    isLoading: isLoadingNames,
    isError: isErrorNames,
  } = useQuery({
    queryKey: ["allPokemonNames"],
    queryFn: () => allPokemonNames,
    initialData: allPokemonNames,
    staleTime: 1000 * 60 * 60, // Cache for 1 hour
  });

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

      // If there are more Pokemon to fetch (more than the current fetched count), fetch the next page
      return totalFetched < lastPage.count ? lastPageParam + 1 : undefined;
    },
    getPreviousPageParam: (lastPage, allPages, lastPageParam) => {
      return lastPageParam === 0 ? undefined : lastPageParam - 1;
    },
    enabled: hasSelectedTypes,
  });

  if (isError) return <div>Uh oh - something went wrong</div>;

  const pokemonList = data?.pages.flatMap((page) => page.results) || [];

  return (
    <>
      <PokemonSidebar
        pokemonTypes={pokemonTypes}
        isLoadingTypes={isLoadingTypes}
        isErrorTypes={isErrorTypes}
        pokemonNames={pokemonNames}
        isLoadingNames={isLoadingNames}
        isErrorNames={isErrorNames}
      />
      <div className="w-full p-2">
        {hasSelectedTypes ? (
          <FilteredPokemon />
        ) : (
          <>
            <PokemonTable
              isLoading={isLoading}
              pokemonList={pokemonList}
              isFetchingNextPage={isFetchingNextPage}
            />
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
