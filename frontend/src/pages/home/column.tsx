import { _PATIENT } from '@/types';
import { ColumnDef } from '@tanstack/react-table';
import { Link } from 'react-router-dom';

export const columns: ColumnDef<_PATIENT>[] = [
  {
    accessorKey: 'id',
    header: 'ID',
    cell: (cell) => {
      return <span>{cell.row.original.id}</span>;
    },
  },
  {
    accessorKey: 'photo',
    header: 'Photo',
    cell: (cell) => {
      const photo = cell.row.original.photo as string | null;
      return (
        <img
          className='w-10 h-10 rounded-full'
          src={
            photo ||
            'https://img.freepik.com/free-photo/beautiful-woman-standing-against-yellow-wall_23-2148204587.jpg?size=626&ext=jpg'
          }
          alt='Patient'
        />
      );
    },
  },
  {
    accessorKey: 'name',
    header: 'Name',
    cell: (cell) => {
      return (
        <Link className='text-blue-500 underline' to={`/details/?patient=${cell.row.original.id}`}>
          {cell.row.original.name}
        </Link>
      );
    },
  },
  {
    accessorKey: 'age',
    header: 'Age',
  },
  {
    accessorKey: 'email',
    header: 'Email',
  },
];
