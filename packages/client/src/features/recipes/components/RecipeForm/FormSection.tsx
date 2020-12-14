import React, { FC, HTMLAttributes } from 'react';
import { spacing } from 'src/styles/styleSelectors';

interface FormSectionProps extends HTMLAttributes<HTMLDivElement> {}

const FormSection: FC<FormSectionProps> = props => (
  <div css={theme => ({ marginBottom: spacing(4)(theme) })} {...props} />
);

export default FormSection;
