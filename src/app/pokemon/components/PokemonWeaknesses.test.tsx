import { useQuery } from "@tanstack/react-query";
import { render, screen, waitFor } from "@testing-library/react";
import { PokeAPI } from "pokeapi-types";
import PokemonWeaknesses from "./PokemonWeaknesses";

// Mock the query function
jest.mock("@tanstack/react-query", () => ({
  ...jest.requireActual("@tanstack/react-query"),
  useQuery: jest.fn(),
}));

// Mock the Badge component
jest.mock("@/components/ui/badge", () => ({
  Badge: ({ children }: { children: React.ReactNode }) => (
    <span>{children}</span>
  ),
}));

jest.mock("@/components/CenteredLoader", () => ({
  __esModule: true,
  default: () => <div>loading...</div>,
}));

describe("PokemonWeaknesses Component", () => {
  const mockTypes: PokeAPI.PokemonType[] = [
    {
      slot: 1,
      type: { name: "fire", url: "https://pokeapi.co/api/v2/type/fire" },
    },
    {
      slot: 2,
      type: { name: "water", url: "https://pokeapi.co/api/v2/type/water" },
    },
  ];

  it("renders loader when data is loading", () => {
    // Mock useQuery to simulate loading state
    (useQuery as jest.Mock).mockReturnValue({
      data: null,
      isLoading: true,
      isError: false,
    });

    render(<PokemonWeaknesses types={mockTypes} />);

    // Check if the loader is present
    expect(screen.getByText(/loading/i)).toBeInTheDocument();
  });

  it("renders error message when there's an error", () => {
    // Mock useQuery to simulate error state
    (useQuery as jest.Mock).mockReturnValue({
      data: null,
      isLoading: false,
      isError: true,
    });

    render(<PokemonWeaknesses types={mockTypes} />);

    // Check if the error message is rendered
    expect(screen.getByText(/failed to load weaknesses/i)).toBeInTheDocument();
  });

  it("renders weaknesses as badges when data is available", async () => {
    const mockWeaknesses = ["water", "ground"];

    // Mock useQuery to simulate successful data fetching
    (useQuery as jest.Mock).mockReturnValue({
      data: mockWeaknesses,
      isLoading: false,
      isError: false,
    });

    render(<PokemonWeaknesses types={mockTypes} />);

    // Wait for the data to load and check if weaknesses are rendered as badges
    await waitFor(() => {
      mockWeaknesses.forEach((weakness) => {
        expect(screen.getByText(weakness)).toBeInTheDocument();
      });
    });
  });

  it("renders the title correctly", async () => {
    const mockWeaknesses = ["water", "ground"];

    (useQuery as jest.Mock).mockReturnValue({
      data: mockWeaknesses,
      isLoading: false,
      isError: false,
    });

    render(<PokemonWeaknesses types={mockTypes} />);

    // Check if the title "Weaknesses" is rendered
    expect(screen.getByText(/weaknesses/i)).toBeInTheDocument();
  });
});
