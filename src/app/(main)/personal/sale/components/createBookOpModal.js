import { useState, useEffect, useCallback } from 'react';
import { Button, Modal, ModalContent } from '@nextui-org/react';
import PropTypes from 'prop-types';

export default function CreateBookOpModal({ trip, open, onClose }) {
    const [formData, setFormData] = useState({
        code: '',
        sgl: '',
        dbl: '',
        twn: '',
        tpl: '',
        note: '',
        paid: false,
        priority: false,
        vote: false,
        file: null,
    });
    const [loading, setLoading] = useState(false);

    // Giả lập số người lớn/trẻ em
    const numAdults = 2;
    const numChildren = 1;

    useEffect(() => {
        if (trip) {
            setFormData({
                code: trip.code || '',
                sgl: '',
                dbl: '',
                twn: '',
                tpl: '',
                note: '',
                paid: false,
                priority: false,
                vote: false,
                file: null,
            });
        }
    }, [trip, open]);

    const handleFileChange = (e) => {
        setFormData({
            ...formData,
            file: e.target.files[0],
        });
    };

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [name]: type === 'checkbox' ? checked : value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        // Xử lý gửi dữ liệu (giả lập delay)
        setTimeout(() => {
            setLoading(false);
            alert('Đã gửi sale booking!');
            onClose();
        }, 1000);
    };

    const handleClose = useCallback(() => {
        setFormData({
            code: '',
            sgl: '',
            dbl: '',
            twn: '',
            tpl: '',
            note: '',
            paid: false,
            priority: false,
            vote: false,
            file: null,
        });
        setLoading(false);
        onClose();
    }, [onClose]);

    return (
        <Modal isOpen={open} onOpenChange={onClose} size="4xl">
            <ModalContent>
                <form onSubmit={handleSubmit} className="w-full mx-auto p-4 bg-white rounded-lg shadow space-y-6 border border-gray-200">
                    {/* Trip ID Display */}
                    {trip && (
                        <p className="text-sm text-blue-900">Booking for Trip: {trip.code}</p>
                    )}
                    {/* Hàng 1 */}
                    <div className="flex flex-col md:flex-row gap-4">
                        <div className="flex-1 md:flex-[2]">
                            <label className="block text-sm text-gray-600 mb-1">Code</label>
                            <input
                                type="text"
                                name="code"
                                value={formData.code}
                                onChange={handleChange}
                                placeholder="Nhập mã code"
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary/20 text-sm"
                            />
                        </div>
                        <div className="flex-1 flex flex-col justify-center items-start md:items-center">
                            <div className="text-xs text-gray-500">Người lớn</div>
                            <div className="font-semibold text-base">{numAdults}</div>
                        </div>
                        <div className="flex-1 flex flex-col justify-center items-start md:items-center">
                            <div className="text-xs text-gray-500">Trẻ em</div>
                            <div className="font-semibold text-base">{numChildren}</div>
                        </div>
                    </div>
                    {/* Hàng 2 */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <div>
                            <label className="block text-sm text-gray-600 mb-1">SGL</label>
                            <input type="number" name="sgl" value={formData.sgl} onChange={handleChange} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary/20 text-sm" />
                        </div>
                        <div>
                            <label className="block text-sm text-gray-600 mb-1">DBL</label>
                            <input type="number" name="dbl" value={formData.dbl} onChange={handleChange} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary/20 text-sm" />
                        </div>
                        <div>
                            <label className="block text-sm text-gray-600 mb-1">TWN</label>
                            <input type="number" name="twn" value={formData.twn} onChange={handleChange} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary/20 text-sm" />
                        </div>
                        <div>
                            <label className="block text-sm text-gray-600 mb-1">TPL</label>
                            <input type="number" name="tpl" value={formData.tpl} onChange={handleChange} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary/20 text-sm" />
                        </div>
                    </div>
                    {/* Hàng 3 */}
                    <div className="flex flex-col md:flex-row gap-4 items-center">
                        <div className="flex items-center md:w-32 w-full">
                            <label htmlFor="paid" className="text-sm text-gray-700 select-none mr-2">Đã trả tiền</label>
                            <input
                                id="paid"
                                name="paid"
                                type="checkbox"
                                checked={formData.paid}
                                onChange={handleChange}
                                className="accent-primary h-4 w-4 rounded border-gray-300 focus:ring-primary/20"
                            />
                        </div>
                        <div className="flex-1 w-full">
                            <label className="block text-sm text-gray-600 mb-1">Ghi chú</label>
                            <textarea
                                name="note"
                                value={formData.note}
                                onChange={handleChange}
                                placeholder="Nhập ghi chú..."
                                rows={2}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary/20 text-sm resize-none"
                            />
                        </div>
                        <div className="flex items-center md:w-32 w-full">
                            <label htmlFor="priority" className="text-sm text-gray-700 select-none mr-2">Ưu tiên</label>
                            <input
                                id="priority"
                                name="priority"
                                type="checkbox"
                                checked={formData.priority}
                                onChange={handleChange}
                                className="accent-primary h-4 w-4 rounded border-gray-300 focus:ring-primary/20"
                            />
                        </div>
                    </div>
                    {/* Hàng 4 */}
                    <div className="flex flex-col md:flex-row gap-4 items-center">
                        <div className="flex-1">
                            <label className="block text-sm text-gray-600 mb-1">File</label>
                            <input
                                type="file"
                                onChange={handleFileChange}
                                className="block w-full text-xs text-gray-500 border border-gray-300 rounded-md file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-xs file:bg-gray-100 file:text-gray-700 hover:file:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/20"
                            />
                        </div>
                        <div className="flex items-center md:ml-4">
                            <label htmlFor="vote" className="text-sm text-gray-700 select-none mr-2">Vote</label>
                            <input
                                id="vote"
                                name="vote"
                                type="checkbox"
                                checked={formData.vote}
                                onChange={handleChange}
                                className="accent-primary h-4 w-4 rounded border-gray-300 focus:ring-primary/20"
                            />
                        </div>
                    </div>
                    {/* Nút gửi */}
                    <div className="flex justify-end gap-2">
                        <Button
                            color="default"
                            variant="light"
                            size="md"
                            onClick={handleClose}
                            disabled={loading}
                        >
                            Cancel
                        </Button>
                        <Button color="primary" type="submit" size="md" isLoading={loading} isDisabled={loading}>
                            Send to Operator
                        </Button>
                    </div>
                </form>
            </ModalContent>
        </Modal>
    );
}

CreateBookOpModal.propTypes = {
    trip: PropTypes.object,
    open: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
};