import {
  FiUser,
  FiShoppingCart,
} from 'react-icons/fi';
import { ROUTES } from './routesPermission';

export const getMenuItems = (t) => ({
  // OPERATOR - Chỉ có operator route
  operator: [
    {
      key: 'operator',
      label: 'Operator',
      href: ROUTES.personal,
      icon: FiUser,
    },
    {
      key: 'sale',
      label: 'Sale',
      href: '/personal/sale',
      icon: FiShoppingCart,
    },
  ],
});
