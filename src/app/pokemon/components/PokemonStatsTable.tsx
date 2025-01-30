"use client";

import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { PokeAPI } from "pokeapi-types";

interface PokemonStatsTableProps {
  id: PokeAPI.Pokemon["id"];
  weight: PokeAPI.Pokemon["weight"];
  height: PokeAPI.Pokemon["height"];
}

export default function PokemonStatsTable({
  id,
  weight,
  height,
}: PokemonStatsTableProps) {
  const rowData = [
    {
      key: "ID",
      value: id,
    },
    {
      key: "Height",
      value: height,
    },
    {
      key: "Weight",
      value: weight,
    },
  ];

  return (
    <Table>
      <TableBody>
        {rowData.map(({ key, value }) => (
          <TableRow key={key}>
            <TableCell className="text-xs">{key}</TableCell>
            <TableCell className="text-xs">{value}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
