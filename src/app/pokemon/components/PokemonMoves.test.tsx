import { render, screen } from "@testing-library/react";
import PokemonMoves from "./PokemonMoves";

describe("PokemonMoves", () => {
  const mockMoves = [
    { move: { name: "tackle", url: "urltackle" }, version_group_details: [] },
    { move: { name: "growl", url: "urlgrowl" }, version_group_details: [] },
    { move: { name: "ember", url: "urlember" }, version_group_details: [] },
  ];

  it("renders the 'Moves:' label", () => {
    render(<PokemonMoves moves={mockMoves} />);
    expect(screen.getByText("Moves:")).toBeInTheDocument();
  });

  it("renders a Badge for each move in the moves list", () => {
    render(<PokemonMoves moves={mockMoves} />);

    mockMoves.forEach(({ move: { name } }) => {
      expect(screen.getByText(name)).toBeInTheDocument();
    });
  });

  it("displays the correct move name in each Badge", () => {
    render(<PokemonMoves moves={mockMoves} />);

    mockMoves.forEach(({ move: { name } }) => {
      const badge = screen.getByText(name);
      expect(badge).toBeInTheDocument();
    });
  });
});
