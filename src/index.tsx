import { Button } from 'antd';
import ReactDOM from 'react-dom/client';
import reportWebVitals from './reportWebVitals';

import 'antd/dist/antd.min.css';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(<Button>Ok</Button>);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
