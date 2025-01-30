"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { PokeAPI } from "pokeapi-types";

interface PokemonStatsDetailsProps {
  stats: PokeAPI.PokemonStat[];
}

export default function PokemonStatsDetails({
  stats,
}: PokemonStatsDetailsProps) {
  return (
    <div>
      <div className="text-bold">Stats:</div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Base Stat</TableHead>
            <TableHead>Effort</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {stats.map(({ stat: { name }, effort, base_stat }) => (
            <TableRow key={name}>
              <TableCell className="text-xs capitalize">{name}</TableCell>
              <TableCell className="text-xs">{base_stat}</TableCell>
              <TableCell className="text-xs">{effort}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
