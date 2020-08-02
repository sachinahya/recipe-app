import { AuthChecker } from 'type-graphql';

import { Context } from '../resolvers/types';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const authChecker: AuthChecker<Context> = ({ root, args, context, info }, roles) => {
  if (!context.user) return false;
  return true;
};

export default authChecker;
