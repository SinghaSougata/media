// TodoListScreen.tsx
import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, FlatList, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { addTodo, toggleTodo, removeTodo } from '../actions/todoActions';
import { RootState } from '../reducers';
import TodoItem from '../components/TodoItem';
import axios from 'axios';

const PAGE_SIZE = 20;

const TodoListScreen: React.FC = () => {
  const [text, setText] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const todos = useSelector((state: RootState) => state.todos.todos);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await axios.get('https://jsonplaceholder.typicode.com/todos', {
          params: {
            _page: currentPage,
            _limit: PAGE_SIZE,
          },
        });
        const data = response.data;
        const reversedTodos = data.map((todo: { title: string }) => ({
          id: todos.length + 1,
          text: todo.title,
          completed: false,
        })).reverse();
        dispatch(addTodo(reversedTodos));

      } catch (error) {
        console.error('Error fetching TODOs:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [currentPage, dispatch, todos.length]);

  const handleAddTodo = () => {
    if (text.trim() !== '') {
      dispatch(addTodo(text));
      setText('');
    }
  };

  const handleToggleTodo = (id: number) => {
    dispatch(toggleTodo(id));
  };

  const handleRemoveTodo = (id: number) => {
    dispatch(removeTodo(id));
  };

  const handleLoadMore = () => {
    setCurrentPage(prevPage => prevPage + 1);
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Enter todo..."
        placeholderTextColor={'white'}
        value={text}
        onChangeText={(newText) => setText(newText)}
      />
      <TouchableOpacity onPress={handleAddTodo} style={styles.addButton}>
        <Text style={styles.buttonText}>Add Todo</Text>
      </TouchableOpacity>
      <FlatList
        data={todos}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TodoItem
            todo={item}
            onToggle={() => handleToggleTodo(item.id)}
            onRemove={() => handleRemoveTodo(item.id)}
          />
        )}
        onEndReached={handleLoadMore}
        onEndReachedThreshold={0.1}
      />
      {loading && <ActivityIndicator style={styles.loader} size="large" color="#4CAF50" />}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: 'black',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 8,
    color: 'white',
    backgroundColor: 'black',
  },
  addButton: {
    backgroundColor: '#4CAF50',
    borderRadius: 10,
    paddingVertical: 12,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  loader: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: [{ translateX: -25 }, { translateY: -25 }],
  },
});

export default TodoListScreen;
