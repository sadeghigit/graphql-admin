import { ApolloClient, InMemoryCache, ApolloLink, Operation, HttpLink } from '@apollo/client';
import { TokenRefreshLink } from 'apollo-link-token-refresh';

const url = 'http://127.0.0.1:3000/graphql'

const AUTH_REFRESH_MUTATION = `
mutation AuthRefreshMutation($refreshToken: RefreshInput!) {
  authRefresh(refreshToken: $refreshToken) { accessToken expiresAt }}
`;

export const guest = new ApolloClient({
  uri: url,
  cache: new InMemoryCache(),
});

export const authed = new ApolloClient({
  link: ApolloLink.from([
    new TokenRefreshLink({
      accessTokenField: 'authRefresh',
      isTokenValidOrUndefined(operation: Operation) {
        const expiresAt = localStorage.getItem('expiresAt')
        if (!expiresAt) return false
        const expiresDate = Date.parse(expiresAt)
        return (expiresDate - (2 * 1000 * 60)) > Date.now()
      },
      fetchAccessToken() {
        return fetch(url, {
          method: 'POST',
          headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
          body: JSON.stringify({
            query: AUTH_REFRESH_MUTATION,
            variables: { refreshToken: localStorage.getItem('refreshToken') }
          })
        });
      },
      handleFetch(authRefresh: any, operation: Operation) {
        localStorage.setItem('accessToken', authRefresh.accessToken)
        localStorage.setItem('expiresAt', authRefresh.expiresAt)
      },
      handleError(err: Error, operation: Operation) {
        localStorage.removeItem('accessToken')
        localStorage.removeItem('expiresAt')
        localStorage.removeItem('refreshToken')
        // window.location.href = "/login";
      },
    }),
    new ApolloLink((operation, forward) => {
      operation.setContext(({ headers = {} }) => {
        const accessToken = localStorage.getItem('accessToken')
        return { headers: { ...headers, authorization: "Bearer " + accessToken } }
      });
      return forward(operation);
    }),
    new HttpLink({ uri: url }),
  ]),
  cache: new InMemoryCache(),
});
