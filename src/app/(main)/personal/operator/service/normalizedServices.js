import { formatVND } from "../utils/formatVND";

export const normalizedServices = (tripDays) => {
    if (!tripDays || !Array.isArray(tripDays)) {
        return [];
    }

    const serviceCategories = {
        food: { title: 'Food ' },
        visit: { title: 'Visits' },
        accommodation: { title: 'Accommodation' },
        guide: { title: 'Guide Service' },
        transport: { title: 'Transportation' },
        other: { title: 'Other' }
    };

    const allServices = [];

    tripDays.forEach((day, dayIndex) => {
        // Process time slots
        if (day.timeSlots) {
            Object.entries(day.timeSlots).forEach(([time, services]) => {
                services.forEach(service => {
                    // Only include services with price > 0
                    if (service.price && service.price > 0) {
                        let category = service.type || 'other';
                        let serviceName = service.name || 'Unknown Service';
                        let unitPrice = service.price;
                        let quantity = 1;

                        // Process service details based on type
                        if (service.type === 'accommodation') {
                            if (service.rooms && service.rooms.price) {
                                unitPrice = service.rooms.price.now?.fit_price || service.price;
                            }
                        } else if (service.type === 'food') {
                            if (service.meal) {
                                const mealTypes = {
                                    breakfast: 'Breakfast',
                                    lunch: 'Lunch',
                                    dinner: 'Dinner'
                                };
                                serviceName = `${mealTypes[service.meal.mealType] || 'Meal'} - ${service.name}`;
                            }
                        } else if (service.type === 'visit') {
                            if (service.guidePlus && service.guidePlus > 0) {
                                unitPrice = service.guidePlus;
                            }
                        }

                        const total = unitPrice * quantity;

                        allServices.push({
                            id: service.uuid || service.id || `${dayIndex}-${time}-${Math.random()}`,
                            service: serviceName,
                            quantity: quantity,
                            unitPrice: formatVND(unitPrice),
                            total: formatVND(total),
                            cost: total,
                            payment: service.ckTM || 'CK',
                            status: 'New',
                            notes: service.sentence || service.note || '',
                            category: category,
                            time: time,
                            location: service.location || day.finalLocation || '',
                            dayTitle: day.titleOfDay,
                            dayIndex: dayIndex
                        });
                    }
                });
            });
        }

        // Process guide services if included and has price
        if (day.guide && day.guide.price > 0) {
            const guideTotal = day.guide.price;

            allServices.push({
                id: `guide-${dayIndex}`,
                service: 'Guide Service',
                quantity: 1,
                unitPrice: formatVND(day.guide.price),
                total: formatVND(guideTotal),
                cost: guideTotal,
                payment: 'CK',
                status: 'New',
                notes: `Guide for ${day.titleOfDay}`,
                category: 'guide',
                time: 'Full Day',
                location: day.finalLocation || '',
                dayTitle: day.titleOfDay,
                dayIndex: dayIndex
            });
        }

        // Process driver allowance if has price
        if (day.driverAllowance && day.driverAllowance.price > 0) {
            const driverTotal = day.driverAllowance.price;

            allServices.push({
                id: `driver-${dayIndex}`,
                service: 'Driver Allowance',
                quantity: 1,
                unitPrice: formatVND(day.driverAllowance.price),
                total: formatVND(driverTotal),
                cost: driverTotal,
                payment: 'CK',
                status: 'New',
                notes: `Driver allowance for ${day.titleOfDay}`,
                category: 'transport',
                time: 'Full Day',
                location: day.finalLocation || '',
                dayTitle: day.titleOfDay,
                dayIndex: dayIndex
            });
        }

        // Process meals from day.meals if they have prices and not already processed
        if (day.meals) {
            Object.entries(day.meals).forEach(([mealType, mealData]) => {
                if (mealData.price && mealData.price > 0) {
                    const mealTypes = {
                        breakfast: 'Breakfast',
                        lunch: 'Lunch',
                        dinner: 'Dinner'
                    };

                    allServices.push({
                        id: `meal-${dayIndex}-${mealType}`,
                        service: `${mealTypes[mealType] || mealType} - ${mealData.type || 'Meal'}`,
                        quantity: 1,
                        unitPrice: formatVND(mealData.price),
                        total: formatVND(mealData.price),
                        cost: mealData.price,
                        payment: 'CK',
                        status: 'New',
                        notes: `${mealTypes[mealType] || mealType} for ${day.titleOfDay}`,
                        category: 'food',
                        time: 'Full Day',
                        location: day.finalLocation || '',
                        dayTitle: day.titleOfDay,
                        dayIndex: dayIndex
                    });
                }
            });
        }
    });

    // Group services by category only (not by day)
    const categoryGroups = {};
    allServices.forEach(service => {
        if (!categoryGroups[service.category]) {
            categoryGroups[service.category] = [];
        }
        categoryGroups[service.category].push(service);
    });

    const groupedServices = [];

    // Create group entries for each category
    Object.entries(categoryGroups).forEach(([category, services]) => {
        const categoryInfo = serviceCategories[category] || serviceCategories.other;
        const groupTotalSale = services.reduce((sum, service) => sum + service.cost, 0);

        groupedServices.push({
            id: category,
            service: categoryInfo.title,
            services: services,
            totalSale: formatVND(groupTotalSale),
            category: category,
        });
    });

    return groupedServices;
};