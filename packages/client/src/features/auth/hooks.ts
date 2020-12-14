import { User } from 'features/types.gql';
import gql from 'graphql-tag';
import { UseMutationResponse } from 'urql';

import { useCurrentUserQuery, useLoginMutation, useLogoutMutation } from './hooks.gql';
import UnauthenticatedError from './UnauthenticatedError';

export type MutationStatus = Pick<UseMutationResponse[0], 'fetching' | 'error'>;

gql`
  query currentUser {
    currentUser {
      email
    }
  }
`;

export interface UseCurrentUserOptions {
  skipCache?: boolean;
}

export const useCurrentUser = ({ skipCache }: UseCurrentUserOptions = {}): [
  User | null,
  MutationStatus
] => {
  const [{ data, fetching, error }] = useCurrentUserQuery({
    requestPolicy: skipCache ? 'network-only' : undefined,
  });
  const user: User | null = data?.currentUser || null;

  return [user, { fetching, error }];
};

export const useLoggedInUser = (): [User, MutationStatus] => {
  const hook = useCurrentUser();
  if (hook[0] == null) throw new UnauthenticatedError();

  return hook as [User, MutationStatus];
};

gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      email
    }
  }
`;

type UseLoginHook = [(email: string, password: string) => Promise<void>, MutationStatus];

export const useLogin = (): UseLoginHook => {
  const [{ fetching, error }, loginMutation] = useLoginMutation();

  const login = async (email: string, password: string): Promise<void> => {
    try {
      await loginMutation({ email, password });
    } catch (err) {
      console.error(err);
    }
  };

  return [login, { fetching, error }];
};

gql`
  mutation logout {
    logout
  }
`;

type UseLogoutHook = [() => Promise<void>, MutationStatus];

export const useLogout = (): UseLogoutHook => {
  const [{ fetching, error }, logoutMutation] = useLogoutMutation();

  const logout = async (): Promise<void> => {
    try {
      await logoutMutation();
    } catch (err) {
      console.error(err);
    }
  };

  return [logout, { fetching, error }];
};
