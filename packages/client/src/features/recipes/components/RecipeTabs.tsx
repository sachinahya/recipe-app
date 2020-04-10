import { Tab, Tabs } from 'components/Tabs';
import React from 'react';

const RecipeTabs: React.FC = () => {
  return (
    <Tabs variant="fullWidth">
      <Tab index={0} label="About" />
      <Tab index={1} label="Ingredients" />
      <Tab index={2} label="Steps" />
    </Tabs>
  );
};

export default RecipeTabs;
