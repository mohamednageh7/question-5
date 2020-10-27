import React, { useState } from 'react';
import { connect } from 'react-redux';
import { setTodos, setCompleted, setInactiveItem } from '../store/task';
import PropTypes from 'prop-types';
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

const ToDoContainer = ({
  todos,
  inactiveItem,
  completed,
  setTodos,
  setCompleted,
  setInactiveItem,
}) => {
  const classes = useStyles();
  const [inputValue, setInputValue] = useState('');
  const [viewAll, setViewAll] = useState(false);
  const [viewActive, setViewActive] = useState(false);
  const [viewCompleted, setViewCompleted] = useState(false);

  const showActive = () => {
    return todos.length - completed.length;
  };
  const handleInput = (e) => {
    setInputValue(e.target.value);
  };
  const handleAddTask = (e) => {
    if (e.keyCode === 13) {
      let newTodo = [...todos];
      let active = newTodo.filter((item) => item.done === false);
      setTodos([{ task: inputValue, done: false }, ...newTodo]);
      setInactiveItem([{ task: inputValue, done: false }, ...active]);
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
              <TaskDataViews key={`${todo} ${index}`} todo={todo} />
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

ToDoContainer.propTypes = {
  todos: PropTypes.array.isRequired,
  completed: PropTypes.array,
  setTodos: PropTypes.func.isRequired,
  setCompleted: PropTypes.func.isRequired,
  setInactiveItem: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  todos: state.task.todos,
  inactiveItem: state.task.inactiveItem,
  completed: state.task.completed,
});

export default connect(mapStateToProps, {
  setTodos,
  setCompleted,
  setInactiveItem,
})(ToDoContainer);
