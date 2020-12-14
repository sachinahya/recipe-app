import { Avatar } from '@material-ui/core';
import { useTheme } from '@material-ui/core/styles';
import { getInitials, stringToHslColor } from '@sachinahya/utils';
import { FC,useMemo } from 'react';

const UserAvatar: FC<{ name?: string }> = ({ name, ...props }) => {
  const theme = useTheme();

  const colorProps = useMemo(() => {
    const backgroundColor = name ? stringToHslColor(name, 45, 35) : theme.palette.primary.main;
    return {
      backgroundColor: backgroundColor,
      color: theme.palette.getContrastText(backgroundColor),
    };
  }, [name, theme]);

  return (
    <Avatar style={colorProps} {...props}>
      {name && getInitials(name)}
    </Avatar>
  );
};

export default UserAvatar;
