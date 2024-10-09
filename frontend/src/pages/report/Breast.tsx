import { BACKEND_URL } from '@/const';
import { getBreastReport } from '@/services/backend';
import { _BREAST_REPORT } from '@/types';
import { useEffect, useState } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import EasyNav from '@/components/breadcrumb';

const Breast = () => {
  const { id } = useParams<{ id: string }>();
  const [report, setReport] = useState<_BREAST_REPORT>();
  const [params] = useSearchParams();
  const patientId = params.get('patient') as string;

  useEffect(() => {
    async function fetchReport() {
      const response = await getBreastReport(id as string);
      let mri = response.cancer.mri as string;
      let result_image = response.report.result_image;
      let segmented_image = response.report.segmented_image;

      if (!mri.startsWith('http')) {
        response.cancer.mri = `${BACKEND_URL}${mri}`;
      }

      if (response.report.status === 'COMPLETE') {
        if (!result_image.startsWith('http')) {
          response.report.result_image = `${BACKEND_URL}${result_image}`;
        }

        if (!segmented_image.startsWith('http')) {
          response.report.segmented_image = `${BACKEND_URL}${segmented_image}`;
        }
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
      <EasyNav patient={patientId} report={`breast/${id}`} />
      <div className='container mx-auto p-6'>
        <Card className='max-w-5xl mx-auto shadow-lg p-6'>
          <CardHeader>
            <CardTitle className='text-3xl font-bold'>Breast Cancer Report</CardTitle>
          </CardHeader>
          <CardContent className='space-y-6'>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
              {/* MRI Image Section */}
              <div className='text-center'>
                <h3 className='text-xl font-semibold'>MRI Scan</h3>
                <img
                  src={report?.cancer.mri as string}
                  alt='MRI scan'
                  className='rounded-lg border border-gray-300 mt-4 w-[350px] h-auto mx-auto'
                />
              </div>

              {/* Report Details Section */}
              <div className='space-y-4'>
                <ul className='space-y-2'>
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
                  {report?.report.status === 'COMPLETE' && (
                    <li>
                      <span className='font-medium'>Predicted Label:</span>
                      <Badge className='bg-blue-500 text-white ml-2'>
                        {report?.report.predicted_label}
                      </Badge>
                    </li>
                  )}
                </ul>

                {/* Progress Bar for Max Probability */}
                {report?.report.status === 'COMPLETE' && (
                  <div className='mt-4'>
                    <h4 className='font-medium'>Prediction Confidence:</h4>
                    <Progress
                      value={parseFloat(report?.report.max_prob) * 100}
                      className='h-4 mt-2'
                    />
                    <p className='text-sm mt-1 text-gray-500'>{`Max Probability: ${report?.report.max_prob}`}</p>
                  </div>
                )}
              </div>
            </div>

            {/* Detailed Results Section */}
            {report?.report.status === 'COMPLETE' && (
              <>
                <Separator />

                {/* Classes and Probabilities Table */}
                <div className='mt-6'>
                  <h4 className='text-lg font-semibold mb-4'>Prediction Breakdown</h4>
                  <table className='table-auto w-full text-left'>
                    <thead>
                      <tr className='bg-gray-100'>
                        <th className='p-2'>Class Label</th>
                        <th className='p-2'>Probability</th>
                        <th className='p-2'>Visual Representation</th>
                      </tr>
                    </thead>
                    <tbody>
                      {report?.report.classes.map((label, index) => (
                        <tr key={label}>
                          <td className='p-2'>{label}</td>
                          <td className='p-2'>{(report?.report.probs[index] * 100).toFixed(2)}%</td>
                          <td className='p-2'>
                            <Progress value={report?.report.probs[index] * 100} className='h-3' />
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <Separator />

                {/* Result and Stats Images */}
                <div className='mt-6'>
                  <div className='text-center'>
                    <h4 className='font-medium'>Result Image:</h4>
                    <img
                      src={report?.report.result_image}
                      alt='result'
                      className='rounded-lg border border-gray-300 mt-4 w-[600px] h-auto mx-auto'
                    />
                  </div>
                </div>

                <div className='mt-6'>
                  <div className='text-center'>
                    <h4 className='font-medium'>Segmented Image:</h4>
                    <img
                      src={report?.report.segmented_image}
                      alt='result'
                      className='rounded-lg border border-gray-300 mt-4 w-[500px] h-auto mx-auto'
                    />
                  </div>
                </div>
              </>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Breast;
