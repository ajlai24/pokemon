import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { render, screen, waitFor } from "@testing-library/react";
import { getPokemonEvolutions } from "../services/pokemon";
import PokemonEvolutions from "./PokemonEvolutions";

jest.mock("../services/pokemon", () => ({
  getPokemonEvolutions: jest.fn(),
}));

jest.mock("@/components/CenteredLoader", () => ({
  __esModule: true,
  default: () => <div>loading...</div>,
}));

describe("PokemonEvolutions", () => {
  const mockName = "bulbasaur";

  const mockEvolutionsData = {
    chain: {
      species: {
        name: "bulbasaur",
      },
      evolves_to: [
        {
          species: {
            name: "ivysaur",
          },
          evolves_to: [
            {
              species: {
                name: "venusaur",
              },
              evolves_to: [],
            },
          ],
        },
      ],
    },
  };

  const createQueryClient = () =>
    new QueryClient({
      defaultOptions: {
        queries: {
          retry: false,
          refetchOnWindowFocus: false,
        },
      },
    });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("displays a loading spinner while fetching data", async () => {
    (getPokemonEvolutions as jest.Mock).mockReturnValue(new Promise(() => {}));

    render(
      <QueryClientProvider client={createQueryClient()}>
        <PokemonEvolutions name={mockName} />
      </QueryClientProvider>
    );

    expect(screen.getByText(/loading/i)).toBeInTheDocument();
  });

  it("displays an error message if the evolution data fails to load", async () => {
    (getPokemonEvolutions as jest.Mock).mockReturnValue(
      Promise.reject(new Error("Failed to fetch"))
    );

    render(
      <QueryClientProvider client={createQueryClient()}>
        <PokemonEvolutions name={mockName} />
      </QueryClientProvider>
    );

    await waitFor(() =>
      expect(screen.getByText(/failed to load evolutions/i)).toBeInTheDocument()
    );
  });

  it("displays 'None' when there are no evolutions", async () => {
    (getPokemonEvolutions as jest.Mock).mockResolvedValue({
      chain: {
        species: { name: "bulbasaur" },
        evolves_to: [],
      },
    });

    render(
      <QueryClientProvider client={createQueryClient()}>
        <PokemonEvolutions name={mockName} />
      </QueryClientProvider>
    );

    await waitFor(() => expect(screen.getByText("None")).toBeInTheDocument());
  });

  it("displays evolution links when evolutions are found", async () => {
    (getPokemonEvolutions as jest.Mock).mockResolvedValue(mockEvolutionsData);

    render(
      <QueryClientProvider client={createQueryClient()}>
        <PokemonEvolutions name={mockName} />
      </QueryClientProvider>
    );

    await waitFor(() => {
      expect(screen.getByText("ivysaur")).toBeInTheDocument();
      expect(screen.getByText("venusaur")).toBeInTheDocument();
    });

    const ivysaurLink = screen.getByText("ivysaur") as HTMLAnchorElement;
    const venusaurLink = screen.getByText("venusaur") as HTMLAnchorElement;

    expect(ivysaurLink).toHaveAttribute("href", "/pokemon/ivysaur");
    expect(venusaurLink).toHaveAttribute("href", "/pokemon/venusaur");
  });

  it("displays the evolutions in a flex container", async () => {
    (getPokemonEvolutions as jest.Mock).mockResolvedValue(mockEvolutionsData);

    render(
      <QueryClientProvider client={createQueryClient()}>
        <PokemonEvolutions name={mockName} />
      </QueryClientProvider>
    );

    await waitFor(() => {
      const container = screen.getByText("ivysaur").parentElement;
      expect(container).toHaveClass("flex gap-2");
    });
  });
});
