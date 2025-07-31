import { tripsApi } from '@/api/trip/trip';
import {
  createTripFailure,
  createTripStart,
  createTripSuccess,
  deleteAllTripsFailure,
  deleteAllTripsStart,
  deleteAllTripsSuccess,
  deleteTripFailure,
  deleteTripStart,
  deleteTripSuccess,
  restoreTripFailure,
  restoreTripStart,
  restoreTripSuccess,
  fetchTripsFailure,
  fetchTripsStart,
  fetchTripsSuccess,
  getTripFailure,
  getTripStart,
  getTripSuccess,
  updateTripFailure,
  updateTripStart,
  updateTripSuccess,
  clearCache,
  updateCache,
  hardDeleteTripStart,
  hardDeleteTripSuccess,
  hardDeleteTripFailure,
} from '@/store/slices/tripSlice';
import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useUI } from './useUI';

export const useTrips = () => {
  const dispatch = useDispatch();
  const { notifyError, notifySuccess, notifyInfo } = useUI();
  const {
    trips, filteredTrips, currentTrip, loading,
    loadingTripIds, error, pagination, cache } = useSelector(
      (state) => state.trips
    );

  const getCacheKey = (params) => JSON.stringify(params);

  // Fetch all trips
  const fetchTrips = useCallback(
    async (params = {}, role) => {
      if (loading) return [];

      const now = Date.now();
      const CACHE_DURATION = 5 * 60 * 1000; // 5 phút
      const key = getCacheKey(params);

      const cacheEntry = cache[key];
      if (
        cacheEntry &&
        cacheEntry.data &&
        cacheEntry.timestamp &&
        now - cacheEntry.timestamp < CACHE_DURATION
      ) {
        dispatch(fetchTripsSuccess(cacheEntry.data));
        return cacheEntry.data;
      }

      dispatch(fetchTripsStart());
      try {
        // Thêm includeInactive vào params nếu user là admin
        const queryParams = {
          ...params,
          includeInactive: role === 'admin' ? 'true' : 'false'
        };

        // const response = await tripsApi.getAllTrips(queryParams);
        const response = await tripsApi.getAllTripsTest(queryParams);
        const data = response.data;

        dispatch(updateCache({
          key,
          value: {
            timestamp: now,
            params: queryParams,
            data
          }
        }));

        dispatch(fetchTripsSuccess(data));
        notifyInfo('Đang hiển thị dữ liệu từ cache');
        return data;
      } catch (error) {
        dispatch(fetchTripsFailure(error.message));
        notifyError('Không thể tải danh sách trips');
        return [];
      }
    },
    [dispatch, notifyError, loading, cache]
  );

  // Clear trips cache cho 1 key
  const clearTripsCache = useCallback((params) => {
    const key = getCacheKey(params);
    dispatch(clearCache(key));
  }, [dispatch]);

  // Get single trip
  const getTrip = useCallback(
    async (id) => {
      dispatch(getTripStart());
      try {
        // const response = await tripsApi.getTripById(id);
        const response = await tripsApi.getTripByIdTest(id);
        dispatch(getTripSuccess(response.data));
        return response.data;
      } catch (error) {
        dispatch(getTripFailure(error.message));
        notifyError('Không thể tải thông tin trip');
        throw error;
      }
    },
    [dispatch, notifyError]
  );

  // Create new trip
  const createTrip = useCallback(
    async (tripData) => {
      dispatch(createTripStart());
      try {
        const response = await tripsApi.createTrip(tripData);
        dispatch(createTripSuccess(response.data));
        notifySuccess('Tạo/Cập nhật Trip thành công!');
        return response.data;
      } catch (error) {
        dispatch(createTripFailure(error.message));
        notifyError('Tạo/Cập nhật Trip thất bại!');
        throw error;
      }
    },
    [dispatch, notifySuccess, notifyError]
  );

  // Update trip
  const updateTrip = useCallback(
    async (id, tripData) => {
      dispatch(updateTripStart(id));
      try {
        const response = await tripsApi.updateTrip(id, tripData);
        dispatch(updateTripSuccess(response.data));
        notifySuccess('Cập nhật trip thành công');
        return response.data;
      } catch (error) {
        dispatch(updateTripFailure({ tripId: id, error: error.message }));
        notifyError('Không thể cập nhật trip');
        throw error;
      }
    },
    [dispatch, notifySuccess, notifyError]
  );

  // Delete trip
  const deleteTrip = useCallback(
    async (id) => {
      dispatch(deleteTripStart(id));
      try {
        await tripsApi.deleteTrip(id);
        dispatch(deleteTripSuccess(id));
        notifySuccess('Xóa trip thành công');
      } catch (error) {
        dispatch(deleteTripFailure({ tripId: id, error: error.message }));
        notifyError('Không thể xóa trip');
        throw error;
      }
    },
    [dispatch, notifySuccess, notifyError]
  );

  // Restore trip
  const restoreTrip = useCallback(
    async (id) => {
      dispatch(restoreTripStart(id));
      try {
        await tripsApi.restoreTrip(id);
        dispatch(restoreTripSuccess(id));
        notifySuccess('Khôi phục trip thành công');
      } catch (error) {
        dispatch(restoreTripFailure({ tripId: id, error: error.message }));
        notifyError('Không thể khôi phục trip');
        throw error;
      }
    },
    [dispatch, notifySuccess, notifyError]
  );

  // Delete all trips
  const deleteAllTrips = useCallback(async () => {
    dispatch(deleteAllTripsStart());
    try {
      await tripsApi.deleteAllTrips();
      dispatch(deleteAllTripsSuccess());
      notifySuccess('Xóa tất cả trips thành công');
    } catch (error) {
      dispatch(deleteAllTripsFailure(error.message));
      notifyError('Không thể xóa tất cả trips');
      throw error;
    }
  }, [dispatch, notifySuccess, notifyError]);

  // Hard delete trip
  const hardDeleteTrip = useCallback(
    async (id) => {
      dispatch(hardDeleteTripStart(id));
      try {
        await tripsApi.hardDeleteTrip(id);
        dispatch(hardDeleteTripSuccess(id));
        notifySuccess('Xóa vĩnh viễn trip thành công');
      } catch (error) {
        dispatch(hardDeleteTripFailure({ tripId: id, error: error.message }));
        notifyError('Không thể xóa vĩnh viễn trip');
        throw error;
      }
    },
    [dispatch, notifySuccess, notifyError]
  );

  // Gửi trip lên sample (user)
  const sendToSample = useCallback(
    async (id) => {
      try {
        const res = await tripsApi.sendToSample(id);
        notifySuccess('Gửi trip lên admin thành công');
        return res;
      } catch (error) {
        notifyError('Không thể gửi trip lên admin');
        throw error;
      }
    },
    [notifySuccess, notifyError]
  );

  // Admin duyệt trip
  const approveSample = useCallback(
    async (id, { message, score }) => {
      try {
        const res = await tripsApi.approveSample(id, { message, score });
        notifySuccess('Duyệt trip thành công');
        return res;
      } catch (error) {
        notifyError('Không thể duyệt trip');
        throw error;
      }
    },
    [notifySuccess, notifyError]
  );

  // Admin từ chối trip
  const denySample = useCallback(
    async (id, { message, score }) => {
      try {
        const res = await tripsApi.denySample(id, { message, score });
        notifySuccess('Từ chối trip thành công');
        return res;
      } catch (error) {
        notifyError('Không thể từ chối trip');
        throw error;
      }
    },
    [notifySuccess, notifyError]
  );

  // Force refresh trips: clear cache và fetch lại
  const forceRefreshTrips = useCallback(async (params, role) => {
    await clearTripsCache(params);
    await fetchTrips(params, role);
  }, [clearTripsCache, fetchTrips]);

  return {
    trips,
    filteredTrips,
    currentTrip,
    loading,
    loadingTripIds,
    error,
    pagination,
    fetchTrips,
    getTrip,
    createTrip,
    updateTrip,
    deleteTrip,
    restoreTrip,
    deleteAllTrips,
    // Cache
    clearTripsCache,
    hardDeleteTrip,
    // Approval workflow
    sendToSample,
    approveSample,
    denySample,
    forceRefreshTrips,
  };
};
