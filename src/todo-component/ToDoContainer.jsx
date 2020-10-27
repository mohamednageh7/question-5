import React, { useState } from 'react';
import TaskDataViews from './TaskDataViews';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';
import FormControl from '@material-ui/core/FormControl';
import Link from '@material-ui/core/Link';

const useStyles = makeStyles((theme) => ({
  title: {
    fontWeight: 700,
  },
}));

const createData = (task, done) => {
  return { task, done };
};

const ToDoContainer = () => {
  const classes = useStyles();
  const [todos, setTodos] = useState([
    createData('playing', false),
    createData('study', false),
    createData('watch moves', false),
    createData('go with friend', false),
    createData('talk to familt', false),
    createData('go to school', false),
  ]);

  const [inputValue, setInputValue] = useState('');
  const [inactiveItem, setInactiveItem] = useState(null);
  const [completed, setCompleted] = useState([]);
  const [viewAll, setViewAll] = useState(false);
  const [viewActive, setViewActive] = useState(false);
  const [viewCompleted, setViewCompleted] = useState(false);

  const showActive = () => {
    return inactiveItem === null ? todos.length : inactiveItem.length;
  };
  const handleInput = (e) => {
    setInputValue(e.target.value);
  };
  const handleAddTask = (e) => {
    if (e.keyCode === 13) {
      let newTodo = [...todos];
      setTodos([{ task: inputValue, done: false }, ...newTodo]);
      setInputValue('');
    }
  };
  const handleViewAll = () => {
    setViewAll(!viewAll);
    setViewActive(false);
    setViewCompleted(false);
  };

  const handleViewActive = () => {
    setViewAll(false);
    setViewActive(!viewActive);
    setViewCompleted(false);
  };

  const handleViewCompleted = () => {
    setViewAll(false);
    setViewActive(false);
    setViewCompleted(!viewCompleted);
  };
  const handleClearCompleted = () => {
    let newTodos = [...todos];
    newTodos = newTodos.filter((item) => item.done === false);
    setTodos([...newTodos]);
    setCompleted([]);
  };
  return (
    <Grid container alignItems='center' direction='column'>
      <Grid item>
        <Typography
          variant='h1'
          component='h2'
          color='secondary'
          className={classes.title}
          gutterBottom
        >
          todos
        </Typography>
      </Grid>
      <Grid item lg>
        <Grid container direction='column' alignItems='center'>
          <Grid item sm style={{ marginBottom: '2em' }}>
            <FormControl fullWidth className={classes.margin}>
              <Input
                id='todo-add'
                placeholder='Enter new todo...'
                value={inputValue}
                onChange={(e) => handleInput(e)}
                onKeyDown={(e) => handleAddTask(e)}
                style={{
                  width: '45em',
                  borderColor: '#ccc',
                }}
              />
            </FormControl>
          </Grid>
          <Grid item sm>
            {(viewAll
              ? todos
              : viewActive
              ? inactiveItem
              : viewCompleted
              ? completed
              : todos
            ).map((todo, index) => (
              <TaskDataViews
                key={`${todo} ${index}`}
                todo={todo}
                todos={todos}
                setTodos={setTodos}
                inactiveItem={inactiveItem}
                setInactiveItem={setInactiveItem}
                completed={completed}
                setCompleted={setCompleted}
              />
            ))}
          </Grid>
          <Grid item sm style={{ width: '45em', marginTop: '2em' }}>
            <Grid container>
              <Grid item sm={3}>
                {showActive()} items left
              </Grid>
              <Grid item sm={4}>
                <Grid container spacing={2}>
                  <Grid item>
                    <Link
                      component='button'
                      variant='body2'
                      onClick={handleViewAll}
                    >
                      All
                    </Link>
                  </Grid>
                  <Grid item>
                    <Link
                      component='button'
                      variant='body2'
                      onClick={handleViewActive}
                    >
                      Active
                    </Link>
                  </Grid>
                  <Grid item>
                    <Link
                      component='button'
                      variant='body2'
                      onClick={handleViewCompleted}
                    >
                      Completed
                    </Link>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item sm={3}>
                <Link
                  component='button'
                  variant='body2'
                  onClick={handleClearCompleted}
                >
                  Clear completed
                </Link>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default ToDoContainer;
