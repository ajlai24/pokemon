import { render, screen } from "@testing-library/react";
import { ImageProps } from "next/image";
import PokemonImage from "./PokemonImage";

// Mock Image from next/image since it's a special component and might not render correctly in Jest
jest.mock("next/image", () => ({
  __esModule: true,
  default: ({ alt, src, width, height, className, ...rest }: ImageProps) => {
    // Ensure `src` is treated as a string, even if it is a StaticImport type.
    const resolvedSrc =
      typeof src === "string" ? src : (src as { src: string }).src;

    return (
      <img
        alt={alt}
        src={resolvedSrc}
        width={width}
        height={height}
        className={className}
        {...rest}
      />
    );
  },
}));

describe("PokemonImage", () => {
  it("renders an image when src is provided", () => {
    const mockSrc = "https://example.com/pokemon.png";
    const mockAlt = "pokemon image";

    render(<PokemonImage src={mockSrc} alt={mockAlt} />);

    // Check that the Image component is rendered with correct src and alt
    const image = screen.getByRole("img");
    expect(image).toHaveAttribute("src", mockSrc);
    expect(image).toHaveAttribute("alt", mockAlt);
    expect(image).toHaveClass("rounded-xl");
  });

  it("renders a Skeleton loader when src is not provided", () => {
    render(<PokemonImage src={null} alt="" />);

    // Check that the Skeleton loader is rendered instead of Image
    const skeleton = screen.getByTestId("skeleton");
    expect(skeleton).toBeInTheDocument();
  });

  it("renders with the correct alt text", () => {
    const mockSrc = "https://example.com/pokemon.png";
    const mockAlt = "pokemon image";

    render(<PokemonImage src={mockSrc} alt={mockAlt} />);

    // Check that the alt text is passed correctly to the image
    const image = screen.getByRole("img");
    expect(image).toHaveAttribute("alt", mockAlt);
  });
});
