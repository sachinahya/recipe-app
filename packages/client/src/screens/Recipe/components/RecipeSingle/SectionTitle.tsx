import { Heading, HeadingProps } from 'components/Typography';
import { FC } from 'react';
import { mobileDown } from 'src/styles/styleSelectors';

const SectionTitle: FC<HeadingProps> = props => (
  <Heading
    component="h2"
    variant="h5"
    css={theme => ({
      [mobileDown(theme)]: {
        display: 'none',
      },
    })}
    {...props}
  />
);

export default SectionTitle;
