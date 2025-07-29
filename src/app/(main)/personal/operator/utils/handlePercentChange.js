export const handlePaymentPercentChange = (rowId, type, value) => {
    return (prev =>
        prev.map(row => {
            if (row.id === rowId) {
                let paymentPercent = { ...row.paymentPercent };
                paymentPercent[type] = Math.max(0, Math.min(100, Number(value)));
                if (row.payment === 'TM/CK') {
                    paymentPercent[type === 'CK' ? 'TM' : 'CK'] = 100 - paymentPercent[type];
                }
                return { ...row, paymentPercent };
            }
            return row;
        })
    );
}