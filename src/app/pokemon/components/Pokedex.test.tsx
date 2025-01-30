import { render, screen } from "@testing-library/react";
import PokeDex from "./PokeDex";
import { useQuery, useInfiniteQuery } from "@tanstack/react-query";
import { useHasSelectedTypes } from "@/stores/useFilterStore";
import { LoadMoreProps } from "@/components/LoadMore";
import { PokemonTableProps } from "./PokemonTable";

// Mock components
jest.mock("@/components/LoadMore", () => ({
  __esModule: true,
  default: ({ onLoadMore, hasNextPage, isFetchingNextPage }: LoadMoreProps) => (
    <div>
      <button
        onClick={onLoadMore}
        disabled={!hasNextPage || isFetchingNextPage}
      >
        Load More
      </button>
    </div>
  ),
}));

jest.mock("@/components/CenteredLoader", () => ({
  __esModule: true,
  default: () => <div>loading...</div>,
}));

jest.mock("./PokemonSidebar", () => ({
  __esModule: true,
  default: () => <div>Pokemon Sidebar</div>,
}));

jest.mock("./PokemonTable", () => ({
  __esModule: true,
  default: ({ isLoading, pokemonList }: PokemonTableProps) => (
    <div>
      {isLoading ? (
        "Loading..."
      ) : pokemonList.length === 0 ? (
        <div>0 Results</div>
      ) : (
        pokemonList.map((pokemon) => (
          <div key={pokemon.name}>{pokemon.name}</div>
        ))
      )}
    </div>
  ),
}));

jest.mock("./FilteredPokemon", () => ({
  __esModule: true,
  default: () => <div>Filtered Pokemon</div>,
}));

// Mock hooks
jest.mock("@tanstack/react-query", () => ({
  useQuery: jest.fn(),
  useInfiniteQuery: jest.fn(),
}));

jest.mock("@/stores/useFilterStore", () => ({
  useHasSelectedTypes: jest.fn(),
}));

describe("PokeDex", () => {
  const mockInitialPokemonData = {
    next: "nextUrl",
    previous: null,
    results: [
      { id: "1", name: "bulbasaur", url: "bulbasaurUrl" },
      { id: "2", name: "ivysaur", url: "ivysaurUrl" },
      { id: "3", name: "venusaur", url: "venusaurUrl" },
    ],
    count: 3,
  };
  const mockInitialPokemonTypes = [
    { name: "grass", url: "grassUrl" },
    { name: "poison", url: "poisonUrl" },
  ];
  const mockAllPokemonNames = ["bulbasaur", "ivysaur", "vennusar"];

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should render loading state for pokemon types", async () => {
    (useQuery as jest.Mock).mockReturnValue({
      data: null,
      isLoading: true,
      isError: false,
    });

    (useInfiniteQuery as jest.Mock).mockReturnValue({
      data: null,
      isLoading: true,
      isError: false,
      fetchNextPage: jest.fn(),
      hasNextPage: false,
      isFetchingNextPage: false,
    });

    (useHasSelectedTypes as jest.Mock).mockReturnValue(false);

    render(
      <PokeDex
        initialPokemonData={mockInitialPokemonData}
        initialPokemonTypes={mockInitialPokemonTypes}
        allPokemonNames={mockAllPokemonNames}
      />
    );

    expect(screen.getByText("Pokemon Sidebar")).toBeInTheDocument();
    expect(screen.getByText("Loading...")).toBeInTheDocument();
  });

  it("should render error state", async () => {
    // Mock useQuery to simulate error
    (useQuery as jest.Mock).mockReturnValue({
      data: null,
      isLoading: false,
      isError: true,
    });

    // Mock useInfiniteQuery to simulate error
    (useInfiniteQuery as jest.Mock).mockReturnValue({
      data: null,
      isLoading: false,
      isError: true,
      fetchNextPage: jest.fn(),
      hasNextPage: false,
      isFetchingNextPage: false,
    });

    (useHasSelectedTypes as jest.Mock).mockReturnValue(false);

    render(
      <PokeDex
        initialPokemonData={mockInitialPokemonData}
        initialPokemonTypes={mockInitialPokemonTypes}
        allPokemonNames={mockAllPokemonNames}
      />
    );

    expect(
      screen.getByText("Uh oh - something went wrong")
    ).toBeInTheDocument();
  });

  it("should render '0 Results' when no pokemon are found", async () => {
    (useQuery as jest.Mock).mockReturnValue({
      data: mockInitialPokemonTypes,
      isLoading: false,
      isError: false,
    });

    (useInfiniteQuery as jest.Mock).mockReturnValue({
      data: { pages: [{ results: [] }] },
      isLoading: false,
      isError: false,
      fetchNextPage: jest.fn(),
      hasNextPage: false,
      isFetchingNextPage: false,
    });

    (useHasSelectedTypes as jest.Mock).mockReturnValue(false);

    render(
      <PokeDex
        initialPokemonData={mockInitialPokemonData}
        initialPokemonTypes={mockInitialPokemonTypes}
        allPokemonNames={mockAllPokemonNames}
      />
    );

    expect(screen.getByText("0 Results")).toBeInTheDocument();
  });

  it("should render pokemon list and Load More button", async () => {
    (useQuery as jest.Mock).mockReturnValue({
      data: mockInitialPokemonTypes,
      isLoading: false,
      isError: false,
    });

    (useInfiniteQuery as jest.Mock).mockReturnValue({
      data: { pages: [mockInitialPokemonData] },
      isLoading: false,
      isError: false,
      fetchNextPage: jest.fn(),
      hasNextPage: true,
      isFetchingNextPage: false,
    });

    (useHasSelectedTypes as jest.Mock).mockReturnValue(false);

    render(
      <PokeDex
        initialPokemonData={mockInitialPokemonData}
        initialPokemonTypes={mockInitialPokemonTypes}
        allPokemonNames={mockAllPokemonNames}
      />
    );

    expect(screen.getByText("Pokemon Sidebar")).toBeInTheDocument();
    expect(screen.getByText("bulbasaur")).toBeInTheDocument();
    expect(screen.getByText("ivysaur")).toBeInTheDocument();
    expect(screen.getByText("venusaur")).toBeInTheDocument();
    expect(screen.getByText("Load More")).toBeInTheDocument();
  });

  it("should render FilteredPokemon component when types are selected", async () => {
    (useQuery as jest.Mock).mockReturnValue({
      data: mockInitialPokemonTypes,
      isLoading: false,
      isError: false,
    });

    (useInfiniteQuery as jest.Mock).mockReturnValue({
      data: { pages: [mockInitialPokemonData] },
      isLoading: false,
      isError: false,
      fetchNextPage: jest.fn(),
      hasNextPage: true,
      isFetchingNextPage: false,
    });

    (useHasSelectedTypes as jest.Mock).mockReturnValue(true);

    render(
      <PokeDex
        initialPokemonData={mockInitialPokemonData}
        initialPokemonTypes={mockInitialPokemonTypes}
        allPokemonNames={mockAllPokemonNames}
      />
    );

    expect(screen.getByText("Filtered Pokemon")).toBeInTheDocument();
  });
});
