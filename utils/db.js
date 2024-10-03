import * as SQLite from 'expo-sqlite';


const db =  SQLite.openDatabaseAsync('tasks1.db');
console.log(db, "dsfsdf");
// Open or create the database asynchronously
export const openDatabase = async () => {
  console.log("opfgfgs̄");
  

  return await SQLite.openDatabaseAsync('tasks.db');
};


// Initialize the database with required tables
export const initializeDatabase = async () => {
  console.log("db", "dfdfsff");
  const db = await openDatabase();
  console.log("fdfsfsdfsdf", db);
  await db.execAsync(`
    PRAGMA journal_mode = WAL;
    CREATE TABLE IF NOT EXISTS groups (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL
    );
    CREATE TABLE IF NOT EXISTS tasks (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      groupId INTEGER,
      title TEXT NOT NULL,
      description TEXT,
      dueDate TEXT,
      FOREIGN KEY (groupId) REFERENCES groups(id) ON DELETE CASCADE
    );
  `);
  console.log('Database initialized successfully.');
};

// Insert a new group
export const insertGroup = async (name) => {
  console.log(name);
  const db = await openDatabase();
  console.log("ghghjghgghjghghjg", db);
  const result = await db.runAsync('INSERT INTO groups (name) VALUES (?);', name);
  return result.lastInsertRowId;
};

// Fetch all groups
export const fetchGroups = async () => {
  const db = await openDatabase();
  const groups = await db.getAllAsync('SELECT * FROM groups;');
  return groups;
};

// Insert a new task
export const insertTask = async (groupId, title, description, dueDate) => {
  const db = await openDatabase();
  console.log(groupId, title, description, dueDate);
  const result = await db.runAsync(
    'INSERT INTO tasks (groupId, title, description, dueDate) VALUES (?, ?, ?, ?);',
    groupId, title, description, dueDate
  );
  return result.lastInsertRowId;
};

// Fetch all tasks by group
export const fetchTasksByGroup = async (groupId) => {
  const db = await openDatabase();
  const tasks = await db.getAllAsync('SELECT * FROM tasks WHERE groupId = ?;', groupId);
  return tasks;
};

// Fetch all tasks by group
export const fetchTaskById = async (taskId) => {
  const db = await openDatabase();
  const tasks = await db.getAllAsync('SELECT * FROM tasks WHERE id = ?;', taskId);
  return tasks;
};

// Update a task
export const updateTask = async (id, title, description, dueDate) => {
  const db = await openDatabase();
  console.log("initiate update...");
  await db.runAsync(
    'UPDATE tasks SET title = ?, description = ?, dueDate = ? WHERE id = ?;',
    title, description, dueDate, id
  );
};

// Delete a task
export const deleteTask = async (id) => {
  const db = await openDatabase();
  await db.runAsync('DELETE FROM tasks WHERE id = ?;', id);
};
