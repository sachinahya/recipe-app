import { Table as MuiTable, TableBody, TableCell, TableHead, TableRow } from '@material-ui/core';
import { FC } from 'react';

interface TableProps {
  rows: Record<string, string | number | null | undefined>[];
  primaryColumn?: number;
  dense?: boolean;
  skipRows?: number;
}

const Table: FC<TableProps> = ({ rows: rows2, primaryColumn = 0, dense, skipRows = 0 }) => {
  const rows = skipRows ? rows2.filter((_, index) => index >= skipRows) : rows2;
  const columns = Object.keys(rows[0]);
  const primary = columns[primaryColumn];

  return (
    <MuiTable size={dense ? 'small' : undefined}>
      <TableHead>
        <TableRow>
          {columns.map(column => (
            <TableCell key={column}>{column}</TableCell>
          ))}
        </TableRow>
      </TableHead>
      <TableBody>
        {rows.map((row, rowIndex) => (
          <TableRow key={`row${rowIndex}`}>
            {columns.map((col, colIndex) => {
              const primaryProps = col === primary && ({ component: 'th', scope: 'row' } as const);
              const cell = row[col];
              return (
                <TableCell key={cell || `col${colIndex}`} {...primaryProps}>
                  {cell}
                </TableCell>
              );
            })}
          </TableRow>
        ))}
      </TableBody>
    </MuiTable>
  );
};

export default Table;
