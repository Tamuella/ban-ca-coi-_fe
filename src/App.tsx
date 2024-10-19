import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';
import { useEffect } from 'react';

import Blog from './features/blog/Blog';
import Login from './features/auth/Login';
import Register from './features/auth/Register';
import CommonTemplate from './shared/templates/CommonTemplate';
import AboutUs from './features/aboutUs/aboutUs';
import Pricing from './features/pricing/pricing';
import Order from './features/order/Order';
import CreateOrder from './features/order/CreateOrder';
import OrderHistory from './features/order/OrderHistory';
import AdminTemplate from './shared/templates/AdminTemplate';
import NotFound from './shared/components/NotFound';
import PriceManager from './features/admin/PriceManager';
import AuthGuard from './shared/components/AuthGuard';
import Home from './features/home/home';
import Profile from './features/profile/Profile';
import { userInfoState } from './shared/state/atom';

function App() {
  const setUserInfo = useSetRecoilState(userInfoState);

  useEffect(() => {
    const storedUserInfo = localStorage.getItem('userInfo');
    if (storedUserInfo) {
      setUserInfo(JSON.parse(storedUserInfo));
    }
  }, [setUserInfo]);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<CommonTemplate />}>
          <Route index element={<Home />} />
          <Route path="about" element={<AboutUs />} />
          <Route path="pricing" element={<Pricing />} />
          <Route
            path="order"
            element={
              <AuthGuard>
                <Order />
              </AuthGuard>
            }
          />
          <Route
            path="order/create"
            element={
              <AuthGuard>
                <CreateOrder />
              </AuthGuard>
            }
          />
          <Route path="order/history" element={<OrderHistory />} />
          <Route path="blog" element={<Blog />} />
          <Route path="profile" element={<Profile />} />
        </Route>
        <Route path="/auth">
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
        </Route>
        <Route path="/admin" element={<AdminTemplate />}>
          <Route path="pricing" element={<PriceManager />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
