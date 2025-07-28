export const mockData = {
    "data": [
        {
            "id": "1",
            "settings": {
                "globalPax": 2,
                "numberOfDays": 3,
                "starRating": 4
            },
            "code": "TRIP-2024-001",
            "title": "Vietnam Discovery Tour",
            "startDate": "2025-08-01T08:00:00Z",
            "endDate": "2025-08-03T18:00:00Z",
            "version": 1,
            "status": {
                "current": "draft",
                "history": [
                    {
                        "status": "created",
                        "timestamp": "2025-07-20T10:00:00Z",
                        "userId": "user-001"
                    }
                ]
            },
            "internalInfo": {
                "createdBy": "admin-001",
                "createdAt": "2025-07-20T10:00:00Z"
            },
            "customerInfo": {
                "name": "Alice Smith",
                "nationality": "British",
                "language": "English",
                "specialRequests": "Wheelchair access"
            },
            "groupInfo": {
                "guests": [
                    {
                        "name": "Bob Smith",
                        "age": 45,
                        "passport": "B1234567"
                    }
                ]
            },
            "scheduleTransport": {
                "vehicles": [
                    {
                        "type": "Bus",
                        "capacity": 40,
                        "price": 150
                    }
                ],
                "totalDistance": 300,
                "totalTransportPrice": 150,
                "transportNote": "Hotel pickup"
            },
            "scheduleItems": {
                "day1": {
                    "activities": [
                        {
                            "time": "09:00",
                            "description": "Hanoi Old Quarter walk"
                        }
                    ]
                }
            },
            "scheduleImages": [
                "https://example.com/vietnam1.jpg"
            ],
            "totalPrice": 900,
            "additionalPrice": [],
            "finalPrice": 900,
            "scheduleNotes": [],
            "isActive": true,
            "createdAt": "2025-07-20T10:00:00Z",
            "updatedAt": "2025-07-21T10:00:00Z"
        },
        {
            "id": "2",
            "settings": {
                "globalPax": 1,
                "numberOfDays": 2,
                "starRating": 3
            },
            "code": "TRIP-2024-002",
            "title": "Ho Chi Minh City Tour",
            "startDate": "2025-08-10T08:00:00Z",
            "endDate": "2025-08-11T17:00:00Z",
            "version": 1,
            "status": {
                "current": "active",
                "history": [
                    {
                        "status": "approved",
                        "timestamp": "2025-07-25T12:00:00Z",
                        "userId": "admin-02"
                    }
                ]
            },
            "internalInfo": {
                "createdBy": "admin-02",
                "createdAt": "2025-07-24T09:00:00Z"
            },
            "customerInfo": {
                "name": "Carlos Garcia",
                "nationality": "Spanish",
                "language": "Spanish",
                "specialRequests": ""
            },
            "groupInfo": {
                "guests": [
                    {
                        "name": "Carlos Garcia",
                        "age": 35,
                        "passport": "ES987654"
                    }
                ]
            },
            "scheduleTransport": {
                "vehicles": [
                    {
                        "type": "Car",
                        "capacity": 4,
                        "price": 80
                    }
                ],
                "totalDistance": 100,
                "totalTransportPrice": 80,
                "transportNote": ""
            },
            "scheduleItems": {
                "day1": {
                    "activities": [
                        {
                            "time": "08:00",
                            "description": "Independence Palace visit"
                        }
                    ]
                }
            },
            "scheduleImages": [
                "https://example.com/saigon.jpg"
            ],
            "totalPrice": 300,
            "additionalPrice": [],
            "finalPrice": 300,
            "scheduleNotes": [],
            "isActive": true,
            "createdAt": "2025-07-24T09:00:00Z",
            "updatedAt": "2025-07-25T12:00:00Z"
        }
    ],
    "pagination": {
        "page": 1,
        "limit": 10,
        "total": 5,
        "totalPages": 1
    }
}
