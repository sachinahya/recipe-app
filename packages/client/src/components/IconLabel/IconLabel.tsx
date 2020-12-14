import { FC, ReactElement } from 'react';
import { spacing } from 'styles/styleSelectors';

interface IconLabelProps {
  icon: ReactElement;
}

const IconLabel: FC<IconLabelProps> = ({ children, icon, ...props }) => {
  return (
    <span
      css={theme => ({
        display: 'inline-flex',
        marginRight: spacing(3)(theme),
        svg: {
          marginRight: spacing(1)(theme),
        },
      })}
      {...props}
    >
      {icon}
      {children}
    </span>
  );
};

export default IconLabel;
