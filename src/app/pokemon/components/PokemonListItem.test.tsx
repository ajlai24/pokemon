import { Table, TableBody } from "@/components/ui/table";
import { fireEvent, render, screen } from "@testing-library/react";
import { PokemonRowType } from "../types";
import PokemonListItem from "./PokemonListItem"; // Adjust import path as necessary

const mockPokemon: PokemonRowType = {
  id: "1",
  name: "bulbasaur",
  url: "https://pokeapi.co/api/v2/pokemon/1/",
};

describe("PokemonListItem", () => {
  it("renders the Pokemon list item with correct data", () => {
    render(
      <Table>
        <TableBody>
          <PokemonListItem pokemon={mockPokemon} onClick={() => {}} />
        </TableBody>
      </Table>
    );

    expect(screen.getByText(mockPokemon.id)).toBeInTheDocument();
    expect(screen.getByText(mockPokemon.name)).toBeInTheDocument();
  });

  it("calls onClick with correct URL when clicked", () => {
    const mockOnClick = jest.fn();

    render(
      <Table>
        <TableBody>
          <PokemonListItem pokemon={mockPokemon} onClick={mockOnClick} />
        </TableBody>
      </Table>
    );

    const tableRow = screen.getByText(mockPokemon.name).closest("tr");
    fireEvent.click(tableRow!);

    expect(mockOnClick).toHaveBeenCalledWith(mockPokemon.url);
  });

  it("renders table cells with the correct class names", () => {
    render(
      <Table>
        <TableBody>
          <PokemonListItem pokemon={mockPokemon} onClick={() => {}} />
        </TableBody>
      </Table>
    );

    const tableCells = screen.getAllByRole("cell");
    expect(tableCells[0]).toHaveClass("text-xs");
    expect(tableCells[1]).toHaveClass("text-xs capitalize");
  });
});
