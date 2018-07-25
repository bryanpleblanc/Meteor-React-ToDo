import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { withTracker } from 'meteor/react-meteor-data';
import Blaze from 'meteor/gadicc:blaze-react-component';
import TaskView from './Task.js';
import { Task } from '../api/tasks.js';
import LoginSplash from './LoginSplash.js';
import KendoGrid from './Grid.js'

import  './components/test.js';



// App component - represents the whole app
class App extends Component {
    // =================================================================
    // CONSTRUCTOR
    // =================================================================
    constructor(props) {
        super(props);

        this.state = {
            hideCompleted: false,
        };
    }


    // =================================================================
    // EVENTS
    // =================================================================
    logoutUser(event) {
        event.preventDefault();
        Meteor.logout(function (error) {
            if (error){
                console.log('Problem logging user out. ' + error)
            } else {
                console.log('User Logged Out.')
            }
        });
    }

    toggleHideCompleted(event) {
        this.setState({
            hideCompleted: !this.state.hideCompleted,

        });
    }

    handleSubmit(event) {
        event.preventDefault();

        // Find the text field via the React ref
        const text = ReactDOM.findDOMNode(this.refs.textInput).value.trim();

        Task.insert({text, createdAt: new Date(), owner: Meteor.userId(),username: Meteor.user().username});

        // Clear form
        ReactDOM.findDOMNode(this.refs.textInput).value = '';
    }


    // =================================================================
    // RENDER HELPERS
    // =================================================================
    renderTasks() {
        let filteredTasks = this.props.tasks;
        if (this.state.hideCompleted) {
            filteredTasks = filteredTasks.filter(task => !task.checked);
        }
        return filteredTasks.map((task) => (
            <TaskView key={task._id} task={task} />
        ));
    }


    // =================================================================
    // RENDER
    // =================================================================
    render() {
        return (
            <div className="container">
                <Blaze template='test'/>
                { this.props.userLoggedIn ?
                    <div>
                        <header>
                            <button onClick={this.logoutUser.bind(this)}>Logout</button>
                            <h1>Todo List ({this.props.incompleteCount})</h1>

                            {/* Check box for sorting by what has bee checked*/}
                            <label className="hide-completed">
                                <input type="checkbox" readOnly checked={this.state.hideCompleted} onClick={this.toggleHideCompleted.bind(this)}/>
                                Hide Completed Tasks
                            </label>

                            <label>{this.props.test}</label>




                            {/* Form for filling out tasks */}
                            <form className="new-task" onSubmit={this.handleSubmit.bind(this)} >
                                <input type="text" ref="textInput" placeholder="Type to add new tasks"/>
                            </form>


                        </header>

                        <ul>
                            {this.renderTasks()}
                        </ul>

                        <KendoGrid />
                    </div>

                    :
                   <LoginSplash />
                }


            </div>
        );
    }
}

export default withTracker(() => {
    Meteor.subscribe('tasks');

    return {
        tasks: Task.find({}).fetch(),
        incompleteCount: Task.find({ checked: { $ne: true } }).count(),
        userLoggedIn: Meteor.user(),
    };
})(App);


