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
    <Table aria-label="Bảng danh sách Trip" removeWrapper className="mt-2">
      <TableHeader>
        {columns.map((column) => (
          <TableColumn key={column.key}>{column.label}</TableColumn>
        ))}
      </TableHeader>
      <TableBody emptyContent={trips.length === 0 ? 'Không có dữ liệu' : undefined}>
        {trips.map((trip) => (
          <TableRow key={trip.id}>
            <TableCell>{trip.code}</TableCell>
            <TableCell>{trip.title}</TableCell>
            <TableCell>{new Date(trip.startDate).toLocaleDateString()}</TableCell>
            <TableCell>{new Date(trip.endDate).toLocaleDateString()}</TableCell>
            <TableCell>{trip.settings?.numberOfDays}</TableCell>
            <TableCell>{trip.settings?.globalPax}</TableCell>
            <TableCell>{trip.customerInfo?.name}</TableCell>
            <TableCell>{trip.internalInfo?.createdBy}</TableCell>
            <TableCell>{trip.internalInfo?.createdAt ? new Date(trip.internalInfo.createdAt).toLocaleDateString() : ''}</TableCell>
            <TableCell>{trip.totalPrice?.toLocaleString()} đ</TableCell>
            <TableCell>
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${trip.status.current === 'active' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>{trip.status.current}</span>
            </TableCell>
            <TableCell>
              <Button
                isIconOnly
                size="sm"
                color="secondary"
                variant="solid"
                aria-label="Xem"
                onPress={() => onView(trip)}
                isLoading={loadingTripIds.view?.includes(trip.id)}
              >
                <Eye size={18} />
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
