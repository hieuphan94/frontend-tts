export const mockGroupedData = [
  {
    id: 1,
    day: 'Day 1: Hanoi Arrival (1/7)',
    isGroup: true,
    services: [
      {
        id: 11,
        service: 'Service 1',
        quantity: 3,
        unitPrice: '800000',
        total: '2400000',
        cost: '2400000',
        payment: 'CK',
        status: 'CFM',
        notes: 'Transfer from airport'
      },
      {
        id: 12,
        service: 'Service 4',
        quantity: 2,
        unitPrice: '500000',
        total: '1000000',
        cost: '1000000',
        payment: 'TM',
        status: 'New',
        notes: 'Hotel check-in'
      }
    ],
    totalSale: 4800000,
    totalCost: 4800000,
  },
  {
    id: 2,
    day: 'Day 2: Hanoi Arrival (1/7)',
    isGroup: true,
    services: [
      {
        id: 21,
        service: 'Service 6',
        quantity: 1,
        unitPrice: '750000',
        total: '750000',
        cost: '750000',
        payment: 'CK',
        status: 'In process',
        notes: 'City tour'
      }
    ]
  }
];

export const paymentOptions = [
  { key: 'CK', label: 'CK' },
  { key: 'TM', label: 'TM' },
];

export const statusOptions = [
  { key: 'CFM', label: 'CFM' },
  { key: 'New', label: 'New' },
  { key: 'In process', label: 'In process' },
  { key: 'Cancel', label: 'Cancel' },
];