import { gql, MutationResult, MutationUpdaterFn } from '@apollo/client';
import { User } from 'features/types.gql';

import { RegisterFormValues } from './components/RegistrationForm';
import {
  CurrentUserDocument,
  CurrentUserQuery,
  CurrentUserQueryResult,
  LoginMutation,
  LoginMutationResult,
  LogoutMutationResult,
  RegisterUserMutation,
  RegisterUserMutationResult,
  useCurrentUserQuery,
  useLoginMutation,
  useLogoutMutation,
  useRegisterUserMutation,
} from './hooks.gql';
import UnauthenticatedError from './UnauthenticatedError';

type MutationStatus<T extends MutationResult> = Pick<T, 'loading' | 'error'>;

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

export type UseCurrentUserHookStatus = MutationStatus<CurrentUserQueryResult>;

type UseCurrentUserHook = [User | null, UseCurrentUserHookStatus];

export const useCurrentUser = ({ skipCache }: UseCurrentUserOptions = {}): UseCurrentUserHook => {
  const { data, loading, error } = useCurrentUserQuery({
    fetchPolicy: skipCache ? 'network-only' : undefined,
  });
  const user: User | null = data?.currentUser || null;

  return [user, { loading, error }];
};

type LoggedInUserHook = [User, MutationStatus<CurrentUserQueryResult>];

export const useLoggedInUser = (): LoggedInUserHook => {
  const hook = useCurrentUser();
  if (hook[0] == null) throw new UnauthenticatedError();

  return hook as LoggedInUserHook;
};

gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      email
    }
  }
`;

type UseLoginHook = [
  (email: string, password: string) => Promise<void>,
  MutationStatus<LoginMutationResult>
];

const loginUpdater: MutationUpdaterFn<LoginMutation> = (cache, { data }) => {
  if (data) {
    cache.writeQuery<CurrentUserQuery>({
      query: CurrentUserDocument,
      data: { currentUser: data.login },
    });
  }
};

export const useLogin = (): UseLoginHook => {
  const [loginMutation, { loading, error }] = useLoginMutation();

  const login = async (email: string, password: string): Promise<void> => {
    try {
      await loginMutation({
        variables: { email, password },
        update: loginUpdater,
      });
    } catch (err) {
      console.error(err);
    }
  };

  return [login, { loading, error }];
};

gql`
  mutation logout {
    logout
  }
`;

type UseLogoutHook = [() => Promise<void>, MutationStatus<LogoutMutationResult>];

export const useLogout = (): UseLogoutHook => {
  const [logoutMutation, { client, loading, error }] = useLogoutMutation();

  const logout = async (): Promise<void> => {
    try {
      await logoutMutation();
      await client?.resetStore();
    } catch (err) {
      console.error(err);
    }
  };

  return [logout, { loading, error }];
};

gql`
  mutation registerUser($newUser: NewUserInput!) {
    register(newUser: $newUser) {
      email
    }
  }
`;
type UseRegistrationHook = [
  (values: RegisterFormValues) => void,
  MutationStatus<RegisterUserMutationResult>
];

const registrationUpdater: MutationUpdaterFn<RegisterUserMutation> = (cache, { data }) => {
  if (data) {
    cache.writeQuery<CurrentUserQuery>({
      query: CurrentUserDocument,
      data: { currentUser: data.register },
    });
  }
};

export const useRegistration = (): UseRegistrationHook => {
  const [registerMutation, { error, loading }] = useRegisterUserMutation();

  const register = async (values: RegisterFormValues): Promise<void> => {
    try {
      await registerMutation({
        variables: {
          newUser: {
            email: values.email,
            plainTextPassword: values.password,
          },
        },
        update: registrationUpdater,
      });
    } catch (err) {
      console.error(err);
    }
  };

  return [register, { loading, error }];
};
