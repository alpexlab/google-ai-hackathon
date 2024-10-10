import { _DOCUMENT } from '@/types';
import { ColumnDef } from '@tanstack/react-table';

export const getColumns = (): ColumnDef<_DOCUMENT>[] => {
  return [
    {
      accessorKey: 'id',
      header: 'ID',
      cell: (cell) => {
        return (
          <a
            className='text-blue-500 underline'
            href={`${cell.row.original.document}`}
            target='_blank'
          >
            {cell.row.original.id}
          </a>
        );
      },
    },
    {
      accessorKey: 'created_at',
      header: 'Timestamp',
    },
    {
      accessorKey: 'comments',
      header: 'Comments',
    },
  ];
};
