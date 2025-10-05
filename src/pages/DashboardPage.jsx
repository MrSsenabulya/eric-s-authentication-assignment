import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Paper,
  Title,
  Text,
  Button,
  Stack,
  Avatar,
  Group,
  Divider,
  Alert
} from '@mantine/core';
import { IconLogout, IconUser, IconMail, IconCalendar } from '@tabler/icons-react';
import { useAuth } from '../hooks/useAuth';

const DashboardPage = () => {
  const navigate = useNavigate();
  const { signOut, isSignedIn, user: clerkUser, isLoaded } = useAuth();

  useEffect(() => {
    if (isLoaded && !isSignedIn) {
      navigate('/login');
    }
  }, [isSignedIn, isLoaded, navigate]);

  const handleLogout = async () => {
    try {
      await signOut();
      navigate('/login');
    } catch (err) {
      console.error('Logout error:', err);
      navigate('/login');
    }
  };

  if (!isLoaded) {
    return (
      <Container size="md" my={40}>
        <Text ta="center">Loading...</Text>
      </Container>
    );
  }

  if (!isSignedIn || !clerkUser) {
    return null; // Will redirect to login
  }

  return (
    <Container size="md" my={40}>
      <Title ta="center" fw={900} mb="xl">
        Dashboard
      </Title>

      <Paper withBorder shadow="md" p={30} radius="md">
        <Stack>
          <Alert color="green" title="Welcome back!" icon={<IconUser />}>
            You have successfully logged in!
          </Alert>

          <Group>
            {clerkUser.imageUrl ? (
              <Avatar src={clerkUser.imageUrl} size="lg" radius="xl" />
            ) : (
              <Avatar size="lg" radius="xl" color="blue">
                {clerkUser.fullName?.charAt(0)?.toUpperCase() || clerkUser.emailAddresses[0]?.emailAddress?.charAt(0)?.toUpperCase()}
              </Avatar>
            )}
            
            <div>
              <Title order={3}>{clerkUser.fullName || clerkUser.emailAddresses[0]?.emailAddress}</Title>
              <Text c="dimmed" size="sm">
                Signed in with Clerk
              </Text>
            </div>
          </Group>

          <Divider />

          <Stack gap="sm">
            <Group>
              <IconUser size={16} />
              <Text size="sm">
                <strong>Name:</strong> {clerkUser.fullName || 'Not provided'}
              </Text>
            </Group>

            <Group>
              <IconMail size={16} />
              <Text size="sm">
                <strong>Email:</strong> {clerkUser.emailAddresses[0]?.emailAddress}
              </Text>
            </Group>

            <Group>
              <IconCalendar size={16} />
              <Text size="sm">
                <strong>Member since:</strong> {new Date(clerkUser.createdAt).toLocaleDateString()}
              </Text>
            </Group>

            <Group>
              <Text size="sm" c="dimmed">
                <strong>Provider:</strong> Clerk Authentication
              </Text>
            </Group>
          </Stack>

          <Divider />

          <Button
            variant="outline"
            color="red"
            leftSection={<IconLogout size={16} />}
            onClick={handleLogout}
            fullWidth
          >
            Sign Out
          </Button>
        </Stack>
      </Paper>
    </Container>
  );
};

export default DashboardPage;
