const todoForm = document.querySelector('.todo-form');
const todoInput = document.querySelector('.todo-form input');
const todoList = document.querySelector('.todo-list');
const totalTodosSpan = document.getElementById('total-todos');

let todos = [];

function loadFromStorage() {
    const storedTodos = localStorage.getItem('todos');
    if (storedTodos) {
        todos = JSON.parse(storedTodos);
    }
}

function saveToStorage() {
    localStorage.setItem('todos', JSON.stringify(todos));
}

function renderTodos() {
    todoList.innerHTML = '';
    todos.forEach((todo, index) => {
        const todoItem = document.createElement('li');
        todoItem.textContent = todo;

        const removeButton = createRemoveButton(index);
        todoItem.appendChild(removeButton);

        todoList.appendChild(todoItem);
    });
    checkTodos();
}

function createRemoveButton(index) {
    const button = document.createElement('button');
    button.id = 'remove-button';
    button.textContent = 'X';
    button.addEventListener('click', (e) => {
        e.stopPropagation();
        todos.splice(index, 1);
        saveToStorage();
        renderTodos();
    });
    return button;
}

function checkTodos() {
    if (totalTodosSpan) {
        totalTodosSpan.textContent = todos.length;
    }
}

todoForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const todoText = todoInput.value.trim();
    if (todoText !== '') {
        todos.push(todoText);
        saveToStorage();
        renderTodos();
        todoInput.value = '';
    }
});

loadFromStorage();
renderTodos();
