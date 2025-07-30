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
import { mockDataService, mockServicesData, paymentOptions, statusOptions } from '../data/mockDataBookingDetail';
import ServiceMultiSelect from './ServiceMultiSelect';

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

export const ServicesTable = memo(({ data = mockServicesData }) => {
  const [servicesData, setServicesData] = useState(data);

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
      <Table aria-label="Services Table" removeWrapper className="mt-2 text-xs">
        <TableHeader className="text-xs">
          {columns.map((column) => (
            <TableColumn key={column.key} className="text-xs">{column.label}</TableColumn>
          ))}
        </TableHeader>
        <TableBody emptyContent={servicesData.length === 0 ? 'No data' : undefined} className="text-xs">
          {servicesData.map((row, idx) => (
            <TableRow key={row.id || idx} className="text-xs text-gray-800 border-b border-gray-300">
              <TableCell className="text-xs w-1/4">
                <div className="flex flex-col gap-1">
                  <div className="text-xs font-medium text-gray-800">{row.group}</div>
                  <ServiceMultiSelect
                    value={row.service}
                    onChange={(value) => handleServiceChange(row.id, value)}
                    options={mockDataService}
                    placeholder="Select group"
                  />
                </div>
              </TableCell>
              <TableCell className="text-xs">{row.quantity}</TableCell>
              <TableCell className="text-xs">{row.unitPrice}</TableCell>
              <TableCell className="text-xs">{row.total}</TableCell>
              <TableCell className="text-xs">
                <input
                  type="number"
                  value={row.cost}
                  className="text-xs p-1 border rounded w-25"
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
                  <div className="flex items-center gap-1">
                    <input
                      type="number"
                      min={0}
                      max={100}
                      className="w-14 border rounded px-1 py-0.5 text-xs text-right"
                    />
                    <span className="text-xs text-gray-600">%</span>
                  </div>
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
