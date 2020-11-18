import { Header } from 'components/Layout';
import Screen from 'components/Screen';
import { FC } from 'react';

const NotFound: FC = () => {
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
