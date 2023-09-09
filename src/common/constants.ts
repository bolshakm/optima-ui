export const ROUTER_KEYS = {
  ANOTHER: '*',
  HOME: '/',
  MENU: '/menu',
  MENU_OPTIONS: '/menu/options',
  CART: '/cart',
  REQUEST_BILL: '/cart/request-bill',
  SUCCESS_BILL: '/cart/success-bill'
}

export const API_KEYS = {
  BASE: process.env.REACT_APP_SERVER_URL,
  CAFE: '/v1/cafe',
  MENU: '/v1/menu/view',
  CHECK_ORDER: '/v1/order',
  ORDER: '/v1/order/place',
  ORDER_UPDATE: '/v1/order/update/',
  BILL: '/v1/bill',
  WAITER: '/v1/waiter'
};

export const STORAGE_KEYS = {
  CART: 'optima-cart',
  BILL: 'optima-bill',
  CAFE: 'optima-cafe',
  TABLE: 'optima-table',
};