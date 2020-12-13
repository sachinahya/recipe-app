import { FC, ElementType, HTMLAttributes } from 'react';
import { getSpacing } from 'styles/styleSelectors';

interface ButtonRowProps {
  component?: ElementType<HTMLAttributes<HTMLElement>>;
}

const ButtonRow: FC<ButtonRowProps> = ({ children, component: Component = 'div', ...props }) => {
  return (
    <Component
      css={theme => ({
        button: {
          marginRight: getSpacing(1)(theme),
        },
      })}
      {...props}
    >
      {children}
    </Component>
  );
};

export default ButtonRow;
