import React, { useEffect, useState } from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import { TextInput, Button, Card, Title, Snackbar } from 'react-native-paper';
import { initializeDatabase, fetchGroups, insertGroup } from '../utils/db';

export default function HomeScreen({ navigation }) {
  const [groups, setGroups] = useState([]);
  const [groupName, setGroupName] = useState('');
  const [snackbarVisible, setSnackbarVisible] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');

  useEffect(() => {
    async function setupDB() {
      await initializeDatabase();
      const groupData = await fetchGroups();
      setGroups(groupData);
    }
    setupDB();
  }, []);

  const addGroup = async () => {
    if (groupName.trim() !== '') {
      await insertGroup(groupName);
      const updatedGroups = await fetchGroups();
      setGroups(updatedGroups);
      setGroupName('');
      setSnackbarMessage('Group added successfully!');
      setSnackbarVisible(true);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        label="Enter group name"
        value={groupName}
        onChangeText={setGroupName}
        style={styles.input}
        mode="outlined"
      />
      <Button mode="contained" onPress={addGroup} style={styles.button}>
        Add Group
      </Button>
      <FlatList
        data={groups}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <Card style={styles.card} onPress={() => navigation.navigate('TodoList', { groupId: item.id, groupName: item.name })}>
            <Card.Content>
              <Title>{item.name}</Title>
            </Card.Content>
          </Card>
        )}
      />
      <Snackbar
        visible={snackbarVisible}
        onDismiss={() => setSnackbarVisible(false)}
        duration={3000}
      >
        {snackbarMessage}
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
    marginBottom: 20,
  },
  card: {
    marginBottom: 10,
    backgroundColor: '#fff',
  },
});
