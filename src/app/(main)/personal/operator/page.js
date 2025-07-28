'use client';
import { useState } from 'react';
import { mockData } from './data/mockData';
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/Card';
import { TripTable } from './components/TripTable';

export default function OperatorPage() {
  const [data] = useState(mockData.data);
  const [loading, setLoading] = useState(false);
  const [loadingTripIds] = useState({ view: [] });

  const handleView = (trip) => {
    // Xử lý khi bấm nút Xem
    alert(`Xem trip: ${trip.title}`);
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
  );
}