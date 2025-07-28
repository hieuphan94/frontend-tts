import { useState } from 'react';
import { Button } from '@nextui-org/react';

export default function FormSaleBook() {
    const [code, setCode] = useState('');
    const [sgl, setSgl] = useState('');
    const [dbl, setDbl] = useState('');
    const [twn, setTwn] = useState('');
    const [tpl, setTpl] = useState('');
    const [note, setNote] = useState('');
    const [paid, setPaid] = useState(false);
    const [priority, setPriority] = useState(false);
    const [vote, setVote] = useState(false);
    const [file, setFile] = useState(null);

    // Giả lập số người lớn/trẻ em
    const numAdults = 2;
    const numChildren = 1;

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Xử lý gửi dữ liệu
        alert('Đã gửi sale booking!');
    };

    return (
        <form onSubmit={handleSubmit} className="w-full  mx-auto p-4 bg-white rounded-lg shadow space-y-6 border border-gray-200">
            {/* Hàng 1 */}
            <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1 md:flex-[2]">
                    <label className="block text-sm text-gray-600 mb-1">Code</label>
                    <input
                        type="text"
                        value={code}
                        onChange={e => setCode(e.target.value)}
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
                    <input type="number" value={sgl} onChange={e => setSgl(e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary/20 text-sm" />
                </div>
                <div>
                    <label className="block text-sm text-gray-600 mb-1">DBL</label>
                    <input type="number" value={dbl} onChange={e => setDbl(e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary/20 text-sm" />
                </div>
                <div>
                    <label className="block text-sm text-gray-600 mb-1">TWN</label>
                    <input type="number" value={twn} onChange={e => setTwn(e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary/20 text-sm" />
                </div>
                <div>
                    <label className="block text-sm text-gray-600 mb-1">TPL</label>
                    <input type="number" value={tpl} onChange={e => setTpl(e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary/20 text-sm" />
                </div>
            </div>
            {/* Hàng 3 */}
            <div className="flex flex-col md:flex-row gap-4 items-center">
                <div className="flex items-center md:w-32 w-full">
                    <label htmlFor="paid" className="text-sm text-gray-700 select-none mr-2">Đã trả tiền</label>
                    <input
                        id="paid"
                        type="checkbox"
                        checked={paid}
                        onChange={e => setPaid(e.target.checked)}
                        className="accent-primary h-4 w-4 rounded border-gray-300 focus:ring-primary/20"
                    />
                </div>
                <div className="flex-1 w-full">
                    <label className="block text-sm text-gray-600 mb-1">Ghi chú</label>
                    <textarea
                        value={note}
                        onChange={e => setNote(e.target.value)}
                        placeholder="Nhập ghi chú..."
                        rows={2}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary/20 text-sm resize-none"
                    />
                </div>
                <div className="flex items-center md:w-32 w-full">
                    <label htmlFor="priority" className="text-sm text-gray-700 select-none mr-2">Ưu tiên</label>
                    <input
                        id="priority"
                        type="checkbox"
                        checked={priority}
                        onChange={e => setPriority(e.target.checked)}
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
                        type="checkbox"
                        checked={vote}
                        onChange={e => setVote(e.target.checked)}
                        className="accent-primary h-4 w-4 rounded border-gray-300 focus:ring-primary/20"
                    />
                </div>
            </div>
            {/* Nút gửi */}
            <div className="flex justify-end">
                <Button color="primary" type="submit" size="md">
                    Send to Operator
                </Button>
            </div>
        </form>
    );
}
