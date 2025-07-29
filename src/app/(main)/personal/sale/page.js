'use client';
import { useState, useEffect } from 'react';
import { mockData } from '../operator/data/mockDataTrip';
import { Table, TableHeader, TableColumn, TableBody, TableCell, TableRow, Button } from '@nextui-org/react';
import CreateBookOpModal from './components/createBookOpModal';

export default function SalePage() {
  const [data] = useState(mockData.data);
  const [openModal, setOpenModal] = useState(false);
  const [selectedTrip, setSelectedTrip] = useState(null);
  const [loading, setLoading] = useState(false);



  const handleViewBooking = (trip) => {
    setSelectedTrip(trip);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setSelectedTrip(null);
  };

  const statusColor = {
    active: 'bg-green-100 text-green-700',
    pending: 'bg-yellow-100 text-yellow-700',
    cancelled: 'bg-red-100 text-red-700',
    completed: 'bg-blue-100 text-blue-700',
    '': 'bg-gray-100 text-gray-700',
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Trip List</h2>
      <Table isLoading={loading} aria-label="Trip Table" removeWrapper className="mt-2 text-xs"
        emptyContent={data.length === 0 ? 'No data' : undefined}
      >
        <TableHeader className="text-xs">
          <TableColumn key="code" className="text-xs">Code</TableColumn>
          <TableColumn key="title" className="text-xs">Title</TableColumn>
          <TableColumn key="startDate" className="text-xs">Start Date</TableColumn>
          <TableColumn key="endDate" className="text-xs">End Date</TableColumn>
          <TableColumn key="numberOfDays" className="text-xs">Number of Days</TableColumn>
          <TableColumn key="globalPax" className="text-xs">Global Pax</TableColumn>
          <TableColumn key="customer" className="text-xs">Customer</TableColumn>
          <TableColumn key="createdBy" className="text-xs">Created By</TableColumn>
          <TableColumn key="createdAt" className="text-xs">Created At</TableColumn>
          <TableColumn key="totalPrice" className="text-xs">Total Price</TableColumn>
          <TableColumn key="status" className="text-xs">Status</TableColumn>
          <TableColumn key="actions" className="text-xs">Actions</TableColumn>
        </TableHeader>
        <TableBody emptyContent={data.length === 0 ? 'No data' : undefined} className="text-xs">
          {data.map((trip) => (
            <TableRow key={trip.id} className="text-xs border-b border-gray-300">
              <TableCell className="text-xs">{trip.code}</TableCell>
              <TableCell className="text-xs">{trip.title}</TableCell>
              <TableCell className="text-xs">{new Date(trip.startDate).toLocaleDateString('vi-VN')}</TableCell>
              <TableCell className="text-xs">{new Date(trip.endDate).toLocaleDateString('vi-VN')}</TableCell>
              <TableCell className="text-xs">{trip.settings?.numberOfDays}</TableCell>
              <TableCell className="text-xs">{trip.settings?.globalPax}</TableCell>
              <TableCell className="text-xs">{trip.customerInfo?.name}</TableCell>
              <TableCell className="text-xs">{trip.internalInfo?.createdBy}</TableCell>
              <TableCell className="text-xs">{trip.internalInfo?.createdAt ? new Date(trip.internalInfo.createdAt).toLocaleDateString('vi-VN') : ''}</TableCell>
              <TableCell className="text-xs">{trip.totalPrice?.toLocaleString()} đ</TableCell>
              <TableCell className="text-xs">
                <span className={`px-2 py-1 rounded-full text-xs ${statusColor[trip.status.current] || statusColor['']}`}>
                  {trip.status.current}
                </span>
              </TableCell>
              <TableCell className="text-xs">
                <Button
                  isIconOnly
                  size="sm"
                  className="text-xs w-full"
                  color="primary"
                  variant="solid"
                  aria-label="Book to Op"
                  onPress={() => handleViewBooking(trip)}
                >
                  <span className="text-xs">Book to Op</span>
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <CreateBookOpModal
        trip={selectedTrip}
        open={openModal}
        onClose={handleCloseModal}
      />
    </div>
  );
}