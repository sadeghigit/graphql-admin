import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import ReactDOM from 'react-dom/client';
import reportWebVitals from './reportWebVitals';
import "./theme.less"
import DashoardRoute from './components/routes/dashboard-route';
import AdminLayout from './components/layouts/admin-layout';
import LoginRoute from './components/routes/login-route';
import AuthLayout from './components/layouts/auth-layout';
import UsersRoute from './components/routes/users-route';
import RegisterRoute from './components/routes/register-route';
import ResetRoute from './components/routes/reset-route';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <BrowserRouter>
    <Routes>
      <Route element={<AuthLayout />} >
      <Route path='/login' element={<LoginRoute />} />
      <Route path='/register' element={<RegisterRoute />} />
      <Route path='/reset' element={<ResetRoute />} />
      </Route>
      <Route element={<AdminLayout />} >
      <Route path='/dashboard' element={<DashoardRoute />} />
      <Route path='/users' element={<UsersRoute />} />
      </Route>
      <Route path="/" element={<Navigate to="/login" />} />
    </Routes>
  </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
