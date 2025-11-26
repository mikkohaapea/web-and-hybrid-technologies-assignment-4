import { View, Text, Pressable, StyleSheet } from 'react-native'
import React from 'react'
import { TodoListRowProps } from '../props/todoListRowProps'

const TodoListRow: React.FC<TodoListRowProps> = ({ id, taskTitle, taskStatus, onToggle }) => {
  return (
    <Pressable
      onPress={() => { onToggle(id) }}
      hitSlop={10}
    >
      <View style={styles.row}>
        <Text style={taskStatus ? styles.done : styles.undone}>{taskTitle}</Text>
      </View>
    </Pressable>
  )
}

const styles = StyleSheet.create({
  row: {
    //backgroundColor: '#ff00ffff',
    marginBottom: 16,
    //paddingVertical: 8,
    //paddingHorizontal: 8
    padding: 8
  },
  undone: {
    //backgroundColor: '#ff00ffff',
    marginBottom: 8,
    textDecorationLine: 'none'
  },
  done: {
    //backgroundColor: '#ff00ffff',
    marginBottom: 8,
    textDecorationLine: 'line-through'
  }
})

export default TodoListRow