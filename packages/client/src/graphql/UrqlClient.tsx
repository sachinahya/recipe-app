import { devtoolsExchange } from '@urql/devtools';
import { cacheExchange } from '@urql/exchange-graphcache';
import { FC } from 'react';
import { createClient, dedupExchange, Exchange, fetchExchange, Provider } from 'urql';
import { addRecipeUpdate } from './updates/addRecipeUpdate';

let exchanges: Exchange[] = [
  dedupExchange,
  cacheExchange({
    updates: {
      Mutation: {
        ...addRecipeUpdate,
      },
    },
  }),
  fetchExchange,
];

if (process.env.NODE_ENV === 'development') {
  exchanges = [devtoolsExchange].concat(exchanges);
}

const client = createClient({
  url: process.env.RA_CLIENT_GRAPHQL_URI || '',
  fetchOptions: {
    credentials: 'include',
  },
  exchanges,
});

const UrqlClient: FC = ({ children }) => {
  return <Provider value={client}>{children}</Provider>;
};

export default UrqlClient;
