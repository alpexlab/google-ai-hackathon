import { useEffect, useState } from 'react';
import { DataTable } from './data-table';
import { _DOCUMENT } from '@/types';
import { getDocuments } from '@/services/backend';
import { useSearchParams } from 'react-router-dom';
import { getColumns } from './columns';
import { BACKEND_URL } from '@/const';

const DocumentTable = () => {
  const [documents, setDocuments] = useState<_DOCUMENT[]>([]);
  const [params] = useSearchParams();
  const patientId = params.get('patient') as string;

  useEffect(() => {
    async function fetchDocuments() {
      const response = await getDocuments(patientId);
      let documents = response.map((doc) => {
        let doc_url = doc.document as string;
        if (!doc_url.startsWith('http')) {
          doc.document = `${BACKEND_URL}${doc_url}`;
          doc.created_at = new Date(doc.created_at as string).toLocaleString();
        }
        return doc;
      });
      setDocuments(documents);
    }

    fetchDocuments();
  }, []);

  return (
    <div>
      <div className='mt-8'>
        <DataTable columns={getColumns()} data={documents} />
      </div>
    </div>
  );
};

export default DocumentTable;
