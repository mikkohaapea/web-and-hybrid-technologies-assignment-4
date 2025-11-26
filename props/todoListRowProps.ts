export type TodoListRowProps = {
  id: string;
  taskTitle: string;
  taskStatus: boolean; //onko taski merkitty tehdyksi (true) vai ei (false)
  onToggle: (id: string) => void
}