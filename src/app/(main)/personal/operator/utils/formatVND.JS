export const formatVND = (amount) => {
    // Chuyển đổi input thành số, loại bỏ phần thập phân không cần thiết
    const number = parseFloat(amount);

    // Kiểm tra nếu input không hợp lệ
    if (isNaN(number)) {
        return "Số tiền không hợp lệ";
    }

    // Định dạng số với dấu chấm phân cách hàng nghìn
    const formattedNumber = number.toLocaleString('vi-VN', {
        style: 'currency',
        currency: 'VND',
        minimumFractionDigits: 0, // Không hiển thị phần thập phân nếu là số nguyên
        maximumFractionDigits: 2  // Hiển thị tối đa 2 chữ số thập phân nếu có
    });

    return formattedNumber;
}
