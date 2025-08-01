import { formatVND } from "../utils/formatVND";

export const normalizedItinerary = (tripDays) => {
  
    if (!Array.isArray(tripDays)) {
      return [];
    }
  
    const result = tripDays.map(day => {
      // Gom tất cả service có price > 0 từ timeSlots
      const allServices = Object.entries(day.timeSlots || {}).flatMap(([time, services]) =>
        (services || [])
          .filter(service => typeof service.price === 'number' && service.price > 0)
          .map(service => ({
            id: service.uuid || service.id || Math.random().toString(36).slice(2),
            service: service.name,
            quantity: 1,
            unitPrice: formatVND(service.price), // Định dạng giá đơn vị
            total: formatVND(service.price), // Tổng giá (quantity = 1)
            cost: formatVND(service.price), // Chi phí (bằng giá đơn vị)
            payment: service.ckTM || '',
            status: service.serviceStatus || '',
          }))
      );
  
      const dayResult = {
        id: day.id,
        titleOfDay: day.titleOfDay,
        order: day.order || day.dayNumber || 1,
        services: allServices,
        // Tính toán priceTotal từ services (tổng giá các dịch vụ có phí)
        priceTotal: formatVND(day.priceTotal), // Định dạng priceTotal
        // Các trường khác từ day object
        dayNumber: day.dayNumber,
        date: day.date,
        description: day.description,
        finalLocation: day.finalLocation,
        kmData: day.kmData,
        meals: day.meals,
        guide: day.guide,
        paragraphDay: day.paragraphDay,
        isActive: day.isActive,
        createdAt: day.createdAt,
        updatedAt: day.updatedAt,
        createdBy: day.createdBy,
        updatedBy: day.updatedBy,
      };
  
      return dayResult;
    });
  
    return result;
  };