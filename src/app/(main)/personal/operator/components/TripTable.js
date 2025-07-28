import {
  Table,
  TableHeader,
  TableBody,
  TableColumn,
  TableRow,
  TableCell,
  Button,
} from '@nextui-org/react';
import { Eye } from 'lucide-react';
import PropTypes from 'prop-types';
import { memo } from 'react';

const columns = [
  { key: 'code', label: 'Mã Trip' },
  { key: 'title', label: 'Tên Tour' },
  { key: 'startDate', label: 'Ngày bắt đầu' },
  { key: 'endDate', label: 'Ngày kết thúc' },
  { key: 'numberOfDays', label: 'Số ngày' },
  { key: 'globalPax', label: 'Số khách' },
  { key: 'customer', label: 'Khách hàng' },
  { key: 'createdBy', label: 'Người tạo' },
  { key: 'createdAt', label: 'Ngày tạo' },
  { key: 'totalPrice', label: 'Giá tổng' },
  { key: 'status', label: 'Trạng thái' },
  { key: 'actions', label: 'Thao tác' },
];

export const TripTable = memo(({ trips, loadingTripIds, onView }) => {
  return (
    <Table aria-label="Bảng danh sách Trip" removeWrapper className="mt-2 text-xs">
      <TableHeader className="text-xs">
        {columns.map((column) => (
          <TableColumn key={column.key} className="text-xs">{column.label}</TableColumn>
        ))}
      </TableHeader>
      <TableBody emptyContent={trips.length === 0 ? 'Không có dữ liệu' : undefined} className="text-xs">
        {trips.map((trip) => (
          <TableRow key={trip.id} className="text-xs border-b border-gray-300">
            <TableCell className="text-xs">{trip.code}</TableCell>
            <TableCell className="text-xs">{trip.title}</TableCell>
            <TableCell className="text-xs">{new Date(trip.startDate).toLocaleString('vi-VN')}</TableCell>
            <TableCell className="text-xs">{new Date(trip.endDate).toLocaleString('vi-VN')}</TableCell>
            <TableCell className="text-xs">{trip.settings?.numberOfDays}</TableCell>
            <TableCell className="text-xs">{trip.settings?.globalPax}</TableCell>
            <TableCell className="text-xs">{trip.customerInfo?.name}</TableCell>
            <TableCell className="text-xs">{trip.internalInfo?.createdBy}</TableCell>
            <TableCell className="text-xs">{trip.internalInfo?.createdAt ? new Date(trip.internalInfo.createdAt).toLocaleString('vi-VN') : ''}</TableCell>
            <TableCell className="text-xs">{trip.totalPrice?.toLocaleString()} đ</TableCell>
            <TableCell className="text-xs">
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${trip.status.current === 'active' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>{trip.status.current}</span>
            </TableCell>
            <TableCell className="text-xs">
              <Button
                isIconOnly
                size="sm"
                color="primary"
                variant="solid"
                aria-label="Xem"
                onPress={() => onView(trip)}
                isLoading={loadingTripIds.view?.includes(trip.id)}
              >
                <span className="text-xs ">Book</span>
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
});

TripTable.propTypes = {
  trips: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      code: PropTypes.string,
      title: PropTypes.string,
      startDate: PropTypes.string,
      endDate: PropTypes.string,
      settings: PropTypes.shape({
        numberOfDays: PropTypes.number,
        globalPax: PropTypes.number,
      }),
      customerInfo: PropTypes.shape({
        name: PropTypes.string,
      }),
      internalInfo: PropTypes.shape({
        createdBy: PropTypes.string,
        createdAt: PropTypes.string,
      }),
      totalPrice: PropTypes.number,
      status: PropTypes.shape({
        current: PropTypes.string,
      }),
    })
  ).isRequired,
  loadingTripIds: PropTypes.shape({
    view: PropTypes.arrayOf(PropTypes.string),
  }),
  onView: PropTypes.func.isRequired,
};

TripTable.displayName = 'TripTable';
