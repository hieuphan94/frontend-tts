import {
  Table,
  TableHeader,
  TableBody,
  TableColumn,
  TableRow,
  TableCell,
  Button,
} from '@nextui-org/react';
import PropTypes from 'prop-types';
import { memo, useState } from 'react';
import { mockServicesData, paymentOptions, statusOptions } from '../data/mockDataBookingDetail';
import { handlePaymentPercentChange } from '../utils/handlePercentChange';
import { GroupSelectModal } from './GroupSelectModal';

const columns = [
  { key: 'group', label: 'Group' },
  { key: 'quantity', label: 'SL' },
  { key: 'unitPrice', label: 'Unit Price' },
  { key: 'total', label: 'Total' },
  { key: 'cost', label: 'Cost' },
  { key: 'payment', label: 'Payment' },
  { key: 'status', label: 'Status' },
  { key: 'book', label: 'Book' },
  { key: 'notes', label: 'Notes' },
];

const mockDataListGroup = [
  {
    id: 1,
    name: 'Mường Thanh',
  },
  {
    id: 2,
    name: 'Legend',
  },
  {
    id: 3,
    name: 'Acros',
  },

  {
    id: 4,
    name: 'Vinpearl',
  },
  {
    id: 5,
    name: 'InterContinental',
  },
];

export const ServicesTable = memo(({ data = mockServicesData }) => {
  const [servicesData, setServicesData] = useState(data);
  const [modalOpen, setModalOpen] = useState(false);

  // Xử lý thay đổi loại payment
  const handlePaymentChange = (serviceId, value) => {
    setServicesData(prevData => prevData.map(service => {
      if (service.id === serviceId) {
        return {
          ...service,
          payment: value,
          paymentPercent: { CK: 0, TM: 0 },
        };
      }
      return service;
    }));
  };

  const handleStatusChange = (serviceId, value) => {

    setServicesData(prevData => prevData.map(service => {
      if (service.id === serviceId) {
        return { ...service, status: value };
      }
      return service;
    }));
  };

  const handleCostChange = (serviceId, value) => {

    setServicesData(prevData => prevData.map(service => {
      if (service.id === serviceId) {
        return { ...service, cost: value };
      }
      return service;
    }));
  };


  return (
    <>
      <GroupSelectModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
      />
      <Table aria-label="Services Table" removeWrapper className="mt-2 text-xs">
        <TableHeader className="text-xs">
          {columns.map((column) => (
            <TableColumn key={column.key} className="text-xs">{column.label}</TableColumn>
          ))}
        </TableHeader>
        <TableBody emptyContent={servicesData.length === 0 ? 'No data' : undefined} className="text-xs">
          {servicesData.map((row, idx) => (
            <TableRow key={row.id || idx} className="text-xs text-gray-800 border-b border-gray-300">
              <TableCell className="text-xs">
                <button
                  className="underline"
                  onClick={() => setModalOpen(true)}
                  type="button"
                >
                  {row.group}
                </button>
              </TableCell>
              <TableCell className="text-xs">{row.quantity}</TableCell>
              <TableCell className="text-xs">{row.unitPrice}</TableCell>
              <TableCell className="text-xs">{row.total}</TableCell>
              <TableCell className="text-xs">
                <input
                  type="number"
                  value={row.cost}
                  className="w-1/2   text-xs p-1 border rounded"
                  onChange={e => handleCostChange(row.id, e.target.value)}
                />
              </TableCell>
              <TableCell className="text-xs">
                <div className="flex items-center gap-2">
                  {/* Dropdown chọn loại payment */}
                  <select
                    className="border rounded px-2 py-1 text-xs"
                    value={row.payment}
                    onChange={e => handlePaymentChange(row.id, e.target.value)}
                  >
                    {paymentOptions.map(opt => (
                      <option key={opt.key} value={opt.key}>
                        {opt.label}
                      </option>
                    ))}
                  </select>

                  {/* Input phần trăm */}
                  {row.payment === 'TM/CK' ? (
                    <div className="flex flex-col gap-1">
                      <div className="flex items-center gap-1">
                        <input
                          type="number"
                          min={0}
                          max={100}
                          value={row.paymentPercent?.CK || 0}
                          onChange={e => handlePaymentPercentChange(row.id, 'CK', e.target.value)}
                          className="w-14 border rounded px-1 py-0.5 text-xs text-right"
                        />
                        <span className="text-xs text-gray-600">% CK</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <input
                          type="number"
                          min={0}
                          max={100}
                          value={row.paymentPercent?.TM || 0}
                          onChange={e => handlePaymentPercentChange(row.id, 'TM', e.target.value)}
                          className="w-14 border rounded px-1 py-0.5 text-xs text-right"
                        />
                        <span className="text-xs text-gray-600">% TM</span>
                      </div>
                    </div>
                  ) : row.payment === 'CK' || row.payment === 'TM' ? (
                    <div className="flex items-center gap-1">
                      <input
                        type="number"
                        min={0}
                        max={100}
                        value={row.payment === 'CK' ? (row.paymentPercent?.CK || 0) : (row.paymentPercent?.TM || 0)}
                        onChange={e => handlePaymentPercentChange(row.id, row.payment, e.target.value)}
                        className="w-14 border rounded px-1 py-0.5 text-xs text-right"
                      />
                      <span className="text-xs text-gray-600">% {row.payment}</span>
                    </div>
                  ) : null}
                </div>
              </TableCell>

              <TableCell className="text-xs">
                <div className="flex items-center gap-2">
                  <select
                    className="border rounded px-2 py-1 text-xs"
                    value={row.status}
                    onChange={e => handleStatusChange(row.id, e.target.value)}
                  >
                    {statusOptions.map(opt => (
                      <option key={opt.key} value={opt.key}>
                        {opt.label}
                      </option>
                    ))}
                  </select>
                </div>
              </TableCell>
              <TableCell className="text-xs">
                <textarea
                  value={row.notes}
                  onChangeText={() => { }}
                  className="w-full text-xs p-1 border rounded resize-none"
                  rows={1}
                />
              </TableCell>
              <TableCell className="text-xs">
                <Button
                  isIconOnly
                  size="sm"
                  className="text-xs w-full"
                  color="primary"
                  variant="solid"
                  aria-label="Book to Op"
                >
                  <span className="text-xs">Book</span>
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>

      </Table>
    </>
  );
});

ServicesTable.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      group: PropTypes.string,
      quantity: PropTypes.number,
      unitPrice: PropTypes.string,
      total: PropTypes.string,
      cost: PropTypes.string,
      payment: PropTypes.string,
      status: PropTypes.string,
      book: PropTypes.bool,
      notes: PropTypes.string,
    })
  ),
};

ServicesTable.displayName = 'ServicesTable';
