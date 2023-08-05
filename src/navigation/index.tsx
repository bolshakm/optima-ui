import { Routes, Route, Navigate } from 'react-router-dom';
import { ROUTER_KEYS } from '../common/constants';
import { MenuPage } from '../pages/menu';
import { CartPage } from '../pages/cart';
import { RequestBillPage } from '../pages/request-bill';
import { SuccessBillPage } from '../pages/success-bill';

export const Router = () => {
  return (
    <Routes>
      <Route path={ROUTER_KEYS.HOME} element={<Navigate to={ROUTER_KEYS.MENU} replace />} />
      <Route path={ROUTER_KEYS.MENU} element={<MenuPage />} />
      <Route path={ROUTER_KEYS.CART} element={<CartPage />} />
      <Route path={ROUTER_KEYS.REQUEST_BILL} element={<RequestBillPage />} />
      <Route path={ROUTER_KEYS.SUCCESS_BILL} element={<SuccessBillPage />} />
      <Route path={ROUTER_KEYS.ANOTHER} element={<Navigate to={ROUTER_KEYS.MENU} replace />} />
    </Routes>
  );
};