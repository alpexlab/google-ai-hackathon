import { _SCAN } from '@/types';
import { ColumnDef } from '@tanstack/react-table';
import { Link } from 'react-router-dom';

export const getColumns = (patient: string): ColumnDef<_SCAN>[] => {
  return [
    {
      accessorKey: 'id',
      header: 'ID',
      cell: (cell) => {
        return (
          <Link
            className='text-blue-500 underline'
            to={`/${cell.row.original.type}/${cell.row.original.id}/?patient=${patient}`}
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
};
