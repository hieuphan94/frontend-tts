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
import { paymentOptions, statusOptions } from '../data/mockDataBookingDetail';
import { colorStatusBooking } from '../utils/colorStatusBooking';
import { ChevronDownIcon, Replace } from 'lucide-react';

const columns = [
  { key: 'service', label: 'Service ' },
  { key: 'quantity', label: 'SL' },
  { key: 'unitPrice', label: 'Unit Price' },
  { key: 'total', label: 'Total' },
  { key: 'cost', label: 'Cost' },
  { key: 'payment', label: 'Payment' },
  { key: 'status', label: 'Status' },
  { key: 'notes', label: 'Notes' },
];

export const ServicesTable = memo(({ data }) => {
  const [servicesData, setServicesData] = useState(data);
  const [collapsedGroups, setCollapsedGroups] = useState(new Set());

  const toggleGroup = (groupId) => {
    setCollapsedGroups(prev => {
      const newSet = new Set(prev);
      if (newSet.has(groupId)) {
        newSet.delete(groupId);
      } else {
        newSet.add(groupId);
      }
      return newSet;
    });
  };

  // Xử lý thay đổi loại payment
  const handlePaymentChange = (groupId, serviceId, value) => {
    setServicesData(prevData => prevData.map(group => {
      if (group.id === groupId) {
        return {
          ...group,
          services: group.services.map(service => {
            if (service.id === serviceId) {
              return {
                ...service,
                payment: value,
                paymentPercent: { CK: 0, TM: 0 },
              };
            }
            return service;
          })
        };
      }
      return group;
    }));
  };

  const handleStatusChange = (groupId, serviceId, value) => {
    setServicesData(prevData => prevData.map(group => {
      if (group.id === groupId) {
        return {
          ...group,
          services: group.services.map(service => {
            if (service.id === serviceId) {
              return { ...service, status: value };
            }
            return service;
          })
        };
      }
      return group;
    }));
  };

  const handleCostChange = (groupId, serviceId, value) => {
    setServicesData(prevData => prevData.map(group => {
      if (group.id === groupId) {
        return {
          ...group,
          services: group.services.map(service => {
            if (service.id === serviceId) {
              return { ...service, cost: value };
            }
            return service;
          })
        };
      }
      return group;
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
          {servicesData.map((group) => (
            <>
              {/* Group Header Row */}
              <TableRow key={`group-${group.id}`} className="text-xs bg-gray-50 border-b border-gray-300">
                <TableCell
                  colSpan={8}
                  className="text-xs font-bold text-gray-800 py-2 cursor-pointer hover:bg-gray-100 transition-colors"
                  onClick={() => toggleGroup(group.id)}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 flex items-center justify-center text-gray-600">
                        <ChevronDownIcon className={`w-3 h-3 text-primary`} />
                      </div>
                      <span>{group.service}</span>
                      <span className="text-xs text-gray-800 font-medium">
                        ({group.services.length} services)
                      </span>
                    </div>
                    <div className="flex items-center gap-4 text-xs">
                      <div className="flex items-center gap-1">
                        <span className="text-blue-600">Giá hệ thống:</span>
                        <span className="font-bold">{group.totalSale || '0'}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <span className="text-green-600">Giá bán:</span>
                        <span className="font-bold"></span>
                      </div>
                    </div>
                  </div>
                </TableCell>
              </TableRow>

              {/* Service Rows */}
              {!collapsedGroups.has(group.id) && group.services.map((service) => (
                <TableRow key={service.id} className="text-xs text-gray-800 border-b border-gray-200">
                  <TableCell className="text-xs w-[200px] max-w-[200px]">
                    <div className="w-full">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleReplaceService(group.id, service.id)}
                          className="w-4 h-4 flex items-center justify-center text-gray-500 hover:text-blue-600 transition-colors"
                        >
                          <Replace className="w-4 h-4" />
                        </button>
                        <div className="text-xs text-gray-800 break-words leading-tight">
                          {service.service}
                        </div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="text-xs">
                    <div className="text-xs font-medium">
                      {service.quantity}
                    </div>
                  </TableCell>
                  <TableCell className="text-xs">
                    <div className="text-xs font-medium">
                      {service.unitPrice}
                    </div>
                  </TableCell>
                  <TableCell className="text-xs">
                    <div className="text-xs font-medium">
                      {service.total}
                    </div>
                  </TableCell>
                  <TableCell className="text-xs">
                    <input
                      type="number"
                      value={service.cost}
                      className="w-20 text-xs p-1 border rounded"
                      onChange={e => handleCostChange(group.id, service.id, e.target.value)}
                    />
                  </TableCell>
                  <TableCell className="text-xs">
                    <div className="flex items-center gap-2">
                      <select
                        className="border rounded px-2 py-1 text-xs font-medium"
                        value={service.payment}
                        onChange={e => handlePaymentChange(group.id, service.id, e.target.value)}
                      >
                        {paymentOptions.map(opt => (
                          <option key={opt.key} value={opt.key}>
                            {opt.label}
                          </option>
                        ))}
                      </select>

                      <div className="flex items-center gap-1">
                        <input
                          type="number"
                          min={0}
                          max={100}
                          className="w-12 border rounded px-1 py-0.5 text-xs"
                        />
                        <span className="text-xs text-gray-600">%</span>
                      </div>
                    </div>
                  </TableCell>

                  <TableCell className="text-xs">
                    <select
                      className={`border rounded px-2 py-1 text-xs font-medium ${colorStatusBooking(service.status)}`}
                      value={service.status}
                      onChange={e => handleStatusChange(group.id, service.id, e.target.value)}
                    >
                      {statusOptions.map(opt => (
                        <option key={opt.key} value={opt.key}>
                          {opt.label}
                        </option>
                      ))}
                    </select>
                  </TableCell>
                  <TableCell className="text-xs w-[400px] max-w-[400px]">
                    <textarea
                      value={service.notes}
                      onChange={(e) => {
                        // Handle notes change
                      }}
                      className="w-full h-20 text-xs p-2 border rounded resize-none overflow-y-auto"
                    />
                  </TableCell>
                </TableRow>
              ))}
            </>
          ))}
        </TableBody>
      </Table>
    </>
  );
});