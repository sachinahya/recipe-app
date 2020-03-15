import { ApolloError } from 'apollo-client';
import { User } from 'features/graphql/types.generated';
import {
  CurrentUserDocument,
  CurrentUserQuery,
  useCurrentUserQuery,
  useLoginMutation,
  useLogoutMutation,
} from './queries.generated';

export interface UseAuthHook {
  user: User | null;
  login(username: string, password: string): Promise<void>;
  logout(): Promise<void>;
  error?: ApolloError;
  loading: boolean;
}

const useAuth = (): UseAuthHook => {
  const [loginMutation, { error: loginError, loading: loginLoading }] = useLoginMutation();
  const [logoutMutation, { client }] = useLogoutMutation();

  const login = async (email: string, password: string): Promise<void> => {
    try {
      await loginMutation({
        variables: { email, password },
        update(cache, { data }) {
          if (data) {
            cache.writeQuery<CurrentUserQuery>({
              query: CurrentUserDocument,
              data: { currentUser: data.login },
            });
          }
        },
      });
    } catch (err) {
      console.error(err);
    }
  };

  const logout = async (): Promise<void> => {
    try {
      await logoutMutation();
      await client?.resetStore();
    } catch (err) {
      console.error(err);
    }
  };

  return {
    user: useCurrentUserQuery().data?.currentUser || null,
    login,
    logout,
    error: loginError,
    loading: loginLoading,
  };
};

export default useAuth;
