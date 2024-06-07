let todos = [];
let nextId = 1;

function addTodo() {
    const input = document.getElementById('newTodo');
    const name = input.value.trim();

    if (name.length > 3 && /^[A-Z]/.test(name)) {
        const todo = {
            id: nextId++,
            name,
            createdDate: new Date().toISOString(),
            completed: false
        };
        todos.push(todo);
        input.value = '';
        renderTodos();
    } else {
        alert('To-do must start with an uppercase letter, be non-empty, and have more than three characters.');
    }
}

function toggleTodoCompletion(id) {
    const todo = todos.find(todo => todo.id === id);
    if (todo) {
        todo.completed = !todo.completed;
        renderTodos();
    }
}

function removeTodo(id) {
    todos = todos.filter(todo => todo.id !== id);
    renderTodos();
}

function sortTodos() {
    todos.sort((a, b) => a.name.localeCompare(b.name));
    renderTodos();
}

function renderTodos() {
    const todoList = document.getElementById('todoList');
    todoList.innerHTML = '';

    todos.forEach(todo => {
        const li = document.createElement('li');
        li.className = todo.completed ? 'completed' : '';
        
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.checked = todo.completed;
        checkbox.onclick = () => toggleTodoCompletion(todo.id);
        
        const span = document.createElement('span');
        span.textContent = todo.name;
        
        const closeBtn = document.createElement('span');
        closeBtn.textContent = '✖';
        closeBtn.className = 'close';
        closeBtn.onclick = () => removeTodo(todo.id);

        li.appendChild(checkbox);
        li.appendChild(span);
        li.appendChild(closeBtn);

        todoList.appendChild(li);
    });
}
