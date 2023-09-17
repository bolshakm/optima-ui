export const ROUTER_KEYS = {
  ANOTHER: '*',
  HOME: '/',
  MENU: '/menu',
  MENU_READ: '/menu/read',
  MENU_ACTIONS: '/menu/actions',
  CART: '/cart',
  ORDER_UPDATE: '/order/update',
  REQUEST_BILL: '/cart/request-bill',
  SUCCESS_BILL: '/cart/success-bill'
}

export const API_KEYS = {
  BASE: process.env.REACT_APP_SERVER_URL,
  CAFE: '/v1/cafe',
  MENU: '/v1/menu/view',
  CHECK_ORDER: '/v1/order',
  ORDER: '/v1/order/place',
  ORDER_UPDATE: '/v1/order/update',
  BILL: '/v1/bill',
  WAITER: '/v1/waiter',
  LOCAL: '/v1/text/local'
};

export const STORAGE_KEYS = {
  CART: 'optima-cart',
  BILL: 'optima-bill',
  CAFE: 'optima-cafe',
  TABLE: 'optima-table',
  MODE: 'optima-mode',
  FAVOURITES: 'optima-favourites',
  LANG: 'optima-language',
  LOCAL: 'optima-local'
};