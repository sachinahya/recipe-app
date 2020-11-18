import { Box } from '@material-ui/core';
import Button from 'components/Button';
import NameBadge from 'components/NameBadge';
import { FC } from 'react';

import { useCurrentUser, useLogout } from '../hooks';

const UserCard: FC = props => {
  const [user] = useCurrentUser();
  const [logout] = useLogout();

  if (!user) return null;

  return (
    <Box p={2} {...props}>
      <NameBadge name={user?.email} showAvatar={user != null} />
      <Box marginTop={1} alignSelf="flex-end">
        {user && <Button onClick={logout}>Sign out</Button>}
      </Box>
    </Box>
  );
};

export default UserCard;
