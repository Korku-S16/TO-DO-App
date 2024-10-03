import React, { useEffect, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { TextInput, Button, Snackbar } from 'react-native-paper';
import { insertTask, updateTask } from '../utils/db';

export default function TaskCreationScreen({ route, navigation }) {
  const { groupId, task } = route.params; // Get task from params
  const [title, setTitle] = useState(task ? task.title : '');
  const [description, setDescription] = useState(task ? task.description : '');
  const [dueDate, setDueDate] = useState(task ? task.dueDate : '');
  const [snackbarVisible, setSnackbarVisible] = useState(false);

  const saveTask = async () => {
    if (title.trim() === '' || description.trim() === '' || dueDate.trim() === '') {
      setSnackbarVisible(true);
      return;
    }

    if (task) {
      // Update existing task
      await updateTask(task.id, title, description, dueDate);
    } else {
      // Insert new task
      await insertTask(groupId, title, description, dueDate);
    }
    
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <TextInput
        label="Task Title"
        value={title}
        onChangeText={setTitle}
        mode="outlined"
        style={styles.input}
      />
      <TextInput
        label="Task Description"
        value={description}
        onChangeText={setDescription}
        mode="outlined"
        multiline
        style={styles.input}
      />
      <TextInput
        label="Due Date (YYYY-MM-DD)"
        value={dueDate}
        onChangeText={setDueDate}
        mode="outlined"
        style={styles.input}
      />
      <Button
        mode="contained"
        onPress={saveTask}
        style={styles.button}
      >
        {task ? 'Update Task' : 'Save Task'}
      </Button>
      <Snackbar
        visible={snackbarVisible}
        onDismiss={() => setSnackbarVisible(false)}
        duration={3000}
      >
        Please fill out all fields.
      </Snackbar>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  input: {
    marginBottom: 10,
  },
  button: {
    marginTop: 20,
  },
});
