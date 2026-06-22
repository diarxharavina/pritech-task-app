import { Pressable, StyleSheet, Text, View } from 'react-native';

import type { Task } from '../types/task';

type Props = {
  task: Task;
  onPress: () => void;
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

function getShortDescription(description: string) {
  if (description.length <= 90) {
    return description;
  }

  return `${description.slice(0, 87)}...`;
}

export function TaskItem({ task, onPress }: Props) {
  return (
    <Pressable
      accessibilityRole="button"
      onPress={onPress}
      style={({ pressed }) => [styles.container, pressed && styles.pressed]}>
      <View style={styles.header}>
        <Text style={styles.title}>{task.title}</Text>
        <Text style={[styles.status, task.completed ? styles.completed : styles.pending]}>
          {task.completed ? 'Completed' : 'Pending'}
        </Text>
      </View>
      <Text style={styles.description}>{getShortDescription(task.description)}</Text>
      <Text style={styles.date}>Created {formatCreatedDate(task.createdAt)}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    borderColor: '#e6e6ea',
    borderRadius: 8,
    borderWidth: StyleSheet.hairlineWidth,
    gap: 10,
    padding: 16,
  },
  pressed: {
    opacity: 0.72,
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
    fontSize: 17,
    fontWeight: '700',
  },
  description: {
    color: '#4b5563',
    fontSize: 15,
    lineHeight: 20,
  },
  status: {
    borderRadius: 999,
    fontSize: 12,
    fontWeight: '700',
    overflow: 'hidden',
    paddingHorizontal: 9,
    paddingVertical: 4,
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
});
