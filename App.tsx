import { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { AddTaskScreen } from './src/screens/AddTaskScreen';
import { TaskDetailsScreen } from './src/screens/TaskDetailsScreen';
import { TaskListScreen } from './src/screens/TaskListScreen';
import type { RootStackParamList } from './src/types/navigation';
import type { Task } from './src/types/task';

const Stack = createNativeStackNavigator<RootStackParamList>();

const initialTasks: Task[] = [
  {
    id: '1',
    title: 'Review project setup',
    description: 'Confirm the app structure and navigation foundation before adding task features.',
    completed: true,
    createdAt: '2026-06-20T09:00:00.000Z',
  },
  {
    id: '2',
    title: 'Build task list UI',
    description: 'Render task cards with status, created date, and navigation to the details screen.',
    completed: false,
    createdAt: '2026-06-22T11:30:00.000Z',
  },
];

export default function App() {
  const [tasks, setTasks] = useState<Task[]>(initialTasks);

  function addTask(task: Task) {
    setTasks((currentTasks) => [task, ...currentTasks]);
  }

  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="TaskList">
          <Stack.Screen name="TaskList" options={{ title: 'Tasks' }}>
            {(props) => <TaskListScreen {...props} tasks={tasks} />}
          </Stack.Screen>
          <Stack.Screen name="AddTask" options={{ title: 'Add Task' }}>
            {(props) => <AddTaskScreen {...props} onAddTask={addTask} />}
          </Stack.Screen>
          <Stack.Screen name="TaskDetails" options={{ title: 'Task Details' }}>
            {(props) => <TaskDetailsScreen {...props} tasks={tasks} />}
          </Stack.Screen>
        </Stack.Navigator>
      </NavigationContainer>
      <StatusBar style="auto" />
    </SafeAreaProvider>
  );
}
