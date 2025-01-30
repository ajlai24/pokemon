import { LoadMoreProps } from "@/components/LoadMore";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { render, screen } from "@testing-library/react";
import FilteredPokemon from "./FilteredPokemon";
import { PokemonTableProps } from "./PokemonTable";

jest.mock("@/components/LoadMore", () => ({
  __esModule: true,
  default: ({ onLoadMore, hasNextPage, isFetchingNextPage }: LoadMoreProps) => (
    <button onClick={onLoadMore} disabled={!hasNextPage || isFetchingNextPage}>
      Load More
    </button>
  ),
}));

jest.mock("@/components/CenteredLoader", () => ({
  __esModule: true,
  default: () => <div>Loading...</div>,
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

jest.mock("@tanstack/react-query", () => ({
  useQuery: jest.fn(),
  useInfiniteQuery: jest.fn(),
}));

jest.mock("@/stores/useFilterStore", () => ({
  useFiltersStore: jest.fn().mockImplementation(() => ({
    selectedTypes: { fire: true },
  })),
}));

describe("FilteredPokemon", () => {
  const mockPokemonList = [
    { id: "1", name: "bulbasaur" },
    { id: "2", name: "ivysaur" },
    { id: "3", name: "venusaur" },
  ];

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should render loading state", () => {
    (useQuery as jest.Mock).mockReturnValue({
      data: null,
      isLoading: true,
      isError: false,
    });
    (useInfiniteQuery as jest.Mock).mockReturnValue({
      data: null,
      isLoading: true,
      isError: false,
    });

    render(<FilteredPokemon />);
    expect(screen.getByText("Loading...")).toBeInTheDocument();
  });

  it("should render error state", () => {
    (useQuery as jest.Mock).mockReturnValue({
      data: null,
      isLoading: false,
      isError: true,
    });
    (useInfiniteQuery as jest.Mock).mockReturnValue({
      data: null,
      isLoading: false,
      isError: true,
    });

    render(<FilteredPokemon />);
    expect(
      screen.getByText("Failed to retrieve pokemon of types")
    ).toBeInTheDocument();
  });

  it("should render '0 Results' when no Pokemon are found", () => {
    (useQuery as jest.Mock).mockReturnValue({ data: [] });
    (useInfiniteQuery as jest.Mock).mockReturnValue({ data: { pages: [[]] } });

    render(<FilteredPokemon />);
    expect(screen.getByText("0 Results")).toBeInTheDocument();
  });

  it("should render Pokemon list and Load More button", () => {
    (useQuery as jest.Mock).mockReturnValue({ data: mockPokemonList });
    (useInfiniteQuery as jest.Mock).mockReturnValue({
      data: { pages: [mockPokemonList] },
      hasNextPage: true,
      isFetchingNextPage: false,
      fetchNextPage: jest.fn(),
    });

    render(<FilteredPokemon />);

    expect(screen.getByText("bulbasaur")).toBeInTheDocument();
    expect(screen.getByText("ivysaur")).toBeInTheDocument();
    expect(screen.getByText("venusaur")).toBeInTheDocument();
    expect(screen.getByText("Load More")).toBeInTheDocument();
  });
});
