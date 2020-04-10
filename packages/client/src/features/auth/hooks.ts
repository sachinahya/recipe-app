import { MutationResult } from '@apollo/react-common';
import { User } from 'features/types.gql';
import gql from 'graphql-tag';
import { RegisterFormValues } from './components/RegistrationForm';
import {
  CurrentUserDocument,
  CurrentUserQuery,
  CurrentUserQueryResult,
  LoginMutationResult,
  LogoutMutationResult,
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

type UseCurrentUserHook = [User | null, MutationStatus<CurrentUserQueryResult>];

export const useCurrentUser = (): UseCurrentUserHook => {
  const { data, loading, error } = useCurrentUserQuery();
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

export const useLogin = (): UseLoginHook => {
  const [loginMutation, { loading, error }] = useLoginMutation();

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
        update(cache, { data }) {
          if (data) {
            cache.writeQuery<CurrentUserQuery>({
              query: CurrentUserDocument,
              data: { currentUser: data.register },
            });
          }
        },
      });
    } catch (err) {
      console.error(err);
    }
  };

  return [register, { loading, error }];
};
