'use client';
import { useState, useEffect } from 'react';
import { Table, TableHeader, TableColumn, TableBody, TableCell, TableRow, Button, Pagination } from '@nextui-org/react';
import { useTrips } from '@/hooks/useTrips';
import CreateBookOpModal from './components/createBookOpModal';
import ColumnVisibilityModal from './components/ColumnVisibilityModal';
import { FilterIcon } from 'lucide-react';
import { colorStatusRequest } from './utils/colorStatusRequest';

export default function SalePage() {
  const [openBookOpModal, setOpenBookOpModal] = useState(false);
  const [openColumnVisibilityModal, setOpenColumnVisibilityModal] = useState(false);
  const [selectedTrip, setSelectedTrip] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const { fetchTrips, loading, trips, pagination } = useTrips();
  useEffect(() => {
    fetchTrips({
      page: currentPage,
      limit: pageSize,
    });
  }, [currentPage, pageSize]);

  const handlePageSizeChange = (e) => {
    setPageSize(Number(e.target.value));
    setCurrentPage(1); // Reset về trang 1 khi đổi pageSize
  };

  const handleViewBooking = (trip) => {
    setSelectedTrip(trip);
    setOpenBookOpModal(true);
  };

  const handleCloseModal = () => {
    setOpenBookOpModal(false);
    setSelectedTrip(null);
  }

  return (
    <div>
      {/* header */}
      <div className="flex justify-between items-center mb-2">
        <h1 className="text-xl text-gray-800 font-semibold">Request List</h1>
        <div>
          <Button onPress={() => setOpenColumnVisibilityModal(true)} isIconOnly variant="faded" color="gray">
            <FilterIcon className="w-4 h-4" />
          </Button>
        </div>
      </div>
      {/* Table scrollable */}
      <div className=" ">
        <div className="overflow-y-auto" style={{ maxHeight: 500 }}>
          <Table
            isLoading={loading}
            aria-label="Trip Table"
            removeWrapper
            className="text-xs min-w-full"
          >
            <TableHeader className="text-xs">
              <TableColumn key="code">Code</TableColumn>
              <TableColumn key="title">Title</TableColumn>
              <TableColumn key="numberOfDays">Days</TableColumn>
              <TableColumn key="globalPax" >Global Pax</TableColumn>
              <TableColumn key="customer">Customer</TableColumn>
              <TableColumn key="createdAt">Created At</TableColumn>
              <TableColumn key="totalPrice">Total Price</TableColumn>
              <TableColumn key="status">Status</TableColumn>
              <TableColumn key="actions">Actions</TableColumn>
            </TableHeader>
            <TableBody emptyContent={(!trips || trips.length === 0) ? 'No data' : undefined}>
              {trips && trips.map((trip) => (
                <TableRow key={trip.id} className="text-xs text-gray-800 border-b border-gray-300">
                  <TableCell className="text-xs font-semibold">{trip.code}</TableCell>
                  <TableCell className="text-xs">{trip.title}</TableCell>
                  <TableCell className="text-xs">{trip.settings?.numberOfDays}</TableCell>
                  <TableCell className="text-xs">{trip.settings?.globalPax}</TableCell>
                  <TableCell className="text-xs">{trip.customerInfo?.name }</TableCell>
                  <TableCell className="text-xs">{trip.internalInfo?.createdAt ? new Date(trip.internalInfo.createdAt).toLocaleDateString('vi-VN') : ''}</TableCell>
                  <TableCell className="text-xs">{trip.totalPrice}</TableCell>
                  <TableCell className="text-xs">
                    <span className={`px-2 py-1 rounded-full text-xs ${colorStatusRequest[trip.status.current] || colorStatusRequest['']}`}>
                      {trip.status.current}
                    </span>
                  </TableCell>
                  <TableCell className="text-xs">
                    <Button
                      size="sm"
                      className="text-xs"
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
        </div>
        {/* Pagination + Page size selector fixed below table */}
        <div className="flex items-center justify-between gap-4 px-2 py-3 border-t">
          <div>
            <p className="text-xs text-gray-500 mt-1">
              Displaying {pagination?.total || 0} requests
            </p>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-2 text-xs">
              <span>
                Hiển thị:
              </span>
              <select
                className="border rounded px-2 py-1"
                value={pageSize}
                onChange={handlePageSizeChange}
              >
                {[5, 10, 20, 50].map(size => (
                  <option key={size} value={size}>{size}</option>
                ))}
              </select>
            </div>
            <Pagination
              page={pagination?.page || 1}
              total={pagination?.totalPages || 1}
              onChange={setCurrentPage}
              showControls
            />
          </div>
        </div>
      </div>
      <CreateBookOpModal
        trip={selectedTrip}
        open={openBookOpModal}
        onClose={handleCloseModal}
      />
      <ColumnVisibilityModal
        open={openColumnVisibilityModal}
        onClose={() => setOpenColumnVisibilityModal(false)}
      />
    </div>
  );
}