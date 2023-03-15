import { Component, OnInit } from '@angular/core';
import { Todo } from './classes/Todo';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class TodoComponent implements OnInit{
  //Array to store the todos items
  //String to store the text for the todo item
  todoText = "";
  todos: Todo[] = [];
  completedTodos: Todo[] = [];
  newTodo: Todo = new Todo(this.todoText, false);
  

  //Function that adds a new todo item to the todos array and the local storage
  addTodo() {
    if(this.todoText.length != 0) {
      const newTodo = new Todo(this.todoText, false);
      this.todos.unshift(newTodo);
      localStorage.setItem('todos', JSON.stringify(this.todos));
    } else {
      alert("Please enter a valid todo!");
    }
  }

  //Function that removes a todo item to the todos array and updates the local storage
  removeTodo(index: number) {
    this.todos.splice(index, 1);
    localStorage.setItem('todos', JSON.stringify(this.todos));
  }

  //Marks the todo item at the specified index as completed
  //Moves it from the todos array to the completedTodos array and updates local storage
  doneTodo(index: number) {
    this.todos[index].isDone = true;
    this.completedTodos.unshift(this.todos[index]);
    this.todos.splice(index, 1);
    localStorage.setItem('completedtodos', JSON.stringify(this.completedTodos));
    localStorage.setItem('todos', JSON.stringify(this.todos));
  }

  //Removes an item from the completedTodos array at the params index
  removeCompleted(index: number) {
    this.completedTodos.splice(index, 1);
    localStorage.setItem('completedtodos', JSON.stringify(this.completedTodos));
  }

  //OnInit function that is called at component initialization
  //Checks for localstorage data
  ngOnInit() {
    const existingTodos = localStorage.getItem('todos');
    this.todos = JSON.parse(existingTodos as string) || [];

    const existingCompletedTodos = localStorage.getItem('completedtodos');
    this.todos = JSON.parse(existingCompletedTodos as string) || [];
  }

  //Function called when drag starts, sets the dragged data to the index of the item
  onDragStart(event: DragEvent, index: number, sourceList: string): void {
    event.dataTransfer!.setData("text/plain", index.toString());
    event.dataTransfer!.setData("sourceList", sourceList);
  }
  
  //Function called when dragged item is over a drop target
  onDragOver(event: DragEvent): void {
    event.preventDefault();
    event.dataTransfer!.dropEffect = "move";
  }

  //Function called when dragged item is dropped on target, changes item from list to the drop target list
  onDrop(event: DragEvent, listName: string): void {
    event.preventDefault();
    const index = parseInt(event.dataTransfer!.getData("text/plain"), 10);
    const sourceList = event.dataTransfer!.getData("sourceList");
    const item = sourceList === 'todosList' ? this.todos[index] : this.completedTodos[index];
    if (sourceList === 'todosList') {
      this.todos.splice(index, 1);
    } else {
      this.completedTodos.splice(index, 1);
    }
    if (listName === 'todosList') {
      this.todos.unshift(item);
    } else {
      this.completedTodos.unshift(item);
    }
  }
}
