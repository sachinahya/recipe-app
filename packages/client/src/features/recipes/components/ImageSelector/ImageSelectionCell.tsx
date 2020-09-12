import styled from 'styled-components';
import { getSpacing } from 'styles/styleSelectors';

export default styled.div`
  display: flex;
  flex: 0 1 calc(50% - (2 * ${getSpacing(1)}));
  height: 150px;
  margin: ${getSpacing(1)};
`;
