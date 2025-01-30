import { render, screen } from "@testing-library/react";
import { PokeAPI } from "pokeapi-types";
import PokemonStatsDetails from "./PokemonStatsDetails";

const mockStats: PokeAPI.PokemonStat[] = [
  {
    stat: { name: "hp", url: "https://pokeapi.co/api/v2/stat/1/" },
    effort: 5,
    base_stat: 45,
  },
  {
    stat: { name: "attack", url: "https://pokeapi.co/api/v2/stat/2/" },
    effort: 3,
    base_stat: 47,
  },
  {
    stat: { name: "defense", url: "https://pokeapi.co/api/v2/stat/3/" },
    effort: 2,
    base_stat: 30,
  },
];

describe("PokemonStatsDetails", () => {
  it("renders the stats table with correct headers and data", () => {
    render(<PokemonStatsDetails stats={mockStats} />);

    expect(screen.getByText("Name")).toBeInTheDocument();
    expect(screen.getByText("Base Stat")).toBeInTheDocument();
    expect(screen.getByText("Effort")).toBeInTheDocument();

    mockStats.forEach((stat) => {
      expect(screen.getByText(stat.stat.name)).toBeInTheDocument();
      expect(screen.getByText(stat.base_stat)).toBeInTheDocument();
      expect(screen.getByText(stat.effort)).toBeInTheDocument();
    });
  });

  it("renders the 'Stats' heading correctly", () => {
    render(<PokemonStatsDetails stats={mockStats} />);

    expect(screen.getByText("Stats:")).toBeInTheDocument();
  });

  it("handles an empty stats array correctly", () => {
    render(<PokemonStatsDetails stats={[]} />);

    const tableRows = screen.queryAllByRole("row");
    expect(tableRows).toHaveLength(1);
  });
});
