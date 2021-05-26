class LocalStorage {
    static getTodos() {
        let todos;
        if (localStorage.getItem('todos') === null) {
            todos = [];
        } else {
            todos = JSON.parse(localStorage.getItem('todos'));
        }

        return todos;
    }

    static addTodoToLocalStorage(todo) {
        const todos = LocalStorage.getTodos();
        todos.push(todo);
        localStorage.setItem('todos', JSON.stringify(todos));
    }

    static removeTodoFromLocalStorage(title) {
        const todos = LocalStorage.getTodos();

        todos.forEach((todo, index) => {
            if (title.includes(todo.title)) {
                todos.splice(index, 1);
            }
        });
        localStorage.setItem('todos', JSON.stringify(todos));
    }
}
