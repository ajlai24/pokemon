import { TableCell, TableRow } from "@/components/ui/table";
import { PokemonRowType } from "../types";

interface PokemonListItemProps {
  pokemon: PokemonRowType;
  onClick: (url: string) => void;
}

export default function PokemonListItem({
  pokemon,
  onClick,
}: PokemonListItemProps) {
  const { id, name, url } = pokemon;

  return (
    <TableRow onClick={() => onClick(url)} className="cursor-pointer">
      <TableCell className="text-xs">{id}</TableCell>
      <TableCell className="text-xs capitalize">{name}</TableCell>
    </TableRow>
  );
}
