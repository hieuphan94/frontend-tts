export const colorStatusBooking = (status) => {
    switch (status) {
        case 'CFM':
            return 'bg-green-100 border-green-300 text-green-800'
        case 'New':
            return 'bg-blue-100 border-blue-300 text-blue-800'
        case 'In process':
            return 'bg-yellow-100 border-yellow-300 text-yellow-800'
        case 'Cancel':
            return 'bg-red-100 border-red-300 text-red-800'
        default:
            return 'bg-gray-100 border-gray-300 text-gray-800'
    }
}
