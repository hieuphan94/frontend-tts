export const normalizedServices = (tripDays) => {
    if (!Array.isArray(tripDays)) return [];
    return tripDays.map(day => {
        // Gom tất cả service của các timeSlot lại thành 1 mảng, chỉ lấy service có price > 0
        const allServices = Object.entries(day.timeSlots || {}).flatMap(([time, services]) =>
            (services || [])
                .filter(service => typeof service.price === 'number' && service.price > 0)
                .map(service => ({
                    id: service.uuid || service.id || Math.random().toString(36).slice(2),
                    service: service.name,
                    quantity: 1,
                    unitPrice: service.price,
                    total: service.price,
                    cost: service.price,
                    payment: service.ckTM || '',
                    status: service.serviceStatus || '',
                }))
        );
        return {
            id: day.id,
            titleOfDay: day.titleOfDay,
            services: allServices,
        };
    });
};