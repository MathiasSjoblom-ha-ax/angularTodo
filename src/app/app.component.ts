import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class TodoComponent implements OnInit{
  //Array to store the todos items
  todos: string[] = [];
  //String to store the text for the todo item
  todoText = "";

  //Function that adds a todo item to the todos array and the local storage
  addTodo() {
    this.todos.push(this.todoText);
    localStorage.setItem('todos', JSON.stringify(this.todos));
  }

  //Function that removes a todo item to the todos array and updates the local storage
  removeTodo(index: number) {
    this.todos.splice(index, 1);
    localStorage.setItem('todos', JSON.stringify(this.todos));
  }

  //OnInit function that is called at component initialization
  //Checks for localstorage data
  ngOnInit() {
    const existingTodos = localStorage.getItem('todos');
    this.todos = JSON.parse(existingTodos as string) || [];
  }
}
