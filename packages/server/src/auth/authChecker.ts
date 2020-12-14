import { AuthChecker } from 'type-graphql';

import { Context } from '../resolvers/types';

const authChecker: AuthChecker<Context> = ({ context }) => {
  if (!context.user) return false;
  return true;
};

export default authChecker;
