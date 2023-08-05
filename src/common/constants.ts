export const ROUTER_KEYS = {
  ANOTHER: '*',
  HOME: '/',
  MENU: '/menu',
  CART: '/cart',
  REQUEST_BILL: '/cart/request-bill',
  SUCCESS_BILL: '/cart/success-bill'
}

export const API_KEYS = {
  BASE: process.env.REACT_APP_SERVER_URL,
  RESTAURANT: '/v1/menu/view',
  ORDER: '/v1/order/place',
  BILL: '/v1/bill',
  WAITER: '/v1/waiter'
};

export const STORAGE_KEYS = {
  CART: "optima-cart"
};