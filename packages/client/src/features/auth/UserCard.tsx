import { Box } from '@material-ui/core';
import Button from 'components/Button';
import NameBadge from 'components/NameBadge';
import React from 'react';
import { UseAuthHook } from './useAuth';

type DeepNonNullable<T> = { [K in keyof T]: NonNullable<T[K]> };

export type UserCardProps = DeepNonNullable<Pick<UseAuthHook, 'user' | 'logout'>>;

const UserCard: React.FC<UserCardProps> = ({ user, logout }) => {
  return (
    <>
      <div>
        <NameBadge name={user.email} showAvatar={user != null} />
        <Box marginTop={1} alignSelf="flex-end">
          {user && <Button onClick={logout}>Sign out</Button>}
        </Box>
      </div>
      {/* {error && (
        <AlertDialog title="Problem with sign in" {...dialogState} onResolve={clearError}>
          <Paragraph>There was a problem signing you in.</Paragraph>
          <Pre>{error.message}</Pre>
        </AlertDialog>
      )} */}
    </>
  );
};

export default UserCard;
