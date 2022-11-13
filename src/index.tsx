import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import ReactDOM from 'react-dom/client';
import reportWebVitals from './reportWebVitals';
import 'antd/dist/antd.min.css';
import DashoardRoute from './components/routes/dashboard-route';
import AdminLayout from './components/layouts/admin-layout';
import LoginRoute from './components/routes/login-route';
import AuthLayout from './components/layouts/auth-layout';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <BrowserRouter>
    <Routes>
      <Route element={<AuthLayout />} >
        <Route path='/login' element={<LoginRoute />} />
      </Route>
      <Route element={<AdminLayout />} >
        <Route path='/dashboard' element={<DashoardRoute />} />
      </Route>
      <Route path="/" element={<Navigate to="/login" />} />
    </Routes>
  </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
