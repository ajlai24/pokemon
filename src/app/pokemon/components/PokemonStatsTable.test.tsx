import { render, screen } from "@testing-library/react";
import { PokeAPI } from "pokeapi-types";
import PokemonStatsTable from "./PokemonStatsTable"; // Adjust path as needed

describe("PokemonStatsTable", () => {
  const mockPokemonStats: PokeAPI.Pokemon = {
    id: 1,
    weight: 100,
    height: 2,
    name: "Snorlax",
    base_experience: 10,
    is_default: true,
    order: 1,
    abilities: [],
    forms: [],
    game_indices: [],
    held_items: [],
    location_area_encounters: "Forest",
    moves: [],
    sprites: {
      front_default: "",
      front_shiny: "",
      front_female: "",
      front_shiny_female: "",
      back_default: "",
      back_shiny: "",
      back_female: "",
      back_shiny_female: "",
    },
    species: {
      name: "normal",
      url: "url",
    },
    stats: [],
    types: [],
  };

  it("renders a table with the correct rows", () => {
    render(
      <PokemonStatsTable
        id={mockPokemonStats.id}
        weight={mockPokemonStats.weight}
        height={mockPokemonStats.height}
      />
    );

    const tableRows = screen.getAllByRole("row");
    expect(tableRows).toHaveLength(3);

    expect(screen.getByText("ID")).toBeInTheDocument();
    expect(
      screen.getByText(mockPokemonStats.id.toString())
    ).toBeInTheDocument();

    expect(screen.getByText("Height")).toBeInTheDocument();
    expect(
      screen.getByText(mockPokemonStats.height.toString())
    ).toBeInTheDocument();

    expect(screen.getByText("Weight")).toBeInTheDocument();
    expect(
      screen.getByText(mockPokemonStats.weight.toString())
    ).toBeInTheDocument();
  });

  it("renders the correct values for ID, Height, and Weight", () => {
    render(
      <PokemonStatsTable
        id={mockPokemonStats.id}
        weight={mockPokemonStats.weight}
        height={mockPokemonStats.height}
      />
    );

    expect(
      screen.getByText(mockPokemonStats.id.toString())
    ).toBeInTheDocument();
    expect(
      screen.getByText(mockPokemonStats.height.toString())
    ).toBeInTheDocument();
    expect(
      screen.getByText(mockPokemonStats.weight.toString())
    ).toBeInTheDocument();
  });
});
