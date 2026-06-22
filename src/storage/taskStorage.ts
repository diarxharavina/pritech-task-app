import AsyncStorage from '@react-native-async-storage/async-storage';

import type { Task } from '../types/task';

const TASKS_STORAGE_KEY = '@pritech-task-app/tasks';

export async function getStoredTasks(): Promise<Task[]> {
  const storedTasks = await AsyncStorage.getItem(TASKS_STORAGE_KEY);

  if (!storedTasks) {
    return [];
  }

  return JSON.parse(storedTasks) as Task[];
}

export async function saveStoredTasks(tasks: Task[]): Promise<void> {
  await AsyncStorage.setItem(TASKS_STORAGE_KEY, JSON.stringify(tasks));
}
