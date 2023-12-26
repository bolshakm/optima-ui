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

export const PREFIXES = {
  V1: 'v1',
  UI: 'ui',
  UAT: 'uat',
}

export const API_KEYS = {
  BASE: process.env.REACT_APP_SERVER_URL,
  CAFE: 'cafe',
  MENU: 'menu/view',
  CHECK_ORDER: 'order',
  ORDER: 'order/place',
  ORDER_UPDATE: 'order/update',
  BILL: 'bill',
  WAITER: 'waiter',
  LOCAL: 'text/local'
};

export const STORAGE_KEYS = {
  CART: 'optima-cart',
  BILL: 'optima-bill',
  CAFE: 'optima-cafe',
  TABLE: 'optima-table',
  MODE: 'optima-mode',
  FAVOURITES: 'optima-favourites',
  COMBINATIONS: 'optima-combinations',
  LANG: 'optima-language',
  LOCAL: 'optima-local'
};