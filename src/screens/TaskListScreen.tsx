import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Button, StyleSheet, Text, View } from 'react-native';

import type { RootStackParamList } from '../types/navigation';

type Props = NativeStackScreenProps<RootStackParamList, 'TaskList'>;

export function TaskListScreen({ navigation }: Props) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Task List</Text>
      <Text style={styles.description}>Your tasks will appear here.</Text>
      <Button title="Add Task" onPress={() => navigation.navigate('AddTask')} />
      <Button title="View Task Details" onPress={() => navigation.navigate('TaskDetails')} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
    padding: 24,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
  },
  description: {
    color: '#555',
    fontSize: 16,
    textAlign: 'center',
  },
});
