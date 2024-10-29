import React, { useEffect, useState } from 'react';
import axios from 'axios';

function App() {
    const [tasks, setTasks] = useState([]);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [deadline, setDeadline] = useState('');
    const [editTaskId, setEditTaskId] = useState(null);

    const fetchTasks = async () => {
        const response = await axios.get('http://localhost:5000/tasks');
        setTasks(response.data);
    };

    useEffect(() => {
        fetchTasks();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (editTaskId) {
            await axios.put(`http://localhost:5000/tasks/${editTaskId}`, {
                title,
                description,
                deadline,
            });
            setEditTaskId(null);
        } else {
            await axios.post('http://localhost:5000/tasks', {
                title,
                description,
                deadline,
            });
        }
        setTitle('');
        setDescription('');
        setDeadline('');
        fetchTasks();
    };

    const handleEdit = (task) => {
        setTitle(task.title);
        setDescription(task.description);
        setDeadline(task.deadline);
        setEditTaskId(task._id);
    };

    const handleDelete = async (id) => {
        await axios.delete(`http://localhost:5000/tasks/${id}`);
        fetchTasks();
    };

    const handleComplete = async (id) => {
        await axios.patch(`http://localhost:5000/tasks/${id}/complete`);
        fetchTasks();
    };

    return (
        <div className="App">
            <h1>Task Management Tool</h1>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Task Title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                />
                <textarea
                    placeholder="Task Description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required
                />
                <input
                    type="date"
                    value={deadline}
                    onChange={(e) => setDeadline(e.target.value)}
                />
                <button type="submit">{editTaskId ? 'Update Task' : 'Add Task'}</button>
            </form>
            <h2>Tasks List</h2>
            <ul>
                {tasks.map((task) => (
                    <li key={task._id}>
                        <h3>{task.title}</h3>
                        <p>{task.description}</p>
                        <p>Deadline: {new Date(task.deadline).toLocaleDateString()}</p>
                        <p>Status: {task.completed ? 'Completed' : 'Pending'}</p>
                        <button onClick={() => handleEdit(task)}>Edit</button>
                        <button onClick={() => handleComplete(task._id)}>Complete</button>
                        <button onClick={() => handleDelete(task._id)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default App;