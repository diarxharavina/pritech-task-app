import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import type { RootStackParamList } from '../types/navigation';
import type { Task } from '../types/task';

type Props = NativeStackScreenProps<RootStackParamList, 'TaskDetails'> & {
  tasks: Task[];
  onToggleTask: (taskId: string) => void;
  onDeleteTask: (taskId: string) => void;
};

function formatCreatedDate(createdAt: string) {
  const date = new Date(createdAt);

  if (Number.isNaN(date.getTime())) {
    return createdAt;
  }

  return date.toLocaleDateString(undefined, {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
}

export function TaskDetailsScreen({ navigation, route, tasks, onToggleTask, onDeleteTask }: Props) {
  const { taskId } = route.params;
  const task = tasks.find((item) => item.id === taskId);

  function handleDelete() {
    onDeleteTask(taskId);
    navigation.navigate('TaskList');
  }

  if (!task) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Task not found</Text>
        <Text style={styles.description}>The selected task is no longer available.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>{task.title}</Text>
        <Text style={styles.description}>{task.description}</Text>
        <View style={styles.metaRow}>
          <Text style={[styles.status, task.completed ? styles.completed : styles.pending]}>
            {task.completed ? 'Completed' : 'Pending'}
          </Text>
          <Text style={styles.date}>Created {formatCreatedDate(task.createdAt)}</Text>
        </View>

        <View style={styles.actions}>
          <Pressable
            accessibilityRole="button"
            onPress={() => onToggleTask(task.id)}
            style={({ pressed }) => [styles.button, pressed && styles.pressed]}>
            <Text style={styles.toggleText}>
              {task.completed ? 'Mark Pending' : 'Mark Complete'}
            </Text>
          </Pressable>
          <Pressable
            accessibilityRole="button"
            onPress={handleDelete}
            style={({ pressed }) => [styles.button, styles.deleteButton, pressed && styles.pressed]}>
            <Text style={styles.deleteText}>Delete Task</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f7f7f8',
    padding: 24,
  },
  card: {
    backgroundColor: '#fff',
    borderColor: '#e6e6ea',
    borderRadius: 8,
    borderWidth: StyleSheet.hairlineWidth,
    gap: 14,
    padding: 20,
  },
  title: {
    color: '#111827',
    fontSize: 24,
    fontWeight: '700',
  },
  description: {
    color: '#4b5563',
    fontSize: 16,
    lineHeight: 22,
  },
  metaRow: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: 12,
    justifyContent: 'space-between',
  },
  status: {
    borderRadius: 999,
    fontSize: 13,
    fontWeight: '700',
    overflow: 'hidden',
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  completed: {
    backgroundColor: '#dcfce7',
    color: '#166534',
  },
  pending: {
    backgroundColor: '#fef3c7',
    color: '#92400e',
  },
  date: {
    color: '#6b7280',
    fontSize: 13,
  },
  actions: {
    gap: 10,
    marginTop: 6,
  },
  button: {
    alignItems: 'center',
    borderColor: '#d1d5db',
    borderRadius: 8,
    borderWidth: 1,
    paddingHorizontal: 14,
    paddingVertical: 12,
  },
  deleteButton: {
    borderColor: '#fecaca',
  },
  pressed: {
    opacity: 0.72,
  },
  toggleText: {
    color: '#2563eb',
    fontSize: 15,
    fontWeight: '700',
  },
  deleteText: {
    color: '#b91c1c',
    fontSize: 15,
    fontWeight: '700',
  },
});
