import { Heading } from 'components/Typography';
import styled from 'styled-components';
import { mobileDown } from 'styles/mediaQueries';

const SectionTitle = styled(Heading).attrs({
  component: 'h2',
  variant: 'h5',
})`
  ${mobileDown} {
    display: none;
  }
`;

export default SectionTitle;
