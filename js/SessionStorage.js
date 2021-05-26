class SessionStorage {
    static getTodos() {
        let todos;
        if (sessionStorage.getItem('todos') === null) {
            todos = [];
        } else {
            todos = JSON.parse(sessionStorage.getItem('todos'));
        }

        return todos;
    }

    static addTodoToSessionStorage(todo) {
        const todos = SessionStorage.getTodos();
        todos.push(todo);
        sessionStorage.setItem('todos', JSON.stringify(todos));
    }

    static removeTodoFromSessionStorage(title) {
        const todos = SessionStorage.getTodos();

        todos.forEach((todo, index) => {
            if (title.includes(todo.title)) {
                todos.splice(index, 1);
            }
        });
        sessionStorage.setItem('todos', JSON.stringify(todos));
    }
}
