// ============= TODO CLASS =============
class TodoApp {
    constructor() {
        this.todos = [];
        this.currentFilter = 'all';
        this.searchTerm = '';
        this.init();
    }

    // ============= INITIALIZATION =============
    init() {
        this.loadFromStorage();
        this.setupEventListeners();
        this.render();
    }

    setupEventListeners() {
        // Add todo
        document.getElementById('addBtn').addEventListener('click', () => this.addTodo());
        document.getElementById('todoInput').addEventListener('keypress', (e) => {
            if (e.key === 'Enter') this.addTodo();
        });

        // Filter
        document.querySelectorAll('.filter-btn').forEach(btn => {
            btn.addEventListener('click', (e) => this.setFilter(e.target.dataset.filter));
        });

        // Search
        document.getElementById('searchInput').addEventListener('input', (e) => {
            this.searchTerm = e.target.value.toLowerCase();
            this.render();
        });

        // Action buttons
        document.getElementById('clearCompleted').addEventListener('click', () => this.clearCompleted());
        document.getElementById('exportBtn').addEventListener('click', () => this.exportTodos());
        document.getElementById('importBtn').addEventListener('click', () => {
            document.getElementById('importFile').click();
        });
        document.getElementById('importFile').addEventListener('change', (e) => this.importTodos(e));
        document.getElementById('resetBtn').addEventListener('click', () => this.resetAll());
    }

    // ============= ADD TODO =============
    addTodo() {
        const input = document.getElementById('todoInput');
        const priority = document.getElementById('prioritySelect').value;
        const text = input.value.trim();

        if (text === '') {
            this.showNotification('Please enter a task');
            return;
        }

        const todo = {
            id: Date.now(),
            text: text,
            priority: priority,
            completed: false,
            createdAt: new Date().toLocaleDateString(),
            editedAt: null
        };

        this.todos.unshift(todo);
        this.saveToStorage();
        this.render();
        input.value = '';
        input.focus();
        this.showNotification('Task added successfully! ✓');
    }

    // ============= TOGGLE TODO =============
    toggleTodo(id) {
        const todo = this.todos.find(t => t.id === id);
        if (todo) {
            todo.completed = !todo.completed;
            this.saveToStorage();
            this.render();
        }
    }

    // ============= DELETE TODO =============
    deleteTodo(id) {
        if (confirm('Are you sure you want to delete this task?')) {
            this.todos = this.todos.filter(t => t.id !== id);
            this.saveToStorage();
            this.render();
            this.showNotification('Task deleted ✗');
        }
    }

    // ============= EDIT TODO =============
    editTodo(id) {
        const todo = this.todos.find(t => t.id === id);
        if (!todo) return;

        const newText = prompt('Edit task:', todo.text);
        if (newText !== null && newText.trim() !== '') {
            todo.text = newText.trim();
            todo.editedAt = new Date().toLocaleDateString();
            this.saveToStorage();
            this.render();
            this.showNotification('Task updated ✓');
        }
    }

    // ============= FILTER =============
    setFilter(filter) {
        this.currentFilter = filter;
        document.querySelectorAll('.filter-btn').forEach(btn => {
            btn.classList.toggle('active', btn.dataset.filter === filter);
        });
        this.render();
    }

    // ============= GET FILTERED TODOS =============
    getFilteredTodos() {
        let filtered = this.todos;

        // Apply filter
        switch (this.currentFilter) {
            case 'active':
                filtered = filtered.filter(t => !t.completed);
                break;
            case 'completed':
                filtered = filtered.filter(t => t.completed);
                break;
            case 'high':
                filtered = filtered.filter(t => t.priority === 'high');
                break;
        }

        // Apply search
        if (this.searchTerm) {
            filtered = filtered.filter(t => t.text.toLowerCase().includes(this.searchTerm));
        }

        return filtered;
    }

    // ============= RENDER =============
    render() {
        const todoList = document.getElementById('todoList');
        const emptyState = document.getElementById('emptyState');
        const filteredTodos = this.getFilteredTodos();

        // Clear list
        todoList.innerHTML = '';

        // Show/hide empty state
        if (filteredTodos.length === 0) {
            emptyState.classList.add('show');
            todoList.style.display = 'none';
        } else {
            emptyState.classList.remove('show');
            todoList.style.display = 'flex';

            // Render todos
            filteredTodos.forEach(todo => {
                const li = this.createTodoElement(todo);
                todoList.appendChild(li);
            });
        }

        // Update stats
        this.updateStats();
    }

    // ============= CREATE TODO ELEMENT =============
    createTodoElement(todo) {
        const li = document.createElement('li');
        li.className = `todo-item priority-${todo.priority}`;
        if (todo.completed) li.classList.add('completed');

        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.className = 'todo-checkbox';
        checkbox.checked = todo.completed;
        checkbox.addEventListener('change', () => this.toggleTodo(todo.id));

        const content = document.createElement('div');
        content.className = 'todo-content';

        const text = document.createElement('span');
        text.className = 'todo-text';
        text.textContent = todo.text;

        const meta = document.createElement('div');
        meta.className = 'todo-meta';

        const date = document.createElement('span');
        date.className = 'todo-date';
        date.textContent = `📅 ${todo.createdAt}`;

        const priority = document.createElement('span');
        priority.className = `todo-priority priority-${todo.priority}`;
        priority.textContent = todo.priority;

        meta.appendChild(date);
        meta.appendChild(priority);

        if (todo.editedAt) {
            const edited = document.createElement('span');
            edited.className = 'todo-date';
            edited.textContent = `✏️ Edited: ${todo.editedAt}`;
            meta.appendChild(edited);
        }

        content.appendChild(text);
        content.appendChild(meta);

        const actions = document.createElement('div');
        actions.className = 'todo-actions';

        const editBtn = document.createElement('button');
        editBtn.className = 'todo-btn edit-btn';
        editBtn.textContent = '✏️';
        editBtn.title = 'Edit';
        editBtn.addEventListener('click', () => this.editTodo(todo.id));

        const deleteBtn = document.createElement('button');
        deleteBtn.className = 'todo-btn delete-btn';
        deleteBtn.textContent = '🗑️';
        deleteBtn.title = 'Delete';
        deleteBtn.addEventListener('click', () => this.deleteTodo(todo.id));

        actions.appendChild(editBtn);
        actions.appendChild(deleteBtn);

        li.appendChild(checkbox);
        li.appendChild(content);
        li.appendChild(actions);

        return li;
    }

    // ============= UPDATE STATS =============
    updateStats() {
        const total = this.todos.length;
        const completed = this.todos.filter(t => t.completed).length;
        const remaining = total - completed;

        document.getElementById('totalTasks').textContent = total;
        document.getElementById('completedTasks').textContent = completed;
        document.getElementById('remainingTasks').textContent = remaining;
    }

    // ============= CLEAR COMPLETED =============
    clearCompleted() {
        const completed = this.todos.filter(t => t.completed).length;
        if (completed === 0) {
            this.showNotification('No completed tasks to clear');
            return;
        }

        if (confirm(`Delete ${completed} completed task(s)?`)) {
            this.todos = this.todos.filter(t => !t.completed);
            this.saveToStorage();
            this.render();
            this.showNotification(`${completed} task(s) cleared ✓`);
        }
    }

    // ============= EXPORT =============
    exportTodos() {
        const dataStr = JSON.stringify(this.todos, null, 2);
        const dataBlob = new Blob([dataStr], { type: 'application/json' });
        const url = URL.createObjectURL(dataBlob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `todos-${new Date().toISOString().split('T')[0]}.json`;
        link.click();
        URL.revokeObjectURL(url);
        this.showNotification('Tasks exported successfully ✓');
    }

    // ============= IMPORT =============
    importTodos(event) {
        const file = event.target.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = (e) => {
            try {
                const imported = JSON.parse(e.target.result);
                if (!Array.isArray(imported)) {
                    throw new Error('Invalid format');
                }

                if (confirm(`Import ${imported.length} task(s)? This will add to existing tasks.`)) {
                    this.todos = [...this.todos, ...imported];
                    this.saveToStorage();
                    this.render();
                    this.showNotification(`${imported.length} task(s) imported successfully ✓`);
                }
            } catch (error) {
                this.showNotification('Error importing tasks. Invalid file format.');
            }
        };
        reader.readAsText(file);
        event.target.value = ''; // Reset input
    }

    // ============= RESET ALL =============
    resetAll() {
        if (confirm('Are you sure? This will delete ALL tasks permanently!')) {
            this.todos = [];
            this.currentFilter = 'all';
            this.searchTerm = '';
            this.saveToStorage();
            this.render();
            document.getElementById('searchInput').value = '';
            document.querySelectorAll('.filter-btn').forEach((btn, i) => {
                btn.classList.toggle('active', i === 0);
            });
            this.showNotification('All tasks deleted ✗');
        }
    }

    // ============= LOCAL STORAGE =============
    saveToStorage() {
        localStorage.setItem('todos', JSON.stringify(this.todos));
    }

    loadFromStorage() {
        const stored = localStorage.getItem('todos');
        this.todos = stored ? JSON.parse(stored) : [];
    }

    // ============= NOTIFICATIONS =============
    showNotification(message) {
        const notification = document.createElement('div');
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            padding: 15px 25px;
            border-radius: 8px;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
            z-index: 10000;
            font-weight: 500;
            animation: slideInRight 0.3s ease;
        `;
        notification.textContent = message;
        document.body.appendChild(notification);

        setTimeout(() => {
            notification.style.animation = 'slideOutRight 0.3s ease';
            setTimeout(() => notification.remove(), 300);
        }, 3000);
    }
}

// ============= ANIMATIONS =============
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from {
            opacity: 0;
            transform: translateX(100px);
        }
        to {
            opacity: 1;
            transform: translateX(0);
        }
    }

    @keyframes slideOutRight {
        from {
            opacity: 1;
            transform: translateX(0);
        }
        to {
            opacity: 0;
            transform: translateX(100px);
        }
    }
`;
document.head.appendChild(style);

// ============= INITIALIZE APP =============
const app = new TodoApp();