import CenteredLoader from "@/components/CenteredLoader";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
} from "@/components/ui/sidebar";
import { PokeAPI } from "pokeapi-types";
import PokemonTypeFilter from "./PokemonTypeFilter";
import PokemonSearch from "./PokemonSearch";

interface PokemonSidebarProps {
  pokemonTypes: PokeAPI.PokemonType["type"][];
  isLoadingTypes: boolean;
  isErrorTypes: boolean;
  pokemonNames: PokeAPI.NamedAPIResource["name"][];
  isLoadingNames: boolean;
  isErrorNames: boolean;
}

export default function PokemonSidebar({
  pokemonTypes,
  isLoadingTypes,
  isErrorTypes,
  pokemonNames,
  isLoadingNames,
  isErrorNames,
}: PokemonSidebarProps) {
  const PokemonTypeFilters = () => {
    if (isLoadingTypes) return <CenteredLoader />;
    if (isErrorTypes) return <div>Failed to load types</div>;
    if (!pokemonTypes) return null;

    return <PokemonTypeFilter types={pokemonTypes} />;
  };

  const SearchContent = () => {
    if (isLoadingNames) return <CenteredLoader />;
    if (isErrorNames) return <div>Failed to search</div>;
    if (!pokemonNames) return null;
    return <PokemonSearch allPokemonNames={pokemonNames} />;
  };

  return (
    <Sidebar variant="floating" collapsible="none">
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SearchContent />
          </SidebarGroupContent>
        </SidebarGroup>
        <SidebarGroup>
          <SidebarGroupLabel>Types</SidebarGroupLabel>
          <SidebarGroupContent>
            <PokemonTypeFilters />
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
