import PokemonDetails from "../components/PokemonDetails";
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

  return (
    <div className="container mx-auto min-h-screen flex flex-col p-4">
      <PokemonDetails details={details} showBackNav />
    </div>
  );
}
