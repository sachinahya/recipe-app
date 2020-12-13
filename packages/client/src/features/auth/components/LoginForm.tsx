import { Button, Typography } from '@material-ui/core';
import { useLogin } from 'features/auth/hooks';
import TextField from 'features/forms/TextField';
import { Form, Formik } from 'formik';
import { FC } from 'react';
import { spacing } from 'styles/styleSelectors';
import { object, string } from 'yup';

const schema = object({
  email: string().email().required(),
  password: string().required(),
});

const LoginForm: FC = () => {
  const [login, { error, fetching }] = useLogin();

  return (
    <Formik
      initialValues={{
        email: '',
        password: '',
      }}
      onSubmit={({ email, password }) => login(email, password)}
      validationSchema={schema}
    >
      <Form>
        <TextField
          css={theme => ({ marginBottom: spacing(2)(theme) })}
          fullWidth
          name="email"
          id="email"
          label="Email"
          type="email"
        />
        <TextField
          css={theme => ({ marginBottom: spacing(2)(theme) })}
          fullWidth
          name="password"
          id="password"
          label="Password"
          type="password"
        />

        {error && (
          <Typography variant="body2" color="error" align="center" gutterBottom>
            {error.message}
          </Typography>
        )}

        <Button
          css={theme => ({
            margin: spacing(2, 0)(theme),
            alignSelf: 'center',
          })}
          disabled={fetching}
          size="large"
          variant="contained"
          type="submit"
        >
          Login
        </Button>
      </Form>
    </Formik>
  );
};

export default LoginForm;
