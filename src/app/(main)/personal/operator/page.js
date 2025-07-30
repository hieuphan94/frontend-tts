'use client';
import { useState, useEffect } from 'react';
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Input, Button } from '@nextui-org/react';
import PropTypes from 'prop-types';
import { mockDataBookingTable } from './data/mockDataBookingTable';
import { useRouter } from 'next/navigation';
import { Search } from 'lucide-react';

export default function OperatorPage() {
  const [data] = useState(mockDataBookingTable);
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [showFilter, setShowFilter] = useState(false);
  // Filter state
  const [filter, setFilter] = useState({
    code: '',
    status: '',
    arrivalDate: '',
    sale: '',
  });

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

  // Filtered data
  const filteredData = data.filter(row =>
    (!filter.code || row.code?.toLowerCase().includes(filter.code.toLowerCase())) &&
    (!filter.status || row.status === filter.status) &&
    (!filter.arrivalDate || row.arrivalDate?.slice(0, 10) === filter.arrivalDate) &&
    (!filter.sale || row.sale?.toLowerCase().includes(filter.sale.toLowerCase()))
  );

  return (
    <>
      {/* header */}
      <div className="flex justify-between items-center mb-4">
        <div>
          <h1 className="text-xl font-semibold">Booking List</h1>
          <p className="text-sm text-gray-500 mt-1">
            Displaying {data?.length || 0} bookings
          </p>
        </div>
      </div>
      {/* search/filter */}
      <div className="flex flex-wrap gap-2 mb-4 items-end">
        <div className="relative flex-1">
          <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search code"
            onChange={(e) => setFilter(f => ({ ...f, code: e.target.value }))}
            className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:border-primary"
          />
        </div>
        <Button className="bg-primary text-white rounded-lg" onClick={() => setShowFilter(!showFilter)}>
          {showFilter ? 'Hide Filter' : 'Show Filter'}
        </Button>
      </div>

      {/* Filter Container */}
      {showFilter && (
        <div className="bg-gray-200 rounded-lg p-4 mb-4">
          {/* Dropdowns */}
          <div className="flex gap-4 mb-4">
            <div className="flex-1">
              <label className="block text-xs text-gray-600 mb-1">Date</label>
              <select className="w-full px-3 py-2 rounded-lg border border-gray-200 focus:outline-none focus:border-primary text-xs">
                <option>All Date</option>
                <option value="1">3 months ago</option>
                <option value="2">6 months ago</option>
                <option value="3">1 year ago</option>
                <option value="4">2 years ago</option>
                <option value="5">3 years ago</option>
                <option value="6">4 years ago</option>
                <option value="7">5 years ago</option>
              </select>
            </div>
            <div className="flex-1">
              <label className="block text-xs text-gray-600 mb-1">Sale</label>
              <select className="w-full px-3 py-2 rounded-lg border border-gray-200 focus:outline-none focus:border-primary text-xs">
                <option>All Sale</option>
              </select>
            </div>
            <div className="flex-1">
              <label className="block text-xs text-gray-600 mb-1">Status</label>
              <select className="w-full px-3 py-2 rounded-lg border border-gray-200 focus:outline-none focus:border-primary text-xs">
                <option>All Status</option>
                <option value="confirmed">Confirmed</option>
                <option value="pending">Pending</option>
                <option value="rejected">Rejected</option>
                <option value="cancelled">Cancelled</option>
              </select>
            </div>
            <div className="flex-1">
              <label className="block text-xs text-gray-600 mb-1">Priority</label>
              <select className="w-full px-3 py-2 rounded-lg border border-gray-200 focus:outline-none focus:border-primary text-xs">
                <option>All Priority</option>
                <option value="true">Yes</option>
                <option value="false">No</option>
              </select>
            </div>
          </div>
        </div>
      )}
      {/* table */}
      <div className="mt-8">
        <Table isLoading={loading} aria-label="Booking Table" removeWrapper className="mt-2 text-xs">
          <TableHeader className="text-xs">
            {columns.map((column) => (
              <TableColumn key={column.key} className="text-xs">{column.label}</TableColumn>
            ))}
          </TableHeader>
          <TableBody emptyContent={filteredData.length === 0 ? 'No data' : undefined} className="text-xs">
            {filteredData.map((row, idx) => (
              <TableRow key={row.code || idx} className="text-xs text-gray-800 border-b border-gray-300">
                <TableCell className="text-xs ">{idx + 1}</TableCell>
                <TableCell className="text-xs">
                  <div className="relative w-10 h-10 inline-flex items-center justify-center">
                    <svg className="w-10 h-10 transform -rotate-90" viewBox="0 0 36 36">
                      <path
                        className="text-gray-200"
                        stroke="currentColor"
                        strokeWidth="3"
                        fill="none"
                        d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                      />
                      <path
                        className="text-blue-500"
                        stroke="currentColor"
                        strokeWidth="3"
                        fill="none"
                        strokeDasharray={`${(row.bookingRate * 100).toFixed(0)} 100`}
                        d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                      />
                    </svg>
                    <span className="absolute text-[10px] text-gray-700">
                      {(row.bookingRate * 100).toFixed(0)}%
                    </span>
                  </div>
                </TableCell>
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

