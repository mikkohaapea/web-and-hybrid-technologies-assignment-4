import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { Button, FlatList, Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import TodoListRow from './components/TodoListRow';
import { TodoListRowProps } from './props/todoListRowProps';

/*
type taskProps = {
  taskTitle: string,
  taskStatus: boolean //onko taski tehty (true) vai ei (false):
}*/

export default function App() {
  const [input, setInput] = useState<string>('')
  //const [tasks, setTasks] = useState<string[]>([])
  const [tasks, setTasks] = useState<TodoListRowProps[]>([])


  const addTask = (task: string) => {
    if (task.trim().length === 0) {
      //estää tyhjien rivien lisäämisen
      setInput('')
      return
    }
    setTasks([...tasks, { taskTitle: task, taskStatus: false }])
    setInput('')
  }

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Todo list</Text>
      <View style={styles.inputView}>
        <View style={{ flex: 1 }}>
          <TextInput
            style={{ backgroundColor: 'green', flexGrow: 1 }}
            placeholder='Enter task'
            value={input}
            onChangeText={setInput}
            maxLength={50} //valinnainen
            //onKeyPress={(e) => {if (e.nativeEvent.key == 'Enter') handleEnter(input)}}
            onSubmitEditing={() => {
              addTask(input)
              //setTasks([...tasks, input])
              //setInput('')
            }}
            submitBehavior='submit' //dont close soft keyboard on submit
          />
        </View>

        <Pressable
          onPress={() => {
            //setTasks([...tasks, input])
            //setInput('')
            addTask(input)
          }}
          style={styles.pressable}
          hitSlop={10}
        >
          <Text style={{ color: '#00ffffff' }}>
            Save
          </Text>
        </Pressable>

        {/*
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
        //renderItem={({ item }) => <Text style={{paddingBottom: 8}}>{item}</Text>}

        //renderItem={({ item }) => <TodoListRow task={item}></TodoListRow>}
        renderItem={({ item }) => <TodoListRow taskTitle={item.taskTitle} taskStatus={item.taskStatus}></TodoListRow>}
      />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'red',
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
    backgroundColor: 'yellow',
    marginBottom: 32
  },
  pressable: {
    backgroundColor: 'blue',
    justifyContent: 'center',
    width: '15%',
    alignItems: 'center'
  }
});
