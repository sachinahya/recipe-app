import React from 'react';
import { Switch, useHistory, useLocation } from 'react-router-dom';
import { animated, useTransition } from 'react-spring';
import styled from 'styled-components';
import { drawerShown } from 'styles/mediaQueries';
import { getDrawerWidth } from 'styles/styleSelectors';
import styles from './Router.module.css';

const getProps = (pathLength: number, isPush: boolean) =>
  pathLength > 1
    ? {
        from: {
          transform: isPush ? 'translate3d(100%, 0, 0)' : 'translate3d(-100%, 0, 0)',
        },
        enter: {
          transform: 'translate3d(0, 0, 0)',
        },
        leave: {
          transform: isPush ? 'translate3d(-50%, 0, 0)' : 'translate3d(50%, 0, 0)',
        },
      }
    : {
        from: {
          opacity: 0,
        },
        enter: {
          opacity: 1,
        },
        leave: {
          opacity: 0,
        },
      };

const Container = styled.div`
  background-color: ${props => props.theme.palette.background.default};
  overflow: auto;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;

  ${drawerShown} {
    padding-left: ${getDrawerWidth};
  }
`;

const AnimatedRouter: React.FC = ({ children }) => {
  const location = useLocation();
  const history = useHistory();

  const transitions = useTransition(location, location => location.pathname, {
    initial: null,
    unique: true,
    config: { tension: 150, friction: 28 },
    ...getProps(2, history.action === 'PUSH'),
  });

  return (
    <>
      {transitions.map(({ item, key, props }) => (
        <animated.div
          className={styles.page}
          key={key}
          style={{
            ...props,
            // Ensure the upcoming route is on top.
            zIndex: item.pathname === location.pathname ? 1 : 0,
          }}
        >
          <Container>
            <Switch location={item}>{children}</Switch>
          </Container>
        </animated.div>
      ))}
    </>
  );
};

export default AnimatedRouter;
