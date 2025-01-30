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

interface PokemonSidebarProps {
  pokemonTypes: PokeAPI.PokemonType["type"][];
  isLoadingTypes: boolean;
  isErrorTypes: boolean;
}

export default function PokemonSidebar({
  pokemonTypes,
  isLoadingTypes,
  isErrorTypes,
}: PokemonSidebarProps) {
  const PokemonTypeFilters = () => {
    if (isLoadingTypes) {
      return <CenteredLoader />;
    }
    if (isErrorTypes) {
      return <div>Failed to load types</div>;
    }
    if (pokemonTypes) {
      return <PokemonTypeFilter types={pokemonTypes} />;
    }
    return null;
  };

  return (
    <Sidebar variant="floating">
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>Search</SidebarGroupContent>
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
