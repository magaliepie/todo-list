let liElements = document.getElementsByClassName('task');
const taskNumber = document.querySelector('h1 span');

class HandleUI {
    static displayTodos() {
        let todos;

        if (supports_storage) {
            todos = LocalStorage.getTodos();
        } else {
            todos = SessionStorage.getTodos();
        }

        todos.forEach((todo) => HandleUI.addTodoToList(todo));
    }

    static addTodoToList(todo) {
        const list = document.querySelector('.todo');
        const li = document.createElement('li');
        const button = document.createElement('button');

        button.textContent = 'x';
        button.classList.add('delete');
        button.classList.add('btn-primary');
        button.addEventListener('click', removeTodoFromList);

        li.innerHTML = `${todo.title}`;

        li.className = 'task';
        li.style.fontSize = '30px';
        li.style.listStyleType = 'none';
        taskNumber.textContent = liElements.length + 1;
        li.appendChild(button);
        list.appendChild(li);
    }

    static deleteTodo(el) {
        if (el.classList.contains('delete')) {
            el.parentElement.remove();
            taskNumber.textContent = liElements.length;
        }
    }

    static showAlert(message, className) {
        const div = document.createElement('div');
        div.className = `alert ${className}`;
        div.appendChild(document.createTextNode(message));
        const container = document.querySelector('.container');
        const form = document.querySelector('.form-control');
        container.insertBefore(div, form);

        setTimeout(() => document.querySelector('.alert').remove(), 3000);
    }

    static clearFields() {
        document.querySelector('#title').value = '';
    }
}
