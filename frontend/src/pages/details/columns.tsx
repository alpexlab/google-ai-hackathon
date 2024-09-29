import { _SCAN } from '@/types';
import { ColumnDef } from '@tanstack/react-table';
import { Link } from 'react-router-dom';

export const columns: ColumnDef<_SCAN>[] = [
  {
    accessorKey: 'id',
    header: 'ID',
    cell: (cell) => {
      return (
        <Link
          className='text-blue-500 underline'
          to={`/${cell.row.original.type}/${cell.row.original.id}`}
        >
          {cell.row.original.id}
        </Link>
      );
    },
  },
  {
    accessorKey: 'timestamp',
    header: 'Timestamp',
  },
  {
    accessorKey: 'type',
    header: 'Type',
  },
  {
    accessorKey: 'status',
    header: 'Status',
  },
];
