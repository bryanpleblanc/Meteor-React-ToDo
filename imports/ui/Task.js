import React, { Component } from 'react';

import { Task } from '../api/tasks.js';

// Task component - represents a single todo item
export default class TaskView extends Component {
    toggleChecked() {
        // Set the checked property to the opposite of its current value
        Task.update(this.props.task._id, {$set: { checked: !this.props.task.checked },});
    }

    deleteThisTask() {
        Task.remove(this.props.task._id);
    }


    render() {
        // Give tasks a different className when they are checked off,
        // so that we can style them nicely in CSS
        const taskClassName = this.props.task.checked ? 'checked' : '';

        return (
            <li className={taskClassName}>
                <button className="delete" onClick={this.deleteThisTask.bind(this)}>X</button>

                <input type="checkbox" readOnly checked={!!this.props.task.checked} onClick={this.toggleChecked.bind(this)}/>
                <span className="text"><strong>{this.props.task.username}</strong>: {this.props.task.text}</span>
            </li>
        );
    }
}