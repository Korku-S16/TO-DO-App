import React, { useEffect, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Appbar, Button, Text, Card, Title, Paragraph, Snackbar } from 'react-native-paper';
import { fetchTaskById, deleteTask } from '../utils/db';
import { MaterialIcons } from '@expo/vector-icons';

export default function TaskDetailScreen({ route, navigation }) {
  const { taskId } = route.params;
  const [task, setTask] = useState(null);
  const [snackbarVisible, setSnackbarVisible] = useState(false);

  useEffect(() => {
    async function loadTask() {
      const taskData = await fetchTaskById(taskId);
      setTask(taskData);
    }
    loadTask();
  }, [taskId]);

  const removeTask = async () => {
    await deleteTask(taskId);
    setSnackbarVisible(true);
  };

  if (!task) {
    return <Text>Loading...</Text>;
  }

  return (
    <View style={styles.container}>
      <Appbar.Header>
        <Appbar.Content title="Task Details" />
      </Appbar.Header>
      <Card style={styles.card}>
        <Card.Content>
          <View style={styles.cardHeader}>
            <Title>{task[0].title}</Title>
            <MaterialIcons 
              name="edit" 
              size={24} 
              color="blue" 
              onPress={() => navigation.navigate('TaskCreation', { 
                groupId: task[0].groupId, 
                task: task[0] 
              })} 
              style={styles.editIcon} 
            />
          </View>
          <Paragraph style={styles.description}>Description: {task[0].description}</Paragraph>
          <Paragraph>Due Date: {task[0].dueDate}</Paragraph>
        </Card.Content>
      </Card>
      <Button
        mode="contained"
        onPress={removeTask}
        style={styles.deleteButton}
      >
        Delete Task
      </Button>
      <Snackbar
        visible={snackbarVisible}
        onDismiss={() => {
          setSnackbarVisible(false);
          navigation.goBack();
        }}
        duration={3000}
      >
        Task deleted successfully!
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
  card: {
    marginBottom: 20,
    backgroundColor: '#fff',
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  editIcon: {
    marginLeft: 10,
  },
  description: {
    marginVertical: 10,
  },
  deleteButton: {
    marginTop: 20,
  },
});
