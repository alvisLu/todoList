import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  Typography,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField,
  IconButton,
  Button,
} from '@material-ui/core';
import { Delete, Done, Clear } from '@material-ui/icons';
import Grid from '@material-ui/core/Grid';
import Card from './Card';

const useStyles = makeStyles((theme) => ({
  todo: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
    textAlign: 'center',
  },
  addTextField: {
    width: 450,
    margin: theme.spacing(1),
  },
  table: {
    minWidth: 500,
  },
  buttonMargin: {
    margin: theme.spacing(1.8),
  },
  padding: {
    padding: 20,
  },
}));

function TodoList({ completed, todos, toggleTodo, toggleIcon, removeTodo }) {
  const todoList = todos.map((todo, index) => {
    return (
      todo.isCompleted === completed && (
        <TableRow key={index}>
          <TableCell component="th" scope="row">
            <IconButton
              onClick={() => {
                toggleTodo(index);
              }}>
              {toggleIcon}
            </IconButton>
            <IconButton
              onClick={() => {
                removeTodo(index);
              }}>
              <Delete />
            </IconButton>
            <span
              className="todo"
              style={{
                textDecoration: todo.isCompleted ? 'line-through' : '',
              }}>
              {todo.text}
            </span>
          </TableCell>
        </TableRow>
      )
    );
  });
  return todoList;
}

function TodoContainer({ type, addTodo, clearAll, children }) {
  const classes = useStyles();
  return (
    <div>
      {type === 'TODO' ? (
        <TodoFrom addTodo={addTodo} />
      ) : (
        <TodoClear clearAll={clearAll} />
      )}
      <Table className={classes.table} size="small">
        <TableHead>
          <TableRow>
            <TableCell>
              <h1 align="center">{type}</h1>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>{children}</TableBody>
      </Table>
    </div>
  );
}

function TodoFrom({ addTodo }) {
  const classes = useStyles();
  const [value, setValue] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!value) return;
    addTodo(value);
    setValue('');
  };

  return (
    <div className="todo-from">
      <form onSubmit={handleSubmit}>
        <TextField
          id="add-todo"
          className={classes.addTextField}
          label="Add Todo..."
          variant="outlined"
          value={value}
          onChange={(evt) => setValue(evt.target.value)}
        />
      </form>
    </div>
  );
}

function TodoClear({ clearAll }) {
  const classes = useStyles();

  return (
    <Button
      variant="contained"
      color="primary"
      className={classes.buttonMargin}
      size="large"
      endIcon={<Delete />}
      onClick={clearAll}>
      Clear All
    </Button>
  );
}

function Todo() {
  const classes = useStyles();
  const [type] = useState({ todo: `TODO`, complete: `Complete` });
  const [todos, setTodos] = useState([
    { text: `Learn about React`, isCompleted: false },
    { text: `TODO 1`, isCompleted: false },
    { text: `TODO 2`, isCompleted: true },
    { text: `TODO 3`, isCompleted: true },
  ]);

  const addTodo = (text) => {
    const newTodos = [...todos, { text, isCompleted: false }];
    setTodos(newTodos);
  };

  const toggleTodo = (index) => {
    const newTodos = [...todos];
    newTodos[index].isCompleted = !newTodos[index].isCompleted;
    setTodos(newTodos);
  };

  const removeTodo = (index) => {
    let newTodos = [...todos];
    newTodos.splice(index, 1);
    setTodos(newTodos);
  };

  const clearAll = () => {
    let newTodos = todos.filter((item) => {
      return !item.isCompleted;
    });
    setTodos(newTodos);
  };

  return (
    <div className={classes.padding}>
      <Typography
        className={classes.padding}
        color="primary"
        variant="h2"
        align="center">
        Todo List of React Hook
      </Typography>
      <Grid
        className={classes.padding}
        container={true}
        justify="space-evenly"
        alignItems="flex-start">
        <Card>
          <TodoContainer type={type.todo} addTodo={addTodo}>
            <TodoList
              completed={false}
              todos={todos}
              toggleTodo={toggleTodo}
              toggleIcon={<Done />}
              removeTodo={removeTodo}
            />
          </TodoContainer>
        </Card>
        <Card>
          <TodoContainer type={type.complete} clearAll={clearAll}>
            <TodoList
              completed={true}
              todos={todos}
              toggleTodo={toggleTodo}
              toggleIcon={<Clear />}
              removeTodo={removeTodo}
            />
          </TodoContainer>
        </Card>
      </Grid>
    </div>
  );
}

export default Todo;
