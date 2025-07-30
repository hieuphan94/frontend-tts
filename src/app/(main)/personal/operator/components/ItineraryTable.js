import {
    Table,
    TableHeader,
    TableBody,
    TableColumn,
    TableRow,
    TableCell,
    Select,
    SelectItem,
} from '@nextui-org/react';
import PropTypes from 'prop-types';
import { memo, useState, useEffect } from 'react';
import { mockDataItineraryTable, paymentOptions, statusOptions } from '../data/mockDataBookingDetail';
import ServiceMultiSelect from './ServiceMultiSelect';


const columnsItineraryTable = [
    { key: 'day', label: 'Day' },
    { key: 'quantity', label: 'Qty (SL)' },
    { key: 'unitPrice', label: 'Unit Price' },
    { key: 'total', label: 'Total' },
    { key: 'cost', label: 'Cost' },
    { key: 'payment', label: 'Payment' },
    { key: 'status', label: 'Status' },
];

const mockDataService = [
    {
        id: 1,
        name: 'Service 1',
        price: 100,
    },
    {
        id: 2,
        name: 'Service 2',
        price: 200,
    },
    {
        id: 3,
        name: 'Service 3',
        price: 300,
    },
];

export const ItineraryTable = memo(({ data = mockDataItineraryTable }) => {
    const [tableData, setTableData] = useState(data);
    const [openDropdowns, setOpenDropdowns] = useState({});



    // Xử lý thay đổi loại payment
    const handlePaymentChange = (rowId, value) => {
        setTableData(prev =>
            prev.map(row =>
                row.id === rowId
                    ? { ...row, payment: value, paymentPercent: { CK: 0, TM: 0 } }
                    : row
            )
        );
    };

    // Xử lý thay đổi status
    const handleStatusChange = (rowId, value) => {
        setTableData(prev =>
            prev.map(row =>
                row.id === rowId
                    ? { ...row, status: value }
                    : row
            )
        );
    };

    const handleCostChange = (rowId, value) => {

        setTableData(prevData => prevData.map(row => {
            if (row.id === rowId) {
                return { ...row, cost: value };
            }
            return row;
        }));
    };

    // Xử lý thay đổi service
    const handleServiceChange = (rowId, value) => {
        setTableData(prev =>
            prev.map(row =>
                row.id === rowId
                    ? { ...row, service: value }
                    : row
            )
        );
    };

    // Xử lý chọn/bỏ chọn service
    const handleServiceToggle = (rowId, serviceName) => {
        setTableData(prev =>
            prev.map(row => {
                if (row.id === rowId) {
                    const currentServices = row.service ? row.service.split(', ') : [];
                    const isSelected = currentServices.includes(serviceName);

                    let newServices;
                    if (isSelected) {
                        newServices = currentServices.filter(s => s !== serviceName);
                    } else {
                        newServices = [...currentServices, serviceName];
                    }

                    return { ...row, service: newServices.join(', ') };
                }
                return row;
            })
        );
    };

    // Xử lý chọn tất cả services
    const handleSelectAllServices = (rowId) => {
        setTableData(prev =>
            prev.map(row => {
                if (row.id === rowId) {
                    const allServices = mockDataService.map(s => s.name).join(', ');
                    return { ...row, service: allServices };
                }
                return row;
            })
        );
    };

    // Xử lý bỏ chọn tất cả services
    const handleDeselectAllServices = (rowId) => {
        setTableData(prev =>
            prev.map(row => {
                if (row.id === rowId) {
                    return { ...row, service: '' };
                }
                return row;
            })
        );
    };

    // Xử lý mở/đóng dropdown
    const toggleDropdown = (rowId) => {
        setOpenDropdowns(prev => ({
            ...prev,
            [rowId]: !prev[rowId]
        }));
    };

    // Xử lý đóng dropdown khi click ra ngoài
    const closeDropdown = (rowId) => {
        setOpenDropdowns(prev => ({
            ...prev,
            [rowId]: false
        }));
    };



    return (
        <>
            <Table aria-label="Itinerary Table" removeWrapper className="mt-2 text-xs">
                <TableHeader className="text-xs">
                    {columnsItineraryTable.map((column) => (
                        <TableColumn key={column.key} className="text-xs">{column.label}</TableColumn>
                    ))}
                </TableHeader>
                <TableBody emptyContent={tableData.length === 0 ? 'Không có dữ liệu' : undefined}>
                    {tableData.map((row, idx) => (

                        <TableRow key={row.id || row.code || idx} className="text-xs text-gray-800 border-b border-gray-300">
                            <TableCell className="text-xs">
                                <div className="flex flex-col gap-1">
                                    <div className="text-xs font-medium text-gray-800">{row.day}</div>
                                    <ServiceMultiSelect
                                        value={row.service}
                                        onChange={(value) => handleServiceChange(row.id, value)}
                                        options={mockDataService}
                                        placeholder="Select service"
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
                                    className="w-25 text-xs p-1 border rounded"
                                    onChange={e => handleCostChange(row.id, e.target.value)}
                                /></TableCell>
                            <TableCell className="text-xs">
                                <div className="flex items-center gap-2">
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
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </>
    );
});

ItineraryTable.propTypes = {
    data: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.number,
            day: PropTypes.string,
            service: PropTypes.string,
            quantity: PropTypes.number,
            unitPrice: PropTypes.string,
            total: PropTypes.string,
            cost: PropTypes.string,
            payment: PropTypes.string,
            status: PropTypes.string,
        })
    ),
};

ItineraryTable.displayName = 'ItineraryTable';