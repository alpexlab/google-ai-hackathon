import React, { useEffect, useState } from 'react';
import { getMedicalHistory } from '@/services/backend';
import { _MEDICAL_HISTORY } from '@/types';
import { useSearchParams } from 'react-router-dom';
import EasyNav from '../breadcrumb';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { BACKEND_URL } from '@/const';

const colors = [
  '#8884d8', // Soft Blue
  '#82ca9d', // Light Green
  '#ffc658', // Yellow
  '#ff7300', // Orange
  '#387908', // Dark Green
  '#a83279', // Purple
  '#ff6347', // Tomato Red
  '#4682b4', // Steel Blue
  '#ff1493', // Deep Pink
  '#40e0d0', // Turquoise
  '#b8860b', // Dark Goldenrod
];

const MedicalHistory = () => {
  const [params] = useSearchParams();
  const patientId = params.get('patient') as string;
  const [medicalHistory, setMedicalHistory] = useState<_MEDICAL_HISTORY | null>(null);
  const [lineVisibility, setLineVisibility] = useState<{
    [key: string]: { [key: string]: boolean };
  }>({});
  const [loading, setLoading] = useState(true);

  const titles = ['Brain', 'Lungs', 'Breast', 'Skin'];

  useEffect(() => {
    async function fetchMedicalHistory() {
      setLoading(true);
      try {
        const response = await getMedicalHistory(patientId);
        setMedicalHistory(response);

        // Initialize line visibility to true for each label
        const initialVisibility = response.chart.reduce((acc: any, item: any) => {
          item.labels.forEach((label: string) => {
            acc[item.title] = { ...acc[item.title], [label]: true };
          });
          return acc;
        }, {});
        setLineVisibility(initialVisibility);
      } catch (error) {
        console.error('Failed to fetch medical history:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchMedicalHistory();
  }, [patientId]);

  const handleToggle = (label: string, title: string) => {
    setLineVisibility((prev) => ({
      ...prev,
      [title]: {
        ...prev[title],
        [label]: !prev[title][label],
      },
    }));
  };

  if (loading) {
    return <div className='text-center py-10'>Loading...</div>;
  }

  return (
    <div>
      <EasyNav patient={patientId} />
      <div className='bg-white rounded-lg shadow-md p-6'>
        {titles.map((title, index) => (
          <div>
            {medicalHistory?.segments[title]?.length !== 0 && (
              <div key={index} className='mb-6'>
                <h1 className='text-3xl font-semibold mb-4'>{title}</h1>

                {/* Table for img vs timestamp */}
                <table className='table-auto w-full mb-8 border-collapse'>
                  <thead>
                    <tr className='bg-gray-200 text-gray-700'>
                      <th className='px-4 py-2 border'>Image</th>
                      <th className='px-4 py-2 border'>Timestamp</th>
                    </tr>
                  </thead>
                  <tbody>
                    {medicalHistory?.segments[title]?.length ? (
                      medicalHistory.segments[title].map((segment, idx) => {
                        const url = segment.img.startsWith('http')
                          ? segment.img
                          : `${BACKEND_URL}${segment.img}`;

                        return (
                          <tr key={idx} className='hover:bg-gray-100'>
                            <td className='border px-4 py-2'>
                              <img
                                src={url}
                                alt={`Medical segment ${idx}`}
                                width={300} // Set a width for the image
                                className='rounded-md'
                              />
                            </td>
                            <td className='border px-4 py-2'>{segment.timestamp}</td>
                          </tr>
                        );
                      })
                    ) : (
                      <tr>
                        <td colSpan={2} className='text-center py-4'>
                          No data available
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>

                {/* Chart Section */}
                {medicalHistory?.chart.map((item, chartIndex) => {
                  if (item.title !== title) return null; // Only show the chart corresponding to the title

                  return (
                    <div
                      key={chartIndex}
                      className='mb-8 p-4 border border-gray-300 rounded-lg shadow-lg'
                    >
                      <div className='flex flex-wrap mb-4 space-x-4'>
                        {item.labels.map((label, idx) => (
                          <label key={idx} className='flex items-center space-x-2'>
                            <input
                              type='checkbox'
                              checked={lineVisibility[item.title]?.[label] ?? false}
                              onChange={() => handleToggle(label, item.title)}
                              className='mr-2'
                              aria-label={`Toggle visibility for ${label}`}
                            />
                            <span className='text-gray-700'>{label}</span>
                          </label>
                        ))}
                      </div>

                      {/* Responsive Line Chart */}
                      <div className='chart-container w-full h-96'>
                        <ResponsiveContainer>
                          <LineChart
                            data={item.points}
                            margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                          >
                            <CartesianGrid strokeDasharray='3 3' stroke='#ccc' />
                            <XAxis
                              dataKey='scan'
                              label={{ value: 'Scan', position: 'insideBottom', offset: -5 }}
                            />
                            <YAxis label={{ value: 'Value', angle: -90, position: 'insideLeft' }} />
                            <Tooltip />
                            <Legend verticalAlign='top' height={60} />

                            {item.labels.map(
                              (label, idx) =>
                                lineVisibility[item.title]?.[label] && (
                                  <Line
                                    type='monotone'
                                    dataKey={label}
                                    stroke={colors[idx % colors.length]}
                                    strokeWidth={2}
                                    key={idx}
                                  />
                                )
                            )}
                          </LineChart>
                        </ResponsiveContainer>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default MedicalHistory;
