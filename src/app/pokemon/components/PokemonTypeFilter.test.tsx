import { useFiltersStore } from "@/stores/useFilterStore";
import { fireEvent, render, screen } from "@testing-library/react";
import { PokeAPI } from "pokeapi-types";
import PokemonTypeFilter from "./PokemonTypeFilter";

interface CheckboxProps {
  checked: boolean;
  onCheckedChange: () => void;
  id: string;
}

jest.mock("@/components/ui/checkbox", () => ({
  Checkbox: ({ checked, onCheckedChange, id }: CheckboxProps) => (
    <input
      type="checkbox"
      checked={checked}
      onChange={() => onCheckedChange()}
      id={id}
      role="checkbox"
      data-testid={id}
    />
  ),
}));

jest.mock("@/stores/useFilterStore", () => ({
  useFiltersStore: jest.fn(),
}));

const mockToggleSelectedType = jest.fn();

describe("PokemonTypeFilter", () => {
  const mockTypes: PokeAPI.PokemonType["type"][] = [
    {
      name: "fire",
      url: "https://pokeapi.co/api/v2/type/fire",
    },
    {
      name: "water",
      url: "https://pokeapi.co/api/v2/type/water",
    },
    {
      name: "grass",
      url: "https://pokeapi.co/api/v2/type/grass",
    },
  ];

  beforeEach(() => {
    // Reset and mock the store before each test to ensure proper isolation
    (useFiltersStore as unknown as jest.Mock).mockReturnValue({
      selectedTypes: { fire: true, water: false, grass: true },
      toggleSelectedType: mockToggleSelectedType,
    });
  });

  it("renders checkboxes for each type", () => {
    render(<PokemonTypeFilter types={mockTypes} />);

    // Check if the checkboxes for each type are rendered
    mockTypes.forEach((type) => {
      expect(screen.getByLabelText(type.name)).toBeInTheDocument();
    });
  });

  it("checkbox is checked based on selectedTypes state", () => {
    render(<PokemonTypeFilter types={mockTypes} />);

    expect(screen.getByLabelText("fire")).toBeChecked();
    expect(screen.getByLabelText("grass")).toBeChecked();

    expect(screen.getByLabelText("water")).not.toBeChecked();
  });

  it("calls toggleSelectedType when a checkbox is clicked", () => {
    // Render the component
    render(<PokemonTypeFilter types={mockTypes} />);

    // Get the checkbox elements using data-testid (id for each checkbox)
    const fireCheckbox = screen.getByTestId("fire");
    const waterCheckbox = screen.getByTestId("water");

    // Simulate clicking the 'fire' checkbox
    fireEvent.click(fireCheckbox);

    // Assert that toggleSelectedType was called with "fire"
    expect(useFiltersStore().toggleSelectedType).toHaveBeenCalledWith("fire");

    // Simulate clicking the 'water' checkbox
    fireEvent.click(waterCheckbox);

    // Assert that toggleSelectedType was called with "water"
    expect(useFiltersStore().toggleSelectedType).toHaveBeenCalledWith("water");
  });
});
