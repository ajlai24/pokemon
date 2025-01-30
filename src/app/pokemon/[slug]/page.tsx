import PokemonDetails from "../components/PokemonDetails";
import PokemonImage from "../components/PokemonImage";
import { getPokemonDetails } from "../services/pokemon";

export default async function PokemonPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  let details;

  try {
    // Fetch the details for the Pokemon based on the slug
    details = await getPokemonDetails((await params).slug);

    if (!details) {
      throw new Error("Invalid Pokemon details");
    }
  } catch (error) {
    console.error(error);
    return (
      <div className="container mx-auto h-screen p-8 flex flex-col text-center">
        Invalid Pokemon or failed to fetch details.
      </div>
    );
  }

  const { name, sprites } = details;
  return (
    <div className="container mx-auto h-screen p-8 flex flex-col">
      <h2 className="text-lg capitalize text-center">{name}</h2>
      <PokemonImage src={sprites.front_default} alt={name || ""} />
      <PokemonDetails details={details} />
    </div>
  );
}
