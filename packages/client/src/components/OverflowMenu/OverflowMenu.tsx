import { Menu } from '@material-ui/core';
import { MenuItemProps } from '@material-ui/core/MenuItem';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { useModalState } from '@sachinahya/hooks';
import { HeaderAction } from 'components/Layout';
import { Children, isValidElement, ReactElement, FC, cloneElement } from 'react';

type OverFlowMenuChild = ReactElement<MenuItemProps> | null | undefined;

interface OverflowMenuProps {
  children: OverFlowMenuChild | OverFlowMenuChild[];
}

const menuId = 'menu-overflow-header';
const originProps = { vertical: 'top', horizontal: 'right' } as const;

const OverflowMenu: FC<OverflowMenuProps> = ({ children }) => {
  const { handleClose, handleOpen, open, anchorEl } = useModalState();

  return (
    <>
      <HeaderAction
        icon={<MoreVertIcon />}
        onClick={handleOpen}
        aria-label="Show more actions"
        aria-controls={menuId}
        aria-haspopup="true"
      />
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        id={menuId}
        keepMounted
        anchorOrigin={originProps}
        transformOrigin={originProps}
      >
        {Children.map(children, child =>
          isValidElement<MenuItemProps>(child)
            ? cloneElement<MenuItemProps>(child, {
                onClick: evt => {
                  handleClose();
                  child.props.onClick?.(evt);
                },
              })
            : null
        )}
      </Menu>
    </>
  );
};

export default OverflowMenu;
