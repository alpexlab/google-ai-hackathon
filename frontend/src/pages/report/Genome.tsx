import { BACKEND_URL } from '@/const';
import { getGenomeReport } from '@/services/backend';
import { _GENOME_REPORT } from '@/types';
import { useEffect, useState } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import EasyNav from '@/components/breadcrumb';

const Genome = () => {
  const { id } = useParams<{ id: string }>();
  const [report, setReport] = useState<_GENOME_REPORT>();
  const [params] = useSearchParams();
  const patientId = params.get('patient') as string;

  useEffect(() => {
    async function fetchReport() {
      const response = await getGenomeReport(id as string);
      let vcf = response.cancer.vcf as string;

      if (!vcf.startsWith('http')) {
        response.cancer.vcf = `${BACKEND_URL}${vcf}`;
      }

      setReport(response);
    }
    fetchReport();
  }, []);

  if (!report)
    return (
      <div className='flex items-center justify-center min-h-screen text-lg font-semibold text-gray-600'>
        Loading...
      </div>
    );

  return (
    <div>
      <EasyNav patient={patientId} report={`brain/${id}`} />
      <div className='container mx-auto p-6'>
        <Card className='max-w-5xl mx-auto shadow-lg p-6'>
          <CardHeader>
            <CardTitle className='text-3xl font-bold'>Genome Report</CardTitle>
          </CardHeader>
          <CardContent className='space-y-6'>
            <div>
              {/* Report Details Section */}
              <div className='space-y-2'>
                <ul className='space-y-2'>
                  <li>
                    <a
                      className='text-blue-500 hover:underline mt-2 block'
                      href={report.cancer.vcf as string}
                      target='_blank'
                      rel='noreferrer'
                    >
                      Download VCF
                    </a>
                  </li>
                  <li>
                    <span className='font-medium'>Id:</span> {report?.cancer.id}
                  </li>
                  <li>
                    <span className='font-medium'>Status:</span>
                    <Badge
                      className={`ml-2 ${report?.report.status === 'COMPLETE' ? 'bg-green-500' : 'bg-yellow-500'}`}
                    >
                      {report?.report.status}
                    </Badge>
                  </li>
                </ul>
              </div>
            </div>

            {/* Detailed Results Section */}
            {report?.report.status === 'COMPLETE' && (
              <>
                <Separator />

                {/* Classes and Probabilities Table */}
                <div className='mt-6'>
                  <h4 className='text-lg font-semibold mb-4'>Output</h4>
                  <p className='text-gray-500'>{report?.report.output}</p>
                </div>

                <Separator />
              </>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Genome;
