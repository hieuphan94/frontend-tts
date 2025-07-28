// 1. Routes công khai
export const PUBLIC_ROUTES = [
  '/login',
  '/forgot-password',
];

// 2. Routes trong hệ thống
export const ROUTES = {
  // Operator routes
  personal: '/personal/operator',
};

// 3. Role đơn giản
export const ROLES = {
  OPERATOR: 'operator',
};

// 4. Department đơn giản
export const DEPARTMENTS = {
  OPERATOR: 'operator',
};

// 5. Phân quyền đơn giản cho operator
export const DEPARTMENT_PERMISSIONS = {
  [DEPARTMENTS.OPERATOR]: [
    ROUTES.personal,
  ],
};

// 6. Helper function để check public route
export const isPublicRoute = (path) => {
  if (!path || typeof path !== 'string') {
    return false;
  }
  return PUBLIC_ROUTES.some((route) => path.startsWith(route));
};

// 7. Check permission đơn giản
export const hasPermission = (role, department, path) => {
  if (!path || typeof path !== 'string') {
    return false;
  }
  
  // Operator luôn có quyền truy cập personal
  if (path.startsWith(ROUTES.personal)) {
    return true;
  }
  
  return false;
};

// 8. Get default route đơn giản
export const getDefaultRoute = (role, department) => {
  return ROUTES.personal;
};
