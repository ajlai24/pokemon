"use client";

import LoadMore from "@/components/LoadMore";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
} from "@/components/ui/sidebar";
import { useInfiniteQuery } from "@tanstack/react-query";
import { fetchPokemon } from "../services/pokemon";
import { PokemonListResponse } from "../types";
import PokemonTable from "./PokemonTable";

interface PokeDexProps {
  initialPokemonData: PokemonListResponse;
}

export default function PokeDex({ initialPokemonData }: PokeDexProps) {
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
  });

  if (isError) return <div>Uh oh - something went wrong</div>;

  const pokemonList = data?.pages.flatMap((page) => page.results) || [];

  if (pokemonList.length === 0) {
    return <div className="pt-4">0 Results</div>;
  }

  return (
    <>
      <Sidebar variant="floating">
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupContent>Search</SidebarGroupContent>
          </SidebarGroup>

          <SidebarGroup>
            <SidebarGroupLabel>Types</SidebarGroupLabel>
            <SidebarGroupContent>Filters</SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
      </Sidebar>

      <div className="w-full p-2">
        <PokemonTable isLoading={isLoading} pokemonList={pokemonList} />
        <LoadMore
          onLoadMore={fetchNextPage}
          hasNextPage={hasNextPage}
          isFetchingNextPage={isFetchingNextPage}
        />
      </div>
    </>
  );
}
