import { makeStyles } from '@material-ui/core/styles';
import React from 'react';

interface ClearProps {
  header?: boolean;
  tabs?: boolean;
  footer?: boolean;
}

const useStyles = makeStyles(theme => ({
  clearHeader: {
    ...theme.mixins.toolbar,
  },
  clearTabs: {
    minHeight: 48,
  },
  clearFooter: {
    minHeight: 56,
  },
}));

const Clear: React.FC<ClearProps> = ({ header, tabs, footer }) => {
  const { clearHeader, clearTabs, clearFooter } = useStyles();
  return (
    <>
      {header != null && <div hidden={!header} className={clearHeader} />}
      {tabs != null && <div hidden={!tabs} className={clearTabs} />}
      {footer != null && <div hidden={!footer} className={clearFooter} />}
    </>
  );
};

export default Clear;
