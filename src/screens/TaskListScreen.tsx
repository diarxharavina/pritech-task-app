import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Button, FlatList, StyleSheet, Text, View } from 'react-native';

import { EmptyState } from '../components/EmptyState';
import { TaskItem } from '../components/TaskItem';
import type { RootStackParamList } from '../types/navigation';
import type { Task } from '../types/task';

type Props = NativeStackScreenProps<RootStackParamList, 'TaskList'> & {
  tasks: Task[];
};

export function TaskListScreen({ navigation, tasks }: Props) {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerText}>
          <Text style={styles.title}>Tasks</Text>
          <Text style={styles.description}>{tasks.length} task{tasks.length === 1 ? '' : 's'}</Text>
        </View>
        <Button title="Add" onPress={() => navigation.navigate('AddTask')} />
      </View>

      <FlatList
        data={tasks}
        keyExtractor={(task) => task.id}
        contentContainerStyle={tasks.length === 0 ? styles.emptyList : styles.list}
        renderItem={({ item }) => (
          <TaskItem
            task={item}
            onPress={() => navigation.navigate('TaskDetails', { taskId: item.id })}
          />
        )}
        ListEmptyComponent={
          <EmptyState
            title="No tasks yet"
            message="Add your first task to start tracking your work."
          />
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f7f7f8',
  },
  header: {
    alignItems: 'center',
    backgroundColor: '#fff',
    borderBottomColor: '#e6e6ea',
    borderBottomWidth: StyleSheet.hairlineWidth,
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 24,
  },
  headerText: {
    gap: 4,
  },
  list: {
    gap: 12,
    padding: 16,
  },
  emptyList: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: 24,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
  },
  description: {
    color: '#555',
    fontSize: 15,
  },
});
