import { Header } from 'components/Layout';
import Screen from 'components/Screen';
import React from 'react';

const NotFound: React.FC = () => {
  return (
    <>
      <Header title="Not Found" />
      <Screen title="Not Found" padding>
        {"Couldn't find that page."}
      </Screen>
    </>
  );
};

export default NotFound;
