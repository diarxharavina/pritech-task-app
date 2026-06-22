import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useMemo, useState } from 'react';
import { Button, FlatList, Pressable, StyleSheet, Text, TextInput, View } from 'react-native';

import { EmptyState } from '../components/EmptyState';
import { TaskItem } from '../components/TaskItem';
import type { RootStackParamList } from '../types/navigation';
import type { Task } from '../types/task';

type Props = NativeStackScreenProps<RootStackParamList, 'TaskList'> & {
  tasks: Task[];
  onToggleTask: (taskId: string) => void;
  onDeleteTask: (taskId: string) => void;
};

type StatusFilter = 'all' | 'completed' | 'pending';

const statusFilters: { label: string; value: StatusFilter }[] = [
  { label: 'All', value: 'all' },
  { label: 'Completed', value: 'completed' },
  { label: 'Pending', value: 'pending' },
];

export function TaskListScreen({ navigation, tasks, onToggleTask, onDeleteTask }: Props) {
  const [searchText, setSearchText] = useState('');
  const [statusFilter, setStatusFilter] = useState<StatusFilter>('all');

  const filteredTasks = useMemo(() => {
    const normalizedSearch = searchText.trim().toLowerCase();

    return tasks.filter((task) => {
      const matchesSearch = task.title.toLowerCase().includes(normalizedSearch);
      const matchesStatus =
        statusFilter === 'all' ||
        (statusFilter === 'completed' && task.completed) ||
        (statusFilter === 'pending' && !task.completed);

      return matchesSearch && matchesStatus;
    });
  }, [searchText, statusFilter, tasks]);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerText}>
          <Text style={styles.title}>Tasks</Text>
          <Text style={styles.description}>{tasks.length} task{tasks.length === 1 ? '' : 's'}</Text>
        </View>
        <Button title="Add Task" onPress={() => navigation.navigate('AddTask')} />
      </View>

      <View style={styles.controls}>
        <TextInput
          autoCapitalize="none"
          autoCorrect={false}
          onChangeText={setSearchText}
          placeholder="Search by title"
          style={styles.searchInput}
          value={searchText}
        />
        <View style={styles.filters}>
          {statusFilters.map((filter) => {
            const isSelected = statusFilter === filter.value;

            return (
              <Pressable
                accessibilityRole="button"
                key={filter.value}
                onPress={() => setStatusFilter(filter.value)}
                style={({ pressed }) => [
                  styles.filterButton,
                  isSelected && styles.selectedFilterButton,
                  pressed && styles.pressed,
                ]}>
                <Text style={[styles.filterText, isSelected && styles.selectedFilterText]}>
                  {filter.label}
                </Text>
              </Pressable>
            );
          })}
        </View>
      </View>

      <FlatList
        data={filteredTasks}
        keyExtractor={(task) => task.id}
        contentContainerStyle={filteredTasks.length === 0 ? styles.emptyList : styles.list}
        renderItem={({ item }) => (
          <TaskItem
            task={item}
            onPress={() => navigation.navigate('TaskDetails', { taskId: item.id })}
            onToggle={() => onToggleTask(item.id)}
            onDelete={() => onDeleteTask(item.id)}
          />
        )}
        ListEmptyComponent={
          <EmptyState
            title={tasks.length === 0 ? 'No tasks yet' : 'No matching tasks found'}
            message={
              tasks.length === 0
                ? 'Add your first task to start tracking your work.'
                : 'Try a different search or filter.'
            }
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
  controls: {
    backgroundColor: '#fff',
    borderBottomColor: '#e6e6ea',
    borderBottomWidth: StyleSheet.hairlineWidth,
    gap: 12,
    padding: 16,
  },
  searchInput: {
    borderColor: '#d1d5db',
    borderRadius: 8,
    borderWidth: 1,
    color: '#111827',
    fontSize: 16,
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
  filters: {
    flexDirection: 'row',
    gap: 8,
  },
  filterButton: {
    alignItems: 'center',
    borderColor: '#d1d5db',
    borderRadius: 8,
    borderWidth: 1,
    flex: 1,
    paddingHorizontal: 10,
    paddingVertical: 9,
  },
  selectedFilterButton: {
    backgroundColor: '#2563eb',
    borderColor: '#2563eb',
  },
  pressed: {
    opacity: 0.72,
  },
  filterText: {
    color: '#374151',
    fontSize: 14,
    fontWeight: '700',
  },
  selectedFilterText: {
    color: '#fff',
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
