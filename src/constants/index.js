export const APP_ROUTES = {
  HOME: '/',
  PERSONAL: '/personal',
  OPERATOR: '/personal/operator',
};

export const API_ENDPOINTS = {

};

export const STATUS_CODES = {
  OK: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  SERVER_ERROR: 500,
};

export const APP_CONFIG = {
  DEFAULT_PAGE_SIZE: 10,
  MAX_FILE_SIZE: 5 * 1024 * 1024, // 5MB
  SUPPORTED_FILE_TYPES: ['image/jpeg', 'image/png', 'application/pdf'],
};

export const DEPARTMENTS = [
  { label: 'Operator', value: 'operator' },
];
