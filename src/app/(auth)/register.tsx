import React from 'react';
import { useForm } from 'react-hook-form';
import { useRouter } from 'expo-router';
import { Alert, Button, StyleSheet } from 'react-native';
import { useTheme } from '@react-navigation/native';

import { Box } from '@/components/common/Layout/Box';
import { Text } from '@/components/common/Text/Text';
import Input from '@/components/common/TextField/Input';
import { useSignUp } from '@/hooks/useSignUp';
import { useCreateUser } from '@/hooks/useCreateUser';

type RegisterForm = {
  email: string;
  password: string;
};

export default function Register() {
  const router = useRouter();
  const { colors } = useTheme();
  const { mutateAsync: signUp } = useSignUp();
  const { mutateAsync: createUser } = useCreateUser();

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitted },
  } = useForm<RegisterForm>({
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const [isLoading, setIsLoading] = React.useState(false);

  const onRegister = async (data: { email: string; password: string }) => {
    if (isLoading) return;
    setIsLoading(true);
    try {
      const { email, password } = data;

      await signUp({
        email,
        password,
      });

      await createUser({
        email,
        name: email.split('@')[0],
      });
    } catch (error: any) {
      Alert.alert('Error!', error.message || 'An error occurred.');
    } finally {
      setIsLoading(false);
    }
  };

  const onLogin = () => {
    router.navigate('/(auth)/login');
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
            Hi he he he!
          </Text>
        </Box>
        <Input
          control={control}
          name="email"
          placeholder="Email"
          rules={{
            required: 'Email is required!',
          }}
          isSubmitted={isSubmitted}
          errors={errors}
        />
        <Input
          control={control}
          name="password"
          placeholder="Password"
          rules={{ required: 'Password is required!' }}
          isSubmitted={isSubmitted}
          errors={errors}
          showPass
        />
        <Button title="Register" onPress={handleSubmit(onRegister)} />
        <Box alignItems="center" onPress={onLogin}>
          <Text fontSize={14} color={colors.primary} fontWeight="bold">
            Already have account? Login
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
