import { Box } from '@/components/common/Layout/Box';
import { Text } from '@/components/common/Text/Text';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useGetPosts } from '@/hooks/useGetPosts';
import Button from '@/components/common/Button';
import { useLogOut } from '@/hooks/useLogOut';
import { Alert, FlatList, View } from 'react-native';
import { useDeletePost } from '@/hooks/useDeletePost';

export default function HomeScreen() {
  const [value, setValue] = useState('Value');
  const { t } = useTranslation();

  const { data: posts, isLoading } = useGetPosts();
  const { mutateAsync: logout } = useLogOut();
  const { mutateAsync: deletePost, isPending: isDeleting } = useDeletePost();

  const handleLogout = async () => {
    try {
      await logout();
      Alert.alert('Logged out successfully');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await deletePost(id);
      Alert.alert('Post deleted');
    } catch (error) {
      Alert.alert('Delete failed', (error as any)?.message || 'Error');
    }
  };

  if (isLoading || !posts) {
    return <Text>Loading...</Text>;
  }

  return (
    <Box flex={1} gap={8} padding={8}>
      <Text>Home Screen</Text>
      <Button text={t('auth.logout')} onPress={handleLogout} />
      <FlatList
        data={posts}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <Box
            flexDirection="row"
            alignItems="center"
            justifyContent="space-between"
            mb={8}
            p={8}
            borderWidth={1}
            borderRadius={8}
          >
            <View style={{ flex: 1 }}>
              <Text fontWeight="bold">{item.title}</Text>
              <Text>{item.content}</Text>
            </View>
            <Button
              text={isDeleting ? 'Deleting...' : 'Delete'}
              onPress={() => handleDelete(item.id)}
              disabled={isDeleting}
              style={{ marginLeft: 8 }}
            />
          </Box>
        )}
        ListEmptyComponent={<Text>No posts found.</Text>}
      />
    </Box>
  );
}
