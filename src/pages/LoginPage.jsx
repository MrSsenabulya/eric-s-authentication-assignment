import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Paper,
  TextInput,
  PasswordInput,
  Button,
  Title,
  Text,
  Stack,
  Alert,
  Anchor,
  Divider
} from '@mantine/core';
import { useForm } from '@mantine/form';
import { useAuth } from '../hooks/useAuth';
import { IconBrandGoogle } from '@tabler/icons-react';

const LoginPage = () => {
  const navigate = useNavigate();
  const { signIn, isSignedIn, user: clerkUser, isLoaded } = useAuth();
  const [error, setError] = useState('');

  const form = useForm({
    initialValues: {
      email: '',
      password: ''
    },
    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
      password: (value) => (value.length < 1 ? 'Password is required' : null)
    }
  });

  const handleSubmit = async (values) => {
    setError('');
    
    try {
      const result = await signIn.create({
        identifier: values.email,
        password: values.password,
      });

      if (result.status === 'complete') {
        navigate('/dashboard');
      } else {
        setError('Sign in incomplete. Please try again.');
      }
    } catch (err) {
      setError(err.errors?.[0]?.message || 'Invalid email or password');
    }
  };

  const handleGoogleLogin = async () => {
    try {
      await signIn.authenticateWithRedirect({
        strategy: 'oauth_google',
        redirectUrl: '/dashboard',
        redirectUrlComplete: '/dashboard'
      });
    } catch (err) {
      setError('Failed to sign in with Google. Please try again.');
    }
  };

  // Redirect if already signed in
  if (isSignedIn && isLoaded) {
    navigate('/dashboard');
  }

  return (
    <Container size={420} my={40}>
      <Title ta="center" fw={900}>
        Welcome Back
      </Title>
      <Text c="dimmed" size="sm" ta="center" mt={5}>
        Don't have an account?{' '}
        <Anchor size="sm" component="button" onClick={() => navigate('/signup')}>
          Sign up
        </Anchor>
      </Text>

      <Paper withBorder shadow="md" p={30} mt={30} radius="md">
        <form onSubmit={form.onSubmit(handleSubmit)}>
          <Stack>
            {error && (
              <Alert color="red" title="Error">
                {error}
              </Alert>
            )}

            <TextInput
              label="Email"
              placeholder="Enter your email"
              required
              {...form.getInputProps('email')}
            />

            <PasswordInput
              label="Password"
              placeholder="Enter your password"
              required
              {...form.getInputProps('password')}
            />

            <Button type="submit" fullWidth mt="xl">
              Sign In
            </Button>

            <Divider label="Or continue with" labelPosition="center" my="lg" />

            <Button
              variant="outline"
              fullWidth
              leftSection={<IconBrandGoogle size={16} />}
              onClick={handleGoogleLogin}
              loading={!isLoaded}
            >
              Sign in with Google
            </Button>
          </Stack>
        </form>
      </Paper>
    </Container>
  );
};

export default LoginPage;
