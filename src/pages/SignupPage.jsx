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
  Anchor
} from '@mantine/core';
import { useForm } from '@mantine/form';
import { useAuth } from '../hooks/useAuth';

const SignupPage = () => {
  const navigate = useNavigate();
  const { signUp, isSignedIn, isLoaded } = useAuth();
  const [error, setError] = useState('');

  const form = useForm({
    initialValues: {
      fullName: '',
      email: '',
      password: '',
      confirmPassword: ''
    },
    validate: {
      fullName: (value) => (value.length < 2 ? 'Full name must be at least 2 characters' : null),
      email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
      password: (value) => (value.length < 6 ? 'Password must be at least 6 characters' : null),
      confirmPassword: (value, values) => (value !== values.password ? 'Passwords do not match' : null)
    }
  });

  const handleSubmit = async (values) => {
    setError('');
    
    try {
      const result = await signUp.create({
        emailAddress: values.email,
        password: values.password,
        firstName: values.fullName.split(' ')[0],
        lastName: values.fullName.split(' ').slice(1).join(' ') || '',
      });

      if (result.status === 'complete') {
        navigate('/dashboard');
      } else {
        setError('Please check your email for verification instructions.');
      }
    } catch (err) {
      setError(err.errors?.[0]?.message || 'Failed to create account. Please try again.');
    }
  };

  // Redirect if already signed in
  if (isSignedIn && isLoaded) {
    navigate('/dashboard');
  }

  return (
    <Container size={420} my={40}>
      <Title ta="center" fw={900}>
        Create Account
      </Title>
      <Text c="dimmed" size="sm" ta="center" mt={5}>
        Already have an account?{' '}
        <Anchor size="sm" component="button" onClick={() => navigate('/login')}>
          Sign in
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
              label="Full Name"
              placeholder="Enter your full name"
              required
              {...form.getInputProps('fullName')}
            />

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

            <PasswordInput
              label="Confirm Password"
              placeholder="Confirm your password"
              required
              {...form.getInputProps('confirmPassword')}
            />

            <Button type="submit" fullWidth mt="xl">
              Create Account
            </Button>
          </Stack>
        </form>
      </Paper>
    </Container>
  );
};

export default SignupPage;
