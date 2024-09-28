import { _PATIENT } from '@/types';
import { ColumnDef } from '@tanstack/react-table';

export const columns: ColumnDef<_PATIENT>[] = [
  {
    accessorKey: 'id',
    header: 'ID',
    cell: (cell) => {
      return <span>{cell.row.original.id}</span>;
    },
  },
  {
    accessorKey: 'name',
    header: 'Name',
  },
  {
    accessorKey: 'age',
    header: 'Age',
  },
  {
    accessorKey: 'email',
    header: 'Email',
  },
  {
    accessorKey: 'medical_history',
    header: 'Comments',
  },
];
