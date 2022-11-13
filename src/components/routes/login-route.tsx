import { FC } from 'react';
import { Button } from 'antd';
import { useMutation, gql } from '@apollo/client';

const LOGIN_MUTATION = gql`
mutation {
  authLogin(authLoginInput:{
    mobile:"",
    password:""
  }){
    accessToken
    expiresAt
    refreshToken
  }
}
`;
const LoginRoute: FC = function () {

  const [runLoginMutaion, loginMutaion] = useMutation(LOGIN_MUTATION, {
    onCompleted({ authLogin }) {
      localStorage.setItem('accessToken', authLogin.accessToken)
      localStorage.setItem('expiresAt', authLogin.expiresAt)
      localStorage.setItem('refreshToken', authLogin.refreshToken)
    }
  })

  return (
    <div>
      <Button type='primary' onClick={() => runLoginMutaion()}>Login</Button>
    </div>
  )
};

export default LoginRoute;