import React, { useEffect, useState } from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import { Appbar, Button, Card, Title } from 'react-native-paper';
import { fetchTasksByGroup } from '../utils/db';

export default function TodoListScreen({ route, navigation }) {
  const { groupId, groupName } = route.params;
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    async function loadTasks() {
      const taskData = await fetchTasksByGroup(groupId);
      setTasks(taskData);
    }
    loadTasks();
  }, [groupId]);

  return (
    <View style={styles.container}>
      <Appbar.Header>
        <Appbar.Content title={`${groupName} Tasks`} />
      </Appbar.Header>
      <Button
        mode="contained"
        onPress={() => navigation.navigate('TaskCreation', { groupId })}
        style={styles.addButton}
      >
        Add Task
      </Button>
      <FlatList
        data={tasks}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <Card style={styles.card} onPress={() => navigation.navigate('TaskDetail', { taskId: item.id })}>
            <Card.Content>
              <Title>{item.title}</Title>
            </Card.Content>
          </Card>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  addButton: {
    marginBottom: 20,
  },
  card: {
    marginBottom: 10,
    backgroundColor: '#fff',
  },
});
