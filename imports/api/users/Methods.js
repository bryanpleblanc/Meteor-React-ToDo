// Methods related to users
import { Meteor } from 'meteor/meteor';

Meteor.methods({
    'Create New User'(username, password) {
        if (Meteor.users.find({username: {$regex: "^" + username, $options: 'i'}}).count() === 0) {
            userId = Meteor.users.insert({username: username});
            Accounts.setPassword(userId, password);
            return userId;
        } else {
            throw new Meteor.Error('User already exists');
        }

    },


});