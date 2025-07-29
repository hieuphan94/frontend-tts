'use client';
import { useState, useEffect } from 'react';
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell } from '@nextui-org/react';
import PropTypes from 'prop-types';
import { mockDataBookingTable } from './data/mockDataBookingTable';
import { useRouter } from 'next/navigation';

export default function OperatorPage() {
  const [data] = useState(mockDataBookingTable);
  const router = useRouter();
  const [loading, setLoading] = useState(false);


  const handleCodeClick = (row) => {
    router.push(`/personal/operator/${row.code}`);
  };

  const columns = [
    { key: 'stt', label: 'STT' },
    { key: 'bookingRate', label: 'Booking Rate' },
    { key: 'code', label: 'Code' },
    { key: 'arrivalDate', label: 'Arrival Date' },
    { key: 'numberOfDays', label: 'Number of Days' },
    { key: 'pax', label: 'Pax' },
    { key: 'priority', label: 'Priority' },
    { key: 'sale', label: 'Sale' },
    { key: 'status', label: 'Status' },
  ];

  const statusColor = {
    confirmed: 'bg-green-100 text-green-700',
    pending: 'bg-yellow-100 text-yellow-700',
    rejected: 'bg-red-100 text-red-700',
    cancelled: 'bg-gray-100 text-gray-700',
    '': 'bg-gray-100 text-gray-700',
  };

  return (
    <>
      {/* header */}
      <div className="flex justify-between items-center mb-4">
        <div>
          <h1 className="text-xl font-semibold">Booking List</h1>
          <p className="text-sm text-gray-500 mt-1">
            Hiển thị {data?.length || 0} booking
          </p>
        </div>
      </div>
      {/* table */}
      <div className="mt-8">
        <Table isLoading={loading} aria-label="Booking Table" removeWrapper className="mt-2 text-xs">
          <TableHeader className="text-xs">
            {columns.map((column) => (
              <TableColumn key={column.key} className="text-xs">{column.label}</TableColumn>
            ))}
          </TableHeader>
          <TableBody emptyContent={data.length === 0 ? 'No data' : undefined} className="text-xs">
            {data.map((row, idx) => (
              <TableRow key={row.code || idx} className="text-xs border-b border-gray-300">
                <TableCell className="text-xs">{idx + 1}</TableCell>
                <TableCell className="text-xs">{(row.bookingRate * 100).toFixed(0)}%</TableCell>
                <TableCell className="text-xs">
                  <button
                    type="button"
                    className="text-primary hover:underline cursor-pointer px-0.5 py-0.5 rounded"
                    onClick={() => handleCodeClick(row)}
                  >
                    {row.code}
                  </button>
                </TableCell>
                <TableCell className="text-xs">{new Date(row.arrivalDate).toLocaleDateString('vi-VN')}</TableCell>
                <TableCell className="text-xs">{row.numberOfDays}</TableCell>
                <TableCell className="text-xs">{row.pax}</TableCell>
                <TableCell className="text-xs">
                  {row.priority ? (
                    <span className="flex items-center justify-center"> ✓ </span>
                  ) : null}
                </TableCell>
                <TableCell className="text-xs">{row.sale}</TableCell>
                <TableCell className="text-xs">
                  <span className={`px-2 py-1 rounded-full text-xs ${statusColor[row.status]}`}>{row.status}</span>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </>
  );
}

OperatorPage.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      bookingRate: PropTypes.number,
      code: PropTypes.string,
      arrivalDate: PropTypes.string,
      numberOfDays: PropTypes.number,
      pax: PropTypes.number,
      priority: PropTypes.bool,
      sale: PropTypes.string,
      status: PropTypes.string,
    })
  ).isRequired,
  onCodeClick: PropTypes.func.isRequired,
};

