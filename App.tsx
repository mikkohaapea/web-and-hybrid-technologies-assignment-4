import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { Button, FlatList, Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import TodoListRow from './components/TodoListRow';
import { TodoListRowProps } from './props/todoListRowProps';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ASYNC_STORAGE_KEY = 'TODO_LIST_TASKS'
//const ASYNC_STORAGE_KEY = 'TODO_LIST_ITEMS'

export default function App() {
  const [input, setInput] = useState<string>('')
  const [tasks, setTasks] = useState<TodoListRowProps[]>([])

  useEffect(() => {
    //fetch tasks from storage
    (async () => {
      try {
        const json = await AsyncStorage.getItem(ASYNC_STORAGE_KEY)
        if (json) setTasks(JSON.parse(json))
      } catch (e) {
        console.log("error fetching tasks")
      }
    })()
  }, [])

  useEffect(() => {
    //save tasks to storage
    AsyncStorage.setItem(ASYNC_STORAGE_KEY, JSON.stringify(tasks))
  }, [tasks])

  /*
  const switchStatus = (id: string) => {
    const tempArr: TodoListRowProps[] = []
    tasks.map((task) => {
      task.id === id ? tempArr.push({...task, taskStatus: !task.taskStatus}) : tempArr.push(task)
    })
    setTasks(tempArr)
  }*/
  const switchStatus = (id: string) => {
    setTasks(
      tasks.map((task) => {
        return (
          task.id === id ? { ...task, taskStatus: !task.taskStatus } : task
        )
      })
    )
  }

  const addTask = (task: string) => {
    if (task.trim().length === 0) {
      //estää tyhjien rivien lisäämisen
      setInput('')
      return
    }
    setTasks([
      ...tasks,
      {
        id: Date.now().toString(),
        taskTitle: task,
        taskStatus: false,
        onToggle: switchStatus
      }
    ])
    setInput('')
  }

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Todo list</Text>
      <View style={styles.inputView}>
        <View style={{ flex: 1 }}>
          <TextInput
            style={{ /*backgroundColor: 'green',*/ flexGrow: 1 }}
            placeholder='Enter task'
            value={input}
            onChangeText={setInput}
            maxLength={50} //valinnainen
            onSubmitEditing={() => {
              addTask(input)
            }}
            submitBehavior='submit' //dont close soft keyboard on submit
          />
        </View>

        <Pressable
          onPress={() => {
            addTask(input)
          }}
          style={styles.pressable}
          hitSlop={10}
        >
          <Text style={{ color: '#00cfcfff' }}>
            Save
          </Text>
        </Pressable>

        {/* //alternative to pressable text
        <Button
          title='Save'
          onPress={() => {
            setTasks([...tasks, input])
            setInput('')
          }}
        />
        */}

      </View>
      <FlatList
        style={{ marginBottom: 48 }} //jotta lista ei menisi alapalkin päälle
        data={tasks}
        renderItem={({ item }) => {
          return (
            <TodoListRow
              id={item.id}
              taskTitle={item.taskTitle}
              taskStatus={item.taskStatus}
              onToggle={switchStatus}
            />
          )
        }}
      />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    //backgroundColor: 'red',
    //alignItems: 'center',
    marginTop: 32,
    padding: 8
  },
  header: {
    fontSize: 24,
    alignSelf: 'center',
    marginBottom: 8
  },
  inputView: {
    flexDirection: 'row',
    //alignItems: 'stretch',
    //justifyContent: 'space-between',
    //backgroundColor: 'yellow',
    marginBottom: 32
  },
  pressable: {
    //backgroundColor: 'blue',
    justifyContent: 'center',
    width: '15%',
    alignItems: 'center'
  }
});
