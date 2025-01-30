import { render, screen } from "@testing-library/react";
import PokemonSidebar from "./PokemonSidebar";
import { PokeAPI } from "pokeapi-types";
import { ReactNode } from "react";

type ChildrenProps = { children: ReactNode };

// Mocking the child components
jest.mock("@/components/ui/sidebar", () => ({
  Sidebar: jest.fn(({ children }: ChildrenProps) => (
    <div data-testid="mock-sidebar">{children}</div>
  )),
  SidebarContent: jest.fn(({ children }: ChildrenProps) => (
    <div data-testid="mock-sidebar-content">{children}</div>
  )),
  SidebarGroup: jest.fn(({ children }: ChildrenProps) => (
    <div data-testid="mock-sidebar-group">{children}</div>
  )),
  SidebarGroupContent: jest.fn(({ children }: ChildrenProps) => (
    <div data-testid="mock-sidebar-group-content">{children}</div>
  )),
  SidebarGroupLabel: jest.fn(({ children }: ChildrenProps) => (
    <div data-testid="mock-sidebar-group-label">{children}</div>
  )),
}));

jest.mock("@/components/CenteredLoader", () => ({
  __esModule: true,
  default: () => <div>loading...</div>,
}));

jest.mock("./PokemonTypeFilter", () => ({
  __esModule: true,
  default: () => <div>Pokemon Type Filter</div>,
}));

jest.mock("./PokemonSearch", () => ({
  __esModule: true,
  default: () => <div>Pokemon Search</div>,
}));

describe("PokemonSidebar", () => {
  const defaultProps = {
    pokemonTypes: [] as PokeAPI.PokemonType["type"][],
    isLoadingTypes: false,
    isErrorTypes: false,
    pokemonNames: [] as PokeAPI.NamedAPIResource["name"][],
    isLoadingNames: false,
    isErrorNames: false,
  };

  it("renders loading state for types", () => {
    render(<PokemonSidebar {...defaultProps} isLoadingTypes={true} />);
    expect(screen.getByText("loading...")).toBeInTheDocument();
  });

  it("renders error state for types", () => {
    render(<PokemonSidebar {...defaultProps} isErrorTypes={true} />);
    expect(screen.getByText("Failed to load types")).toBeInTheDocument();
  });

  it("renders Pokemon Type Filter when types are available", () => {
    const pokemonTypes = [
      { name: "fire", url: "fireUrl" },
      { name: "water", url: "waterUrl" },
    ];
    render(<PokemonSidebar {...defaultProps} pokemonTypes={pokemonTypes} />);
    expect(screen.getByText("Pokemon Type Filter")).toBeInTheDocument();
  });

  it("renders loading state for names", () => {
    render(<PokemonSidebar {...defaultProps} isLoadingNames={true} />);
    expect(screen.getByText("loading...")).toBeInTheDocument();
  });

  it("renders error state for names", () => {
    render(<PokemonSidebar {...defaultProps} isErrorNames={true} />);
    expect(screen.getByText("Failed to search")).toBeInTheDocument();
  });

  it("renders Pokemon Search when names are available", () => {
    const pokemonNames = ["pikachu", "bulbasaur"];
    render(<PokemonSidebar {...defaultProps} pokemonNames={pokemonNames} />);
    expect(screen.getByText("Pokemon Search")).toBeInTheDocument();
  });

  it("renders sidebar structure correctly", () => {
    render(
      <PokemonSidebar {...defaultProps} pokemonTypes={[]} pokemonNames={[]} />
    );

    expect(screen.getByText("Types")).toBeInTheDocument();
    expect(screen.getByText("Pokemon Type Filter")).toBeInTheDocument();
  });
});
