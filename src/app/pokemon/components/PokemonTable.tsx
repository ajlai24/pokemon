import CenteredLoader from "@/components/CenteredLoader";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { PokemonRowType } from "../types";
import PokemonDetails from "./PokemonDetails";
import PokemonImage from "./PokemonImage";
import PokemonListItem from "./PokemonListItem";

const fetchPokemonDetails = async (url: string) => {
  const response = await fetch(url);
  const data = await response.json();
  return data;
};

export interface PokemonTableProps {
  isLoading: boolean;
  pokemonList: PokemonRowType[];
}

export default function PokemonTable({
  isLoading,
  pokemonList,
}: PokemonTableProps) {
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
  const [selectedPokemonUrl, setSelectedPokemonUrl] = useState<string | null>(
    null
  );

  const {
    data: details,
    isLoading: isLoadingDetails,
    isError: isErrorDetails,
  } = useQuery({
    queryKey: ["pokemonDetails", selectedPokemonUrl],
    queryFn: () => fetchPokemonDetails(selectedPokemonUrl!),
    enabled: !!selectedPokemonUrl,
  });

  const handleDialogOpen = (url: string) => {
    setSelectedPokemonUrl(url);
    setIsDialogOpen(true);
  };

  const handleDialogClose = () => {
    setIsDialogOpen(false);
    setSelectedPokemonUrl(null);
  };

  const Details = () => {
    if (isLoadingDetails) {
      return <CenteredLoader />;
    }
    if (isErrorDetails) {
      return <div>Failed to load Pokemon details</div>;
    }
    if (details) {
      return (
        <div>
          <PokemonImage
            src={details.sprites.front_default}
            alt={details.name || ""}
          />
          <PokemonDetails details={details} />
        </div>
      );
    }
    return null;
  };

  return (
    <>
      <Dialog open={isDialogOpen} onOpenChange={handleDialogClose}>
        <DialogContent className="overflow-auto max-h-[70vh]">
          <DialogHeader>
            <DialogTitle className="capitalize">{details?.name}</DialogTitle>
          </DialogHeader>
          <Details />
        </DialogContent>
      </Dialog>

      {isLoading ? (
        <CenteredLoader />
      ) : pokemonList.length === 0 ? (
        <div>0 Results</div>
      ) : (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Name</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {pokemonList.map((p: PokemonRowType) => (
              <PokemonListItem
                key={p.url}
                pokemon={p}
                onClick={() => handleDialogOpen(p.url)}
              />
            ))}
          </TableBody>
        </Table>
      )}
    </>
  );
}
