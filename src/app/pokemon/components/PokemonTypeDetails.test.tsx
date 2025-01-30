import { render, screen } from "@testing-library/react";
import { PokemonTypeDetails } from "./PokemonTypeDetails"; // Adjust path as needed
import { PokeAPI } from "pokeapi-types";

jest.mock("@/components/ui/badge", () => ({
  Badge: ({ children }: { children: React.ReactNode }) => (
    <span>{children}</span>
  ),
}));

describe("PokemonTypeDetails", () => {
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

  it("renders the correct number of badges", () => {
    render(<PokemonTypeDetails types={mockTypes} />);

    const badges = screen.getAllByText(/fire|water/i);
    expect(badges).toHaveLength(mockTypes.length);
  });

  it("renders the correct types in badges", () => {
    render(<PokemonTypeDetails types={mockTypes} />);

    // Ensure the badge contains the correct type names
    expect(screen.getByText("fire")).toBeInTheDocument();
    expect(screen.getByText("water")).toBeInTheDocument();
  });
});
