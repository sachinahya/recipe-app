import { Paper } from '@material-ui/core';
import Button from 'components/Button';
import TextField from 'features/forms/TextField';
import styled from 'styled-components';
import { getSpacing } from 'styles/styleSelectors';

export const FormPaper = styled(Paper)`
  display: flex;
  flex-direction: column;
  padding: ${getSpacing(4)};
  max-width: 450px;
  margin: ${getSpacing(6)} auto 0;
`;

export const LoginField = styled(TextField).attrs({
  fullWidth: true,
})`
  margin-bottom: ${getSpacing(2)};
`;

export const LoginButton = styled(Button)`
  margin: ${getSpacing(2)} 0;
  align-self: center;
`;
