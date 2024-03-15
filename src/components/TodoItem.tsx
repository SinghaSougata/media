
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Switch } from 'react-native';

interface TodoItemProps {
  todo: {
    id: number;
    text: string;
    completed: boolean;
  };
  onToggle: () => void;
  onRemove: () => void;
}

const TodoItem: React.FC<TodoItemProps> = ({ todo, onToggle, onRemove }) => {
  return (
    <View style={styles.card}>
      <View style={styles.cardContent}>
        <View style={styles.checkboxContainer}>
          <Switch value={todo.completed} onValueChange={onToggle} />
          <Text style={[styles.todoText, { textDecorationLine: todo.completed ? 'line-through' : 'none' }]}>
            {todo.text}
          </Text>
        </View>
      </View>
      <TouchableOpacity onPress={onRemove} style={styles.removeButton}>
        <Text style={styles.removeButtonText}>Remove</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    elevation: 2,
    marginVertical: 8,
    overflow: 'hidden',
  },
  cardContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  todoText: {
    flex: 1,
    fontSize: 16,
    color: '#333',
    marginLeft: 8,
  },
  removeButton: {
    backgroundColor: '#E74C3C',

    paddingVertical: 8,
    paddingHorizontal: 16,
    alignSelf: 'center',
    width:'100%',
    alignItems:'center'
    // Align the button to the bottom end of the card
  },
  removeButtonText: {
    color: '#FFFFFF',
    fontSize: 12,
   
  },
});

export default TodoItem;
