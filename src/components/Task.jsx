import React, { useState } from 'react';
import { PencilIcon, TrashIcon, CheckCircleIcon, SaveIcon } from '@heroicons/react/outline';
import { format } from 'date-fns';

const Task = ({ task, tasks, setTasks }) => {
    const [isEditing, setIsEditing] = useState(false); // Track edit mode
    const [editedTitle, setEditedTitle] = useState(task.title); // Temporary state for edited title
    const [editedDate, setEditedDate] = useState(task.date); // Temporary state for edited date

    const toggleCompletion = () => {
        const updatedTasks = tasks.map((t) =>
            t.id === task.id ? { ...t, completed: !t.completed } : t
        );
        setTasks(updatedTasks);
    };

    const deleteTask = () => {
        const updatedTasks = tasks.filter((t) => t.id !== task.id);
        setTasks(updatedTasks);
    };

    const saveEditedTask = () => {
        const updatedTasks = tasks.map((t) =>
            t.id === task.id ? { ...t, title: editedTitle, date: editedDate } : t
        );
        setTasks(updatedTasks);
        setIsEditing(false); // Exit edit mode
    };

    // Format the date using date-fns
    const formattedDate = format(new Date(task.date), 'MMMM dd, yyyy, hh:mm a');

    return (
        <div
            className={`flex justify-between items-center p-4 mb-4 rounded-lg shadow-lg transition-all duration-300 ${task.completed ? 'bg-gray-200 opacity-70' : 'bg-white'
                }`}
        >
            <div className="flex items-center space-x-4">
                {/* Toggle completion button */}
                <CheckCircleIcon
                    className={`h-6 w-6 cursor-pointer ${task.completed ? 'text-green-500' : 'text-gray-400'
                        }`}
                    onClick={toggleCompletion}
                />

                {/* Task Info (Editable fields when in editing mode) */}
                {isEditing ? (
                    <div className="flex flex-col space-y-2">
                        <input
                            type="text"
                            value={editedTitle}
                            onChange={(e) => setEditedTitle(e.target.value)}
                            className="border p-2 rounded-lg focus:outline-none focus:ring focus:border-blue-300"
                        />
                        <input
                            type="datetime-local"
                            value={editedDate}
                            onChange={(e) => setEditedDate(e.target.value)}
                            className="border p-2 rounded-lg focus:outline-none focus:ring focus:border-blue-300"
                        />
                    </div>
                ) : (
                    <div className={`text-lg ${task.completed ? 'line-through text-gray-500' : ''}`}>
                        <span>{task.title}</span> <br />
                        <span className="text-sm">{formattedDate}</span>
                    </div>
                )}
            </div>

            {/* Edit, Save, and Delete buttons */}
            <div className="flex space-x-2">
                {isEditing ? (
                    <SaveIcon
                        className="h-6 w-6 cursor-pointer text-green-500"
                        onClick={saveEditedTask}
                    />
                ) : (
                    <PencilIcon
                        className="h-6 w-6 cursor-pointer text-blue-500"
                        onClick={() => setIsEditing(true)}
                    />
                )}
                <TrashIcon
                    className="h-6 w-6 cursor-pointer text-red-500"
                    onClick={deleteTask}
                />
            </div>
        </div>
    );
};

export default Task;
