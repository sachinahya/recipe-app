import gql from 'graphql-tag';

const CURRENT_USER_QUERY = gql`
  query currentUser {
    currentUser {
      email
    }
  }
`;

const LOGIN_MUTATION = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      email
    }
  }
`;

const LOGOUT_MUTATION = gql`
  mutation logout {
    logout
  }
`;
