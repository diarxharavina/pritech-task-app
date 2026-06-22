import { Pressable, StyleSheet, Text, View } from 'react-native';

import type { Task } from '../types/task';

type Props = {
  task: Task;
  onPress: () => void;
  onToggle: () => void;
  onDelete: () => void;
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

export function TaskItem({ task, onPress, onToggle, onDelete }: Props) {
  return (
    <View style={[styles.container, task.completed && styles.completedContainer]}>
      <Pressable
        accessibilityRole="button"
        onPress={onPress}
        style={({ pressed }) => [styles.content, pressed && styles.pressed]}>
        <View style={styles.header}>
          <Text style={[styles.title, task.completed && styles.completedTitle]}>{task.title}</Text>
          <Text style={[styles.status, task.completed ? styles.completed : styles.pending]}>
            {task.completed ? 'Completed' : 'Pending'}
          </Text>
        </View>
        <Text style={styles.description}>{getShortDescription(task.description)}</Text>
        <Text style={styles.date}>Created {formatCreatedDate(task.createdAt)}</Text>
      </Pressable>

      <View style={styles.actions}>
        <Pressable
          accessibilityRole="button"
          onPress={onToggle}
          style={({ pressed }) => [styles.actionButton, pressed && styles.pressed]}>
          <Text style={styles.toggleText}>
            {task.completed ? 'Mark Pending' : 'Mark Complete'}
          </Text>
        </Pressable>
        <Pressable
          accessibilityRole="button"
          onPress={onDelete}
          style={({ pressed }) => [styles.actionButton, styles.deleteButton, pressed && styles.pressed]}>
          <Text style={styles.deleteText}>Delete</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    borderColor: '#e6e6ea',
    borderRadius: 8,
    borderWidth: StyleSheet.hairlineWidth,
    overflow: 'hidden',
  },
  completedContainer: {
    backgroundColor: '#f9fafb',
  },
  content: {
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
  completedTitle: {
    color: '#6b7280',
    textDecorationLine: 'line-through',
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
  actions: {
    borderTopColor: '#e6e6ea',
    borderTopWidth: StyleSheet.hairlineWidth,
    flexDirection: 'row',
  },
  actionButton: {
    alignItems: 'center',
    flex: 1,
    paddingHorizontal: 12,
    paddingVertical: 12,
  },
  deleteButton: {
    borderLeftColor: '#e6e6ea',
    borderLeftWidth: StyleSheet.hairlineWidth,
  },
  toggleText: {
    color: '#2563eb',
    fontSize: 14,
    fontWeight: '700',
  },
  deleteText: {
    color: '#b91c1c',
    fontSize: 14,
    fontWeight: '700',
  },
});
