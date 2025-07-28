const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export const URLS = {

  // Trip URLs (for operator)
  TRIPS: {
    LIST: `${BASE_URL}/trips`,
    DETAIL: (id) => `${BASE_URL}/trips/${id}`,
    GET_TRIP: (id) => `${BASE_URL}/trips/${id}`,
  },
};

export default URLS;
