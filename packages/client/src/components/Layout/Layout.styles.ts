import { makeStyles } from '@material-ui/core/styles';

/* const getDrawerClearance = (theme:Theme)=>{
  return {

  }
} */

const useLayoutStyles = makeStyles(theme => {
  // const drawerWidth = (theme.custom && theme.custom.drawerWidth) || defaultDrawerWidth;

  return {
    /* '@global': {
      html: {
        overflow: 'hidden',
      },
    }, */
    /* root: {
      display: 'flex',
      flexDirection: 'column',
      height: '100%',
    }, */
    /* clearDrawer: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
    },
    clearToolbar: {
      '&::before': {
        ...theme.mixins.toolbar,
        content: '""',
        display: 'block',
      },
    },
    clearFooter: {
      '&::after': {
        content: '""',
        display: 'block',
        minHeight: 56,
      },
    }, */
    /* logo: {
      ...theme.mixins.toolbar,
      padding: theme.spacing(0, 2),
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'flex-start',
    }, */
    /* drawer: {
      width: drawerWidth,
    }, */
    /* drawerNavigation: {
      margin: theme.spacing(2, 0),
      flexGrow: 1,
    }, */
    /* bottomNavigation: {
      position: 'fixed',
      bottom: 0,
      width: '100%',
    }, */

    /* clearToolbar: {
      ...theme.mixins.toolbar,
      padding: theme.spacing(0, 2),
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'flex-start',
    }, */
    /* main: {
      // ...clearDrawer,
      flexGrow: 1,
      height: '100%',
    }, */
    animationWrapper: {
      position: 'absolute',
      left: 0,
      top: 0,
      right: 0,
      bottom: 0,
      zIndex: theme.zIndex.appBar,
    },
    /**
     * Reach Router adds a wrapper div to help manage focus.
     * <div tabindex="-1" role="group" style="outline: none;"></div>
     * See https://github.com/reach/router/issues/63#issuecomment-395988602
     */
    routerWrapper: {
      /* 
      display: 'flex',
      flexDirection: 'column',
      height: '100%',
      // transition: 'opacity 450ms ease-in', */
    },
  };
});

export default useLayoutStyles;
