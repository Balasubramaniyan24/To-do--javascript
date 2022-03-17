import Todos from './Todos.js';

const todos = new Todos();

//Selectors
const form = document.getElementById('form');
const todoInput = document.getElementById('todo-input');
const todoContainer = document.querySelector('#todos--container');
const addBtn = document.getElementById('add-item');
 
var editState = false;
var editId = null;

// Listeners
document.onload = todos.getTodos(todoContainer);

form.addEventListener('submit',(e) =>{
    e.preventDefault();
    if(!editState) { // editState !== false 
        todos.addTodo(todoInput.value,todoContainer);
    }
    else{
        todos.editTodo(todoInput.value,editId);
        editState = false;
        addBtn.innerText = 'Add Task';
    }
    todoInput.value = '';
});     

todoContainer.addEventListener('click',(e)=>{
    if(e.target.classList.contains('delete-item')){
        todos.deleteTodo(e.target.parentElement.id);
    }
    if(e.target.classList.contains('edit-item')){
        todoInput.value = e.target.parentElement.children[0].innerText;
        todoInput.focus();
        addBtn.innerText = 'Update';
        editState = true;
        editId = e.target.parentElement.id;
    }
    if(e.target.classList.contains('status')){
        todos.statusTodo(e.target.parentElement.id);
    }
});


