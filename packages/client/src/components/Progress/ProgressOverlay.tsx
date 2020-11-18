import { Theme } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import React from 'react';
import { animated, useSpring } from 'react-spring';

import Progress from './Progress';

const useStyles = makeStyles<
  Theme,
  Required<Pick<ProgressOverlayProps, 'fullWidth' | 'size' | 'show' | 'opaque'>>
>(theme => ({
  wrapper: {
    position: 'relative',
    display: 'inline-table',
    width: props => (props.fullWidth ? '100%' : undefined),
  },
  indicator: {
    position: 'absolute',
    left: '50%',
    top: '50%',
    margin: props => `${-props.size / 2}px 0 0 ${-props.size / 2}px`,
    // marginTop: (props) => -props.size / 2,
    // marginLeft: (props) => -props.size / 2,
  },
  children: {
    transition: theme.transitions.create('opacity'),
    opacity: props => (props.show && props.opaque ? 0 : 1),
  },
}));

interface ProgressOverlayProps {
  show: boolean;
  fullWidth?: boolean;
  opaque?: boolean;
  size?: number;
}

const ProgressOverlay: React.FC<ProgressOverlayProps> = ({
  children,
  show,
  fullWidth = false,
  opaque = false,
  size = 24,
  ...restProps
}) => {
  const classes = useStyles({ size, fullWidth, opaque, show });
  const props = useSpring({
    opacity: show ? 1 : 0,
  });
  return (
    <div className={classes.wrapper} {...restProps}>
      <div className={classes.children}>{children}</div>
      {show && (
        <animated.div style={props}>
          <Progress className={classes.indicator} size={size} />
        </animated.div>
      )}
    </div>
  );
};

export default ProgressOverlay;
