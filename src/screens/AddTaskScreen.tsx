import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useState } from 'react';
import {
  Button,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';

import type { RootStackParamList } from '../types/navigation';
import type { Task } from '../types/task';

type Props = NativeStackScreenProps<RootStackParamList, 'AddTask'> & {
  onAddTask: (task: Task) => void;
};

export function AddTaskScreen({ navigation, onAddTask }: Props) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [error, setError] = useState('');

  function handleSave() {
    const trimmedTitle = title.trim();
    const trimmedDescription = description.trim();

    if (!trimmedTitle || !trimmedDescription) {
      setError('Title and description are required.');
      return;
    }

    const task: Task = {
      id: Date.now().toString(),
      title: trimmedTitle,
      description: trimmedDescription,
      completed: false,
      createdAt: new Date().toISOString(),
    };

    onAddTask(task);
    navigation.navigate('TaskList');
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      style={styles.container}>
      <View style={styles.form}>
        <View style={styles.field}>
          <Text style={styles.label}>Title</Text>
          <TextInput
            autoCapitalize="sentences"
            onChangeText={(value) => {
              setTitle(value);
              setError('');
            }}
            placeholder="Enter task title"
            style={styles.input}
            value={title}
          />
        </View>

        <View style={styles.field}>
          <Text style={styles.label}>Description</Text>
          <TextInput
            multiline
            onChangeText={(value) => {
              setDescription(value);
              setError('');
            }}
            placeholder="Enter task description"
            style={[styles.input, styles.descriptionInput]}
            textAlignVertical="top"
            value={description}
          />
        </View>

        {error ? <Text style={styles.error}>{error}</Text> : null}

        <View style={styles.actions}>
          <Button title="Save Task" onPress={handleSave} />
          <Button title="Cancel" onPress={() => navigation.goBack()} />
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f7f7f8',
    padding: 24,
  },
  form: {
    backgroundColor: '#fff',
    borderColor: '#e6e6ea',
    borderRadius: 8,
    borderWidth: StyleSheet.hairlineWidth,
    gap: 16,
    padding: 20,
  },
  field: {
    gap: 8,
  },
  label: {
    color: '#111827',
    fontSize: 15,
    fontWeight: '700',
  },
  input: {
    borderColor: '#d1d5db',
    borderRadius: 8,
    borderWidth: 1,
    color: '#111827',
    fontSize: 16,
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
  descriptionInput: {
    minHeight: 120,
  },
  error: {
    color: '#b91c1c',
    fontSize: 14,
  },
  actions: {
    gap: 8,
  },
});
