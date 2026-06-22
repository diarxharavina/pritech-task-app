import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useEffect, useMemo, useState } from 'react';
import { FlatList, Pressable, StyleSheet, Text, TextInput, View } from 'react-native';

import { EmptyState } from '../components/EmptyState';
import { TaskItem } from '../components/TaskItem';
import type { RootStackParamList } from '../types/navigation';
import { Quote } from '../types/Quote';
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

  const [quote, setQuote] = useState<Quote | null>(null);
  const [quoteLoading, setQuoteLoading] = useState(true);
  const [quoteError, setQuoteError] = useState(false);

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

  useEffect(() => {
  const fetchQuote = async () => {
    try {
      setQuoteLoading(true);
      setQuoteError(false);

      const zenResponse = await fetch('https://zenquotes.io/api/random');

      if (zenResponse.ok) {
        const zenData: Quote[] = await zenResponse.json();

        if (zenData.length > 0) {
          setQuote(zenData[0]);
          return;
        }
      }

      const backupResponse = await fetch('https://dummyjson.com/quotes/random');

      if (!backupResponse.ok) {
        throw new Error('Failed to fetch quote from backup API');
      }

      const backupData = await backupResponse.json();

      setQuote({
        q: backupData.quote,
        a: backupData.author,
      });
    } catch (error) {
      console.warn('Quote fetch failed:', error);
      setQuoteError(true);
    } finally {
      setQuoteLoading(false);
    }
  };

  fetchQuote();
}, []);

  return (
    <View style={styles.container}>
      <View style={styles.quoteCard}>
        {quoteLoading ? (
          <Text style={styles.quoteText}>Loading quote...</Text>
        ) : quoteError || !quote ? (
          <Text style={styles.quoteText}>Stay focused and complete your tasks.</Text>
        ) : (
          <>
            <Text style={styles.quoteText}>"{quote.q}"</Text>
            <Text style={styles.quoteAuthor}>- {quote.a}</Text>
          </>
        )}
      </View>

      <View style={styles.controls}>
        <TextInput
          autoCapitalize="none"
          autoCorrect={false}
          onChangeText={setSearchText}
          placeholder="Search by title"
          placeholderTextColor="#838383"
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
                ]}
              >
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
        ListFooterComponent={
          <Pressable
            accessibilityRole="button"
            onPress={() => navigation.navigate('AddTask')}
            style={({ pressed }) => [styles.addButton, pressed && styles.pressed]}
          >
            <Text style={styles.addButtonText}>+</Text>
          </Pressable>
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
  quoteCard: {
    backgroundColor: '#f2f4f7',
    borderRadius: 12,
    padding: 16,
  },
  quoteText: {
    color: '#333',
    fontSize: 14,
    lineHeight: 20,
  },
  quoteAuthor: {
    color: '#666',
    fontSize: 13,
    marginTop: 8,
    textAlign: 'right',
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
  addButton: {
    alignItems: 'center',
    alignSelf: 'center',
    backgroundColor: '#2563eb',
    borderRadius: 999,
    height: 52,
    justifyContent: 'center',
    marginTop: 8,
    width: 52,
  },
  addButtonText: {
    color: '#fff',
    fontSize: 30,
    fontWeight: '700',
    lineHeight: 32,
  },
});