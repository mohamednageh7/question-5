import React, { useState } from 'react';
import { connect } from 'react-redux';
import { setTodos, setCompleted, setInactiveItem } from '../store/task';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';
import FormControl from '@material-ui/core/FormControl';
import IconButton from '@material-ui/core/IconButton';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import CancelIcon from '@material-ui/icons/Cancel';

const useStyles = makeStyles((theme) => ({
  todoContain: {
    width: '46em',
    borderBottom: '2px solid #f9f9f9',
  },
}));

const TaskDataViews = ({
  todo,
  todos,
  completed,
  setTodos,
  setInactiveItem,
  setCompleted,
}) => {
  const classes = useStyles();
  const [showIcon, setShowIcon] = useState(false);
  const [showDeleteIcon, setShowDeleteIcon] = useState(false);
  const [textForm, setTextForm] = useState(false);
  const [textInput, setTextInput] = useState('');

  const handleShowIcon = () => {
    setShowIcon(true);
  };

  const handleHideIcon = () => {
    setShowIcon(false);
  };

  const handleShowDeleteIcon = () => {
    setShowDeleteIcon(true);
  };

  const handleHideDeleteIcon = () => {
    setShowDeleteIcon(false);
  };

  const handleSelectItem = () => {
    let newTodo = [...todos];
    todo.done = true;
    newTodo = newTodo.filter((item) => item.done === false);
    setInactiveItem(newTodo);
    setCompleted([...completed, todo]);
  };

  const handleInput = (e) => {
    setTextInput(e.target.value);
  };
  const handleAddTask = (e) => {
    if (e.keyCode === 13) {
      todo.task = textInput;
      setTextForm(false);
    }
  };
  const handleDeleteTask = () => {
    let newTodos = [...todos];
    let active = null;
    let complete = [...completed];
    let taskValue = todo.task;
    newTodos = newTodos.filter((item) => item.task !== todo.task);

    complete =
      complete.length > 0 && complete.filter((item) => item.task !== taskValue);
    complete.length > 0 ? setCompleted([...complete]) : setCompleted([]);
    active = newTodos.filter((item) => item.done === false);
    setTodos([...newTodos]);
    active !== null && setInactiveItem(active);
  };
  return (
    <Grid
      container
      onMouseEnter={() => {
        handleShowDeleteIcon();
        handleShowIcon();
      }}
      onMouseLeave={() => {
        handleHideDeleteIcon();
        handleHideIcon();
      }}
      spacing={3}
    >
      <Grid item xs={8}>
        <Grid
          item
          container
          justify='flex-start'
          key={todo.task}
          className={classes.todoContain}
        >
          <Grid item style={{ marginTop: '0.5em' }}>
            <IconButton
              disabled={todo.done}
              style={{ alignSelf: 'center' }}
              onClick={handleSelectItem}
            >
              <CheckCircleOutlineIcon
                htmlColor={showIcon && !todo.done ? 'green' : '#fff'}
              />
            </IconButton>
          </Grid>
          <Grid item>
            {textForm && !todo.done ? (
              <FormControl fullWidth className={classes.margin}>
                <Input
                  id='todo-add'
                  placeholder='Enter new todo...'
                  value={textInput}
                  onChange={(e) => handleInput(e)}
                  onKeyDown={(e) => handleAddTask(e)}
                  style={{
                    width: '30em',
                    borderColor: '#ccc',
                  }}
                />
              </FormControl>
            ) : (
              <Typography
                style={{ fontSize: '2rem', opacity: todo.done ? 0.7 : 1 }}
                variant='subtitle1'
                onClick={(e) => {
                  setTextInput(todo.task);
                  setTextForm(true);
                }}
              >
                {todo.done ? <del>{todo.task}</del> : todo.task}
              </Typography>
            )}
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={3}>
        <Grid item container justify='flex-end'>
          <Grid item style={{ marginTop: '0.5em' }}>
            <IconButton
              style={{ alignSelf: 'center' }}
              onClick={handleDeleteTask}
            >
              <CancelIcon htmlColor={showDeleteIcon ? '#f50057' : '#fff'} />
            </IconButton>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

TaskDataViews.propTypes = {
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
})(TaskDataViews);
