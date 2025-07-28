import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  trips: [],
  filteredTrips: [],
  currentTrip: null,
  loading: false,
  loadingTripIds: {
    edit: [],
    delete: [],
    publish: [],
    restore: [],
  },
  error: null,
  pagination: {
    total: 0,
    page: 1,
    totalPages: 0,
    hasNextPage: false,
    hasPrevPage: false,
    limit: 5
  },
  cache: {}
};

const tripSlice = createSlice({
  name: 'trips',
  initialState,
  reducers: {
    // Fetch trips
    fetchTripsStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchTripsSuccess: (state, action) => {
      state.loading = false;
      state.trips = action.payload.trips;
      state.filteredTrips = action.payload.trips;
      if (action.payload.pagination) {
        state.pagination = action.payload.pagination;
      }
    },
    fetchTripsFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.trips = [];
      state.filteredTrips = [];
    },

    // Get single trip
    getTripStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    getTripSuccess: (state, action) => {
      state.loading = false;
      state.currentTrip = action.payload;
    },
    getTripFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    // Create trip
    createTripStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    createTripSuccess: (state, action) => {
      state.loading = false;
      state.trips.unshift(action.payload);
      state.filteredTrips.unshift(action.payload);
      state.cache = { timestamp: null, params: null, data: null };
    },
    createTripFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    // Update trip
    updateTripStart: (state, action) => {
      state.loadingTripIds.edit.push(action.payload);
    },
    updateTripSuccess: (state, action) => {
      const updatedTrip = action.payload;
      state.loadingTripIds.edit = state.loadingTripIds.edit.filter((id) => id !== updatedTrip.id);
      state.trips = state.trips.map((trip) => (trip.id === updatedTrip.id ? updatedTrip : trip));
      state.filteredTrips = state.filteredTrips.map((trip) =>
        trip.id === updatedTrip.id ? updatedTrip : trip
      );
      if (state.currentTrip?.id === updatedTrip.id) {
        state.currentTrip = updatedTrip;
      }
      state.cache = { timestamp: null, params: null, data: null };
    },
    updateTripFailure: (state, action) => {
      const { tripId, error } = action.payload;
      state.loadingTripIds.edit = state.loadingTripIds.edit.filter((id) => id !== tripId);
      state.error = error;
    },

    // Delete trip
    deleteTripStart: (state, action) => {
      state.loadingTripIds.delete.push(action.payload);
    },
    deleteTripSuccess: (state, action) => {
      const tripId = action.payload;
      state.loadingTripIds.delete = state.loadingTripIds.delete.filter((id) => id !== tripId);
      state.trips = state.trips.filter((trip) => trip.id !== tripId);
      state.filteredTrips = state.filteredTrips.filter((trip) => trip.id !== tripId);
      state.cache = { timestamp: null, params: null, data: null };
    },
    deleteTripFailure: (state, action) => {
      const { tripId, error } = action.payload;
      state.loadingTripIds.delete = state.loadingTripIds.delete.filter((id) => id !== tripId);
      state.error = error;
    },

    // Restore trip
    restoreTripStart: (state, action) => {
      state.loadingTripIds.restore.push(action.payload);
    },
    restoreTripSuccess: (state, action) => {
      state.loadingTripIds.restore = state.loadingTripIds.restore.filter((id) => id !== action.payload);
    },
    restoreTripFailure: (state, action) => {
      const { tripId, error } = action.payload;
      state.loadingTripIds.restore = state.loadingTripIds.restore.filter((id) => id !== tripId);
      state.error = error;
    },

    // Delete all trips
    deleteAllTripsStart: (state) => {
      state.loading = true;
      state.error = null;
      state.currentTrip = null;
    },
    deleteAllTripsSuccess: (state) => {
      state.loading = false;
      state.trips = [];
      state.filteredTrips = [];
      state.loadingTripIds = {
        edit: [],
        delete: [],
        publish: [],
      };
    },
    deleteAllTripsFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.loadingTripIds = {
        edit: [],
        delete: [],
        publish: [],
      };
    },
    // Cache
    updateCache: (state, action) => {
      // action.payload: { key, value }
      state.cache[action.payload.key] = action.payload.value;
    },
    clearCache: (state, action) => {
      // action.payload: key cần xóa
      if (action.payload && state.cache[action.payload]) {
        delete state.cache[action.payload];
      } else if (!action.payload) {
        state.cache = {};
      }
      state.trips = [];
      state.filteredTrips = [];
    },
    // Hard delete trip
    hardDeleteTripStart: (state, action) => {
      state.loadingTripIds.delete.push(action.payload);
    },
    hardDeleteTripSuccess: (state, action) => {
      const tripId = action.payload;
      state.loadingTripIds.delete = state.loadingTripIds.delete.filter((id) => id !== tripId);
      state.trips = state.trips.filter((trip) => trip.id !== tripId);
      state.filteredTrips = state.filteredTrips.filter((trip) => trip.id !== tripId);
      state.cache = { timestamp: null, params: null, data: null };
    },
    hardDeleteTripFailure: (state, action) => {
      const { tripId, error } = action.payload;
      state.loadingTripIds.delete = state.loadingTripIds.delete.filter((id) => id !== tripId);
      state.error = error;
    },
  },
});

export const {
  // Fetch trips
  fetchTripsStart,
  fetchTripsSuccess,
  fetchTripsFailure,
  // Get single trip
  getTripStart,
  getTripSuccess,
  getTripFailure,
  // Create trip
  createTripStart,
  createTripSuccess,
  createTripFailure,
  // Update trip
  updateTripStart,
  updateTripSuccess,
  updateTripFailure,
  // Delete trip
  deleteTripStart,
  deleteTripSuccess,
  deleteTripFailure,
  // Restore trip
  restoreTripStart,
  restoreTripSuccess,
  restoreTripFailure,
  // Delete all trips
  deleteAllTripsStart,
  deleteAllTripsSuccess,
  deleteAllTripsFailure,
  // Cache
  updateCache,
  clearCache,
  // Hard delete trip
  hardDeleteTripStart,
  hardDeleteTripSuccess,
  hardDeleteTripFailure,
} = tripSlice.actions;

export default tripSlice.reducer;
