import { ApolloClient, ApolloLink, ApolloProvider, InMemoryCache } from '@apollo/client';
import { onError } from '@apollo/client/link/error';
import { persistCache } from 'apollo-cache-persist';
import { PersistentStorage } from 'apollo-cache-persist/types';
import { createUploadLink } from 'apollo-upload-client';
import React from 'react';

const link = ApolloLink.from([
  onError(({ graphQLErrors, networkError }) => {
    if (graphQLErrors)
      graphQLErrors.forEach(({ message, locations, path }) =>
        console.log(
          `[GraphQL error]: Message: ${message}, Location: ${JSON.stringify(
            locations
          )}, Path: ${JSON.stringify(path)}`
        )
      );
    if (networkError) console.log(`[Network error]: ${JSON.stringify(networkError)}`);
  }),
  createUploadLink({
    uri: process.env.RA_CLIENT_GRAPHQL_URI,
    credentials: process.env.RA_CLIENT_GRAPHQL_CREDENTIALS,
  }),
]);

const cache = new InMemoryCache();

const client = new ApolloClient({ link, cache });

const ApolloClientProvider: React.FC = ({ children }) => {
  const [loaded, setLoaded] = React.useState(false);

  React.useEffect(() => {
    /**
     * The cache will need to be versioned so that we can reset it if the schema changes.
     * TODO: Read the version of the restored cache and clear it if necessary.
     */
    void persistCache({
      cache,
      storage: window.localStorage as PersistentStorage<string | null>,
    }).then(() => setLoaded(true));
  }, []);

  return <ApolloProvider client={client}>{loaded && children}</ApolloProvider>;
};

export default ApolloClientProvider;
