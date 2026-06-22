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
    navigation.goBack();
  }

  if (!task) {
    return (
      <View style={styles.container}>
        <View style={styles.card}>
          <Text style={styles.title}>Task not found</Text>
          <Text style={styles.description}>The selected task is no longer available.</Text>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <View style={styles.header}>
          <Text style={styles.title}>{task.title}</Text>

          <Text style={[styles.status, task.completed ? styles.completed : styles.pending]}>
            {task.completed ? 'Completed' : 'Pending'}
          </Text>
        </View>

        <Text style={styles.description}>{task.description}</Text>

        <View style={styles.metaRow}>
          <Text style={styles.date}>Created {formatCreatedDate(task.createdAt)}</Text>
        </View>

        <View style={styles.actions}>
          <Pressable
            accessibilityRole="button"
            onPress={() => onToggleTask(task.id)}
            style={({ pressed }) => [
              styles.actionButton,
              task.completed ? styles.markPendingButton : styles.markCompleteButton,
              pressed && styles.pressed,
            ]}
          >
            <Text
              style={[
                styles.toggleText,
                task.completed ? styles.markPendingText : styles.markCompleteText,
              ]}
            >
              {task.completed ? 'Mark Pending' : 'Mark Complete'}
            </Text>
          </Pressable>

          <Pressable
            accessibilityRole="button"
            onPress={handleDelete}
            style={({ pressed }) => [
              styles.actionButton,
              styles.deleteButton,
              pressed && styles.deleteButtonPressed,
            ]}
          >
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
  header: {
    alignItems: 'flex-start',
    flexDirection: 'row',
    gap: 12,
    justifyContent: 'space-between',
  },
  title: {
    color: '#111827',
    flex: 1,
    fontSize: 24,
    fontWeight: '700',
  },
  description: {
    color: '#4b5563',
    fontSize: 16,
    lineHeight: 22,
  },
  metaRow: {
    flexDirection: 'row',
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
    flexDirection: 'row',
    gap: 10,
    marginTop: 6,
  },
  actionButton: {
    alignItems: 'center',
    borderRadius: 8,
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
  markCompleteButton: {
    backgroundColor: '#dcfce7',
  },
  markPendingButton: {
    backgroundColor: '#fef3c7',
  },
  deleteButton: {
    backgroundColor: '#dc2626',
  },
  deleteButtonPressed: {
    backgroundColor: '#b91c1c',
  },
  pressed: {
    opacity: 0.72,
  },
  toggleText: {
    fontSize: 15,
    fontWeight: '700',
  },
  markCompleteText: {
    color: '#166534',
  },
  markPendingText: {
    color: '#92400e',
  },
  deleteText: {
    color: '#fff',
    fontSize: 15,
    fontWeight: '700',
  },
});