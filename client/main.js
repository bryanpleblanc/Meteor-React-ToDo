
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';
import React from 'react';
import { renderRoutes } from '../imports/startup/client/routes.js'

Meteor.startup(() => {
    render(renderRoutes(), document.getElementById('render-target'));
});
