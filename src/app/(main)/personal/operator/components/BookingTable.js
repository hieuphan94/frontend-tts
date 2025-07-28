import {
  Table,
  TableHeader,
  TableBody,
  TableColumn,
  TableRow,
  TableCell,
} from '@nextui-org/react';
import PropTypes from 'prop-types';
import { memo } from 'react';

const columns = [
  { key: 'bookingRate', label: 'Tỷ lệ book' },
  { key: 'code', label: 'Code' },
  { key: 'arrivalDate', label: 'Ngày đến' },
  { key: 'numberOfDays', label: 'Số ngày' },
  { key: 'pax', label: 'Số khách' },
  { key: 'priority', label: 'Ưu tiên' },
  { key: 'sale', label: 'Sale' },
  { key: 'status', label: 'Trạng thái' },
];

export const BookingTable = memo(({ data, onCodeClick }) => {
  return (
    <Table aria-label="Bảng sale booking" removeWrapper className="mt-2 text-xs">
      <TableHeader className="text-xs">
        {columns.map((column) => (
          <TableColumn key={column.key} className="text-xs">{column.label}</TableColumn>
        ))}
      </TableHeader>
      <TableBody emptyContent={data.length === 0 ? 'Không có dữ liệu' : undefined} className="text-xs">
        {data.map((row, idx) => (
          <TableRow key={row.code || idx} className="text-xs border-b border-gray-300">
            <TableCell className="text-xs">{(row.bookingRate * 100).toFixed(0)}%</TableCell>
            <TableCell className="text-xs">
              <button
                type="button"
                className="text-primary underline hover:text-primary-600 transition cursor-pointer px-0.5 py-0.5 rounded"
                onClick={() => onCodeClick(row)}
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
              <span className={
                row.status === 'confirmed'
                  ? 'px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700'
                  : row.status === 'pending'
                  ? 'px-2 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-700'
                  : 'px-2 py-1 rounded-full text-xs font-medium bg-red-100 text-red-700'
              }>
                {row.status}
              </span>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
});

BookingTable.propTypes = {
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

BookingTable.displayName = 'BookingTable';
