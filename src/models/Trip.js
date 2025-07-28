import { TripDay } from '@/models/TripDay';
import { v4 as uuidv4 } from 'uuid';

export class Trip {
  constructor(data = {}) {
    this.id = data.id || uuidv4();
    this.title = data.title || 'Untitled Trip';
    this.code = data.code || '';
    this.totalPrice = data.totalPrice || 0;
    this.groupInfo = data.groupInfo || {};
    this.settings = {
      globalPax: Number(data.settings?.globalPax) || 1,
      numberOfDays: Number(data.settings?.numberOfDays) || 1,
      starRating: Number(data.settings?.starRating) || 4,
      markup: Number(data.settings?.markup) || 0,
      exchangeRate: data.settings?.exchangeRate || EXCHANGE_RATE.VND_TO_USD,
    };
    this.days = [];
    this.scheduleNotes = [];
    this.customerInfo = data.customerInfo || {};
    this.additionalPrice = data.additionalPrice || [];
    this.status = data.status || {
      current: 'draft',
      history: []
    };
  }

  // Phương thức tạo terms and conditions
  createTermsAndConditions(savedContent = {}) {
    return {
      type: 'termsAndConditions',
      content: {
        priceIncludes: savedContent.priceIncludes || '',
        priceExcludes: savedContent.priceExcludes || '',
        saleConditions: savedContent.saleConditions || '',
        cancellationPolicy: savedContent.cancellationPolicy || '',
        goodToKnow: savedContent.goodToKnow || ''
      }
    };
  }

  fromScheduleData(currentSchedule, savedContent = {}) {
    if (!this.id) {
      this.id = `trip_${Date.now()}`;
    }

    const sortedEntries = Object.entries(currentSchedule).sort((a, b) => {
      return (a[1].order || 0) - (b[1].order || 0);
    });

    // Map lại với order mới từ 1 đến length
    this.days = sortedEntries.map(([dayId, dayData], index) => {
      return new TripDay({
        ...dayData,
        id: dayId,
        order: index + 1,
        tripId: this.id
      });
    });

    this.scheduleNotes = [this.createTermsAndConditions(savedContent)];
    return this;
  }

  fromDatabaseData(data) {
    this.id = data.id;
    this.title = data.title;
    this.settings = {
      globalPax: Number(data.settings?.globalPax) || 1,
      numberOfDays: Number(data.settings?.numberOfDays) || this.days.length,
      starRating: Number(data.settings?.starRating) || 4
    };

    this.days = data.tripDays?.map(day => {
      const tripDay = TripDay.fromDatabaseData(day);
      tripDay.tripId = this.id;
      return tripDay;
    }) || [];

    this.customerInfo = data.customerInfo;
    this.groupInfo = data.groupInfo;
    this.status = data.status;
    this.additionalPrice = data.additionalPrice;
    return this;
  }

  // Phương thức chuyển đổi sang database format
  toDatabaseFormat() {
    return {
      id: this.id,
      title: this.title,
      code: this.code,
      settings: this.settings,
      groupInfo: this.groupInfo,
      days: this.days.map(day => day.toDatabaseFormat()),
      scheduleNotes: this.scheduleNotes,
      customerInfo: this.customerInfo,
      totalPrice: this.totalPrice,
      status: this.status,
      additionalPrice: this.additionalPrice
    };
  }

  // Phương thức cập nhật images cho một ngày
  updateDayImages(dayId, newImages) {
    const day = this.days.find(d => d.order === dayId);
    if (day) {
      day.updateImages(newImages);
    }
    return this;
  }
} 