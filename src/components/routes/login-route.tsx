import { FC } from 'react';
import { Button, Card } from 'antd';
import { useMutation, gql } from '@apollo/client';
import LoginForm from '../forms/login-form';

// const AUTH_LOGIN_MUTATION = `
// mutation {
//   authLogin(loginInput:{
//     mobile:"09214096846",
//     password:"123456"
//   }){
//     accessToken
//     expiresAt
//     refreshToken
//   }
// }
// `;

const LoginRoute: FC = function () {

  // const [runLoginMutaion, loginMutaion] = useMutation(gql(AUTH_LOGIN_MUTATION), {
  //   onCompleted({ authLogin }) {
  //     localStorage.setItem('accessToken', authLogin.accessToken)
  //     localStorage.setItem('expiresAt', authLogin.expiresAt)
  //     localStorage.setItem('refreshToken', authLogin.refreshToken)
  //   }
  // })

  return (
    <div>
      <Card
        style={{
          width: "400px",
          margin: "10% auto"
        }}
      >
        <LoginForm />
      </Card>
    </div>
  )
};

export default LoginRoute;