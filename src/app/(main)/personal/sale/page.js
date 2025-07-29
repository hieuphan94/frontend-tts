'use client';
import { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/Card';

export default function SalePage() {
  const [data] = useState([]);

  return (
    <>
      <Card className="w-full max-w-7xl mx-auto mt-6">
        <CardHeader>
          <CardTitle>Sale Management</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8">
            <h2 className="text-2xl font-bold text-gray-700 mb-4">Sale Dashboard</h2>
            <p className="text-gray-600">Sale management features coming soon...</p>
          </div>
        </CardContent>
      </Card>
    </>
  );
}