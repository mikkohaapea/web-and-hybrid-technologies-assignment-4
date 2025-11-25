import { View, Text, Pressable, StyleSheet } from 'react-native'
import React, { useState } from 'react'
import { TodoListRowProps } from '../props/todoListRowProps'

/*
type TodoListRowProps = {
  task: string,
  status: boolean
}*/

/*
export default function TodoListRow({ task }: TodoListRowProps) {
  const [isTaskDone, setIsTaskDone] = useState<boolean>(false)
  return (
    <Pressable
      onPress={() => {setIsTaskDone(!isTaskDone)}}
    >
      <View>
        <Text style={isTaskDone ? styles.done : styles.undone}>TodoListRow: {task} {String(isTaskDone)}</Text>
      </View>
    </Pressable>
  )
}*/



const TodoListRow: React.FC<TodoListRowProps> = ({ taskTitle, taskStatus=false }) => {
  const [isTaskDone, setIsTaskDone] = useState<boolean>(taskStatus)
  return (
    <Pressable
      onPress={() => { setIsTaskDone(!isTaskDone) }}
      hitSlop={10}
    >
      <View style={styles.row}>
        <Text style={isTaskDone ? styles.done : styles.undone}>{taskTitle}</Text>
      </View>
    </Pressable>
  )
}

const styles = StyleSheet.create({
  row: {
    backgroundColor: '#ff00ffff',
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