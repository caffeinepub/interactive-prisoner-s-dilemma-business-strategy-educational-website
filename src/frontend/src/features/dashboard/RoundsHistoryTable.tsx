import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import type { RoundResult } from '@/backend';

interface RoundsHistoryTableProps {
  rounds: RoundResult[];
}

export default function RoundsHistoryTable({ rounds }: RoundsHistoryTableProps) {
  return (
    <ScrollArea className="h-[400px] w-full">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-20">Round</TableHead>
            <TableHead>Firm A Action</TableHead>
            <TableHead>Firm B Action</TableHead>
            <TableHead className="text-right">Firm A Payoff</TableHead>
            <TableHead className="text-right">Firm B Payoff</TableHead>
            <TableHead className="text-right">Cumulative A</TableHead>
            <TableHead className="text-right">Cumulative B</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {rounds.map((round) => (
            <TableRow key={Number(round.round)}>
              <TableCell className="font-medium">{Number(round.round)}</TableCell>
              <TableCell>
                <Badge variant={round.decision.firmA ? "default" : "destructive"}>
                  {round.decision.firmA ? 'Cooperate' : 'Defect'}
                </Badge>
              </TableCell>
              <TableCell>
                <Badge variant={round.decision.firmB ? "default" : "destructive"}>
                  {round.decision.firmB ? 'Cooperate' : 'Defect'}
                </Badge>
              </TableCell>
              <TableCell className="text-right">{Number(round.payoffA)}</TableCell>
              <TableCell className="text-right">{Number(round.payoffB)}</TableCell>
              <TableCell className="text-right font-semibold text-chart-1">
                {Number(round.cumulativeA)}
              </TableCell>
              <TableCell className="text-right font-semibold text-chart-2">
                {Number(round.cumulativeB)}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </ScrollArea>
  );
}
