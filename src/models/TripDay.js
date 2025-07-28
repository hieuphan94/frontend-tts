export class TripDay {
  constructor(data = {}) {
    this.id = data.id || null;
    this.tripId = data.tripId || null;
    this.order = data.order || 0;
    this.titleOfDay = data.titleOfDay || `Day ${this.order}`;
    this.distance = data.distance || 0;
    this.timeSlots = this.formatTimeSlots(data);
    this.guide = data.guide || { included: true, price: 0, lang: data.guide.lang, allowances: { eat: 0, mountain: 0, nightForGuide: 0, dinnerGroup1to7: 0 } };
    this.driverAllowance = data.driverAllowance || { price: 0 };
    this.kmData = data.kmData || 0;
    this.priceTotal = data.priceTotal || 0;
    this.finalLocation = data.finalLocation || '';
    this.meals = this.formatMeals(data.meals);
    this.paragraphDay = {
      paragraphFromLocation: data.paragraphDay?.paragraphFromLocation || '',
      paragraphTotal: data.paragraphDay?.paragraphTotal || ''
    };
    this.images = data.images || [];
    this._locations = null; // Cache for locations
  }

  // Phương thức format timeSlots
  formatTimeSlots(dayData) {
    const timeSlots = {};
    Object.entries(dayData).forEach(([key, value]) => {
      if (key.match(/^\d{2}:\d{2}$/)) {
        timeSlots[key] = value;
      }
    });
    return timeSlots;
  }

  // Phương thức format meals
  formatMeals(meals = {}) {
    return {
      breakfast: { included: false, type: '', price: 0, ...meals.breakfast },
      lunch: { included: false, type: '', price: 0, ...meals.lunch },
      dinner: { included: false, type: '', price: 0, ...meals.dinner }
    };
  }

  // Phương thức cập nhật images
  updateImages(newImages) {
    if (!Array.isArray(newImages)) {
      console.warn('Invalid images data:', newImages);
      return this;
    }
    this.images = newImages;
    return this;
  }

  // Phương thức lấy locations từ timeSlots với cache
  getLocations() {
    if (this._locations) return this._locations;

    const locations = new Set();
    Object.values(this.timeSlots).forEach(services => {
      services.forEach(service => {
        if (service.location) {
          locations.add(service.location);
        }
      });
    });
    
    this._locations = Array.from(locations);
    return this._locations;
  }

  // Phương thức clear cache khi timeSlots thay đổi
  clearLocationsCache() {
    this._locations = null;
  }

  // Phương thức chuyển đổi sang database format
  toDatabaseFormat() {
    return {
      id: this.id,
      tripId: this.tripId,
      order: this.order,
      titleOfDay: this.titleOfDay,
      distance: this.distance,
      timeSlots: this.timeSlots,
      guide: this.guide,
      meals: this.meals,
      paragraphDay: this.paragraphDay,
      images: this.images,
      finalLocation: this.finalLocation,
      driverAllowance: this.driverAllowance,
      kmData: this.kmData,
      priceTotal: this.priceTotal,
    };
  }

  // Phương thức tạo từ database data
  static fromDatabaseData(data) {
    return new TripDay(data);
  }

  // Phương thức clone object
  clone() {
    return new TripDay(this.toDatabaseFormat());
  }
} 