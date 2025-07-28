'use client';
import { useState } from 'react';
import { mockData } from './data/mockDataTrip';
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/Card';
import { TripTable } from './components/TripTable';
import FormSaleBook from './components/FormSaleBook';
import { mockDataOperatorTable } from './data/mockDataOperatorTable';
import { OperatorTable } from './components/OperatorTable';

export default function OperatorPage() {
  const [data] = useState(mockData.data);
  const [loading, setLoading] = useState(false);
  const [loadingTripIds] = useState({ view: [] });

  const handleView = (trip) => {
    // Xử lý khi bấm nút Xem
    alert(`Xem trip: ${trip.title}`);
  };

  const handleCodeClick = (row) => {
    // Xử lý khi bấm nút Code
    alert(`Xem sale: ${row.code}`);
  };

  if (loading && !data?.length) {
    return (
      <div className="flex flex-col items-center justify-center h-[50vh] p-6">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mb-4"></div>
        <p className="text-gray-600">Đang tải dữ liệu...</p>
      </div>
    );
  }

  return (
    <>
      <Card className="w-full max-w-7xl mx-auto mt-6">
        <CardHeader>
          <CardTitle>Danh sách Trip</CardTitle>
        </CardHeader>
        <CardContent>
          <TripTable
            trips={data}
            loadingTripIds={loadingTripIds}
            onView={handleView}
          />
        </CardContent>
      </Card>
      <div className="mt-8">
        <h2 className="text-2xl font-bold mb-4">Form Sale Book</h2>
        <FormSaleBook />
      </div>

      <div className="mt-8">
        <h2 className="text-2xl font-bold mb-4">Operator Table</h2>
        <OperatorTable data={mockDataOperatorTable} onCodeClick={handleCodeClick} />
      </div>
    </>
  );
}