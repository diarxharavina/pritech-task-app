import { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { AddTaskScreen } from './src/screens/AddTaskScreen';
import { TaskDetailsScreen } from './src/screens/TaskDetailsScreen';
import { TaskListScreen } from './src/screens/TaskListScreen';
import { getStoredTasks, saveStoredTasks } from './src/storage/taskStorage';
import type { RootStackParamList } from './src/types/navigation';
import type { Task } from './src/types/task';

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isLoadingTasks, setIsLoadingTasks] = useState(true);
  const [hasLoadedTasks, setHasLoadedTasks] = useState(false);

  useEffect(() => {
    let isMounted = true;

    async function loadTasks() {
      try {
        const storedTasks = await getStoredTasks();

        if (isMounted) {
          setTasks(storedTasks);
        }
      } catch (error) {
        console.error('Failed to load tasks from storage:', error);
      } finally {
        if (isMounted) {
          setIsLoadingTasks(false);
          setHasLoadedTasks(true);
        }
      }
    }

    loadTasks();

    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    if (!hasLoadedTasks) {
      return;
    }

    saveStoredTasks(tasks).catch((error) => {
      console.error('Failed to save tasks to storage:', error);
    });
  }, [hasLoadedTasks, tasks]);

  function addTask(task: Task) {
    setTasks((currentTasks) => [task, ...currentTasks]);
  }

  function toggleTask(taskId: string) {
    setTasks((currentTasks) =>
      currentTasks.map((task) =>
        task.id === taskId ? { ...task, completed: !task.completed } : task
      )
    );
  }

  function deleteTask(taskId: string) {
    setTasks((currentTasks) => currentTasks.filter((task) => task.id !== taskId));
  }

  if (isLoadingTasks) {
    return (
      <SafeAreaProvider>
        <View style={styles.loadingContainer}>
          <ActivityIndicator />
          <Text style={styles.loadingText}>Loading tasks...</Text>
        </View>
        <StatusBar style="auto" />
      </SafeAreaProvider>
    );
  }

  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="TaskList">
          <Stack.Screen name="TaskList" options={{ title: 'Tasks' }}>
            {(props) => (
              <TaskListScreen
                {...props}
                tasks={tasks}
                onToggleTask={toggleTask}
                onDeleteTask={deleteTask}
              />
            )}
          </Stack.Screen>
          <Stack.Screen name="AddTask" options={{ title: 'Add Task' }}>
            {(props) => <AddTaskScreen {...props} onAddTask={addTask} />}
          </Stack.Screen>
          <Stack.Screen name="TaskDetails" options={{ title: 'Task Details' }}>
            {(props) => (
              <TaskDetailsScreen
                {...props}
                tasks={tasks}
                onToggleTask={toggleTask}
                onDeleteTask={deleteTask}
              />
            )}
          </Stack.Screen>
        </Stack.Navigator>
      </NavigationContainer>
      <StatusBar style="auto" />
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    alignItems: 'center',
    backgroundColor: '#f7f7f8',
    flex: 1,
    gap: 12,
    justifyContent: 'center',
    padding: 24,
  },
  loadingText: {
    color: '#4b5563',
    fontSize: 16,
  },
});
