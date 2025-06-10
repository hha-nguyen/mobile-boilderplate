import React from 'react';
import { useForm } from 'react-hook-form';
import { useRouter } from 'expo-router';
import { Alert, Button, StyleSheet, TextInput } from 'react-native';
import { useTheme } from '@react-navigation/native';

import { Box } from '@/components/common/Layout/Box';
import { Text } from '@/components/common/Text/Text';
import Input from '@/components/common/TextField/Input';
import { useSignIn } from '@/hooks/useSignIn';

type LoginForm = {
  email: string;
  password: string;
};

export default function Login() {
  const router = useRouter();
  const { colors } = useTheme();
  const { mutateAsync: signIn } = useSignIn();

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitted },
  } = useForm<LoginForm>({
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const [isLoading, setIsLoading] = React.useState(false);

  const onLogin = async (data: { email: string; password: string }) => {
    if (isLoading) return;
    setIsLoading(true);
    try {
      const { email, password } = data;

      await signIn({
        email,
        password,
      });
    } catch (error: any) {
      Alert.alert('Error!', error.message || 'An error occurred.');
    } finally {
      setIsLoading(false);
    }
  };

  const onRegister = () => {
    router.navigate('/(auth)/register');
  };

  return (
    <Box flex={1} bgColor={colors.background} justifyContent="center" px={24}>
      <Box
        p={24}
        borderWidth={1}
        borderRadius={10}
        borderColor={colors.border}
        bgColor={colors.background}
        style={styles.formContainer}
      >
        <Box alignItems="center" mb={24}>
          <Text fontSize={28} color={colors.primary} fontWeight="bold">
            Welcome back
          </Text>
        </Box>
        <Input control={control} name={'email'} as={TextInput} />
        <Input control={control} name={'password'} as={TextInput} />
        <Button title="Login" onPress={handleSubmit(onLogin)} />
        <Box alignItems="center" onPress={onRegister}>
          <Text fontSize={14} color={colors.primary} fontWeight="bold">
            Need an account? Register
          </Text>
        </Box>
      </Box>
    </Box>
  );
}

const styles = StyleSheet.create({
  containerButton: {
    flex: 0,
    marginTop: 24,
  },
  formContainer: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
});
