import {
    Table,
    TableHeader,
    TableBody,
    TableColumn,
    TableRow,
    TableCell,
} from '@nextui-org/react';
import PropTypes from 'prop-types';
import { memo, useState } from 'react';
import { mockDataItineraryTable, paymentOptions, statusOptions } from '../data/mockDataBookingDetail';
import { handlePaymentPercentChange } from '../utils/handlePercentChange';
import { GroupSelectModal } from './GroupSelectModal';


const columnsItineraryTable = [
    { key: 'day', label: 'Day' },
    { key: 'quantity', label: 'Qty (SL)' },
    { key: 'unitPrice', label: 'Unit Price' },
    { key: 'total', label: 'Total' },
    { key: 'cost', label: 'Cost' },
    { key: 'payment', label: 'Payment' },
    { key: 'status', label: 'Status' },
];

export const ItineraryTable = memo(({ data = mockDataItineraryTable }) => {
    const [tableData, setTableData] = useState(data);
    const [modalOpen, setModalOpen] = useState(false);



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


    return (
        <>
            <GroupSelectModal
                open={modalOpen}
                onClose={() => setModalOpen(false)}
            />
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
                                    <button
                                        className="underline text-left font-medium"
                                        onClick={() => setModalOpen(true)}
                                        type="button"
                                    >
                                        {row.day}
                                    </button>
                                    <div className="text-xs text-gray-600 ">
                                        {row.service}
                                    </div>
                                </div>
                            </TableCell>
                            <TableCell className="text-xs">{row.quantity}</TableCell>
                            <TableCell className="text-xs">{row.unitPrice}</TableCell>
                            <TableCell className="text-xs">{row.total}</TableCell>
                            <TableCell className="text-xs">
                                <input
                                    type="number"
                                    value={row.cost}
                                    className="w-1/2 text-xs p-1 border rounded"
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