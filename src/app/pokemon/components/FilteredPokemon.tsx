"use client";

import CenteredLoader from "@/components/CenteredLoader";
import LoadMore from "@/components/LoadMore";
import { useFiltersStore } from "@/stores/useFilterStore";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { fetchPokemonByTypes, ITEMS_PER_PAGE } from "../services/pokemon";
import { PokemonRowType } from "../types";
import PokemonTable from "./PokemonTable";

export default function FilteredPokemon() {
  const { selectedTypes } = useFiltersStore();

  const selectedTypesList = Object.keys(selectedTypes).filter(
    (key) => selectedTypes[key] === true
  );

  const {
    data: allPokemonOfTypes,
    isError: isErrorAllPokemonOfTypes,
    isLoading: isLoadingAllPokemonOfTypes,
  } = useQuery({
    queryKey: ["allPokemonOfTypes", selectedTypes],
    queryFn: () => fetchPokemonByTypes(selectedTypesList),
  });

  const fetchNextPokemonPage = async ({ pageParam = 0 }) => {
    const start = pageParam * ITEMS_PER_PAGE;
    const end = start + ITEMS_PER_PAGE;

    return allPokemonOfTypes?.slice(start, end);
  };

  const {
    data,
    fetchNextPage,
    isLoading,
    isError,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ["pokemonListByTypes", selectedTypes],
    queryFn: fetchNextPokemonPage,
    initialPageParam: 0,
    getNextPageParam: (lastPage, allPages) => {
      if (!lastPage) {
        return undefined;
      }
      return lastPage.length < ITEMS_PER_PAGE ? undefined : allPages.length;
    },
    enabled: !!allPokemonOfTypes,
  });

  const pokemonList: PokemonRowType[] =
    data?.pages?.flatMap((page) => page || []) || [];

  if (isErrorAllPokemonOfTypes) {
    return <div>Failed to retrieve pokemon of types</div>;
  }

  if (isError) {
    return <div>Failed to get paginated Pokemon of types</div>;
  }

  if (isLoadingAllPokemonOfTypes) {
    return <CenteredLoader />;
  }

  return (
    <div>
      <PokemonTable isLoading={isLoading} pokemonList={pokemonList} />
      <LoadMore
        onLoadMore={fetchNextPage}
        hasNextPage={hasNextPage}
        isFetchingNextPage={isFetchingNextPage}
      />
    </div>
  );
}
