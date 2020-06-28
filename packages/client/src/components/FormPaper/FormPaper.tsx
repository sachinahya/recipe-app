import { Paper } from '@material-ui/core';
import styled from 'styled-components';
import { getSpacing } from 'styles/styleSelectors';

const FormPaper = styled(Paper)`
  display: flex;
  flex-direction: column;
  padding: ${getSpacing(4)};
  max-width: 450px;
  margin: ${getSpacing(6)} auto;
`;

export default FormPaper;
