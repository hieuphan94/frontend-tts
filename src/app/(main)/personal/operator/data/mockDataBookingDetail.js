  export const mockDataItineraryTable = [
    {
      id: 1,
      day: "Day 1: Hanoi Arrival (1/7)",
      service: "Service 1, Service 2, Service 3",
      quantity: 3,
      unitPrice: 800,
      total: 2400,
      cost: 2400,
      payment: "CK",
      status: "In process"
    },
    {
      id: 2,
      day: "Day 2: Hanoi Arrival (1/7)",
      service: "Service 1, Service 2, Service 3",
      quantity: 1,
      unitPrice: 750,
      total: 750,
      cost: 750,
      payment: "CK",
      status: "In process"
    },
    {
      id: 3,
      day: "Day 3: Hanoi Arrival (1/7)",
      service: "Service 1, Service 2, Service 3",
      quantity: 7,
      unitPrice: 100,
      total: 700,
      cost: 700,
      payment: "TM",
      status: "New"
    },
    {
      id: 4,
      day: "Day 4: Hanoi Arrival (1/7)",
      service: "Service 1, Service 2, Service 3, Service 4, Service 5, Service 6",
      quantity: 1,
      unitPrice: "-",
      total: "-",
      cost: "-",
      payment: "-",
      status: "CFM"
    },
    {
      id: 5,
      day: "Day 5: Hanoi - Ninh Binh (2/7)",
      service: "Service 4, Service 5, Service 6",
      quantity: 1,
      unitPrice: 500,
      total: 500,
      cost: 500,
      payment: "CK",
      status: "Confirmed"
    },
    {
      id: 6,
      day: "Day 6: Hanoi - Ninh Binh (2/7)",
      service: "Service 7, Service 8, Service 9",
      quantity: 2,
      unitPrice: 650,
      total: 1300,
      cost: 1300,
      payment: "CK",
      status: "In process"
    }
  ];

export const paymentOptions = [
  { key: 'CK', label: 'CK' },
  { key: 'TM', label: 'TM' },
];

// Status options
export const statusOptions = [
  { key: 'CFM', label: 'CFM' },
  { key: 'New', label: 'New' },
  { key: 'In process', label: 'In process' },
  { key: 'Pending', label: 'Pending' },
  { key: 'Cancelled', label: 'Cancelled' },
];

// Mock data for services table
export const mockServicesData = [
  {
    id: 1,
    group: 'Hotel',
    quantity: 4,
    unitPrice: 800,
    total: 3200,
    cost: 3200,
    payment: 'CK',
    status: 'CFM',
    book: true,
    notes: 'Deluxe rooms confirmed',
    paymentPercent: { CK: 100, TM: 0 },
  },
  {
    id: 2,
    group: 'Food',
    quantity: 8,
    unitPrice: 150,
    total: 1200,
    cost: 1200,
    payment: 'TM/CK',
    status: 'In process',
    book: false,
    notes: 'Mixed payment methods',
    paymentPercent: { CK: 60, TM: 40 },
  },
  {
    id: 3,
    group: 'Guile',
    quantity: 24,
    unitPrice: 200,
    total: 4800,
    cost: 4800,
    payment: 'TM',
    status: 'New',
    book: false,
    notes: 'Daily meal packages',
    paymentPercent: { CK: 0, TM: 100 },
  },
  {
    id: 4,
    group: 'Entertainment',
    quantity: 3,
    unitPrice: 500,
    total: 1500,
    cost: 1500,
    payment: 'CK',
    status: 'CFM',
    book: true,
    notes: 'VIP transport service',
    paymentPercent: { CK: 100, TM: 0 },
  }
];