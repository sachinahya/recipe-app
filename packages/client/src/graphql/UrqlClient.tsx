import { cacheExchange } from '@urql/exchange-graphcache';
import { FC } from 'react';
import { createClient, dedupExchange, fetchExchange, Provider } from 'urql';

const client = createClient({
  url: process.env.RA_CLIENT_GRAPHQL_URI || '',
  fetchOptions: {
    credentials: 'include',
  },
  exchanges: [dedupExchange, cacheExchange({}), fetchExchange],
});

const UrqlClient: FC = ({ children }) => {
  return <Provider value={client}>{children}</Provider>;
};

export default UrqlClient;
