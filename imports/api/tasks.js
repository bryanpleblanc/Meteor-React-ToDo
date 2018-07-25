import { Mongo } from 'meteor/mongo';

export const Task = new Mongo.Collection('task');

if (Meteor.isServer) {
    // This code only runs on the server
    Meteor.publish('tasks', function tasksPublication() {
        return Task.find();
    });
}