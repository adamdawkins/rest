import { Meteor } from 'meteor/meteor'
import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import { Mongo } from 'meteor/mongo';
const Posts = new Mongo.Collection("posts");

import './main.html';

Template.hello.onCreated(function helloOnCreated() {
  // counter starts at 0
  this.counter = new ReactiveVar(0);
	const handle = Meteor.subscribe('posts');
	console.log('ready', handle.ready());
	console.log({handle});
});

Template.hello.helpers({
	posts() {
		return Posts.find().fetch();
	},
  counter() {
    return Template.instance().counter.get();
  },
});

Template.hello.events({
  'click button'(event, instance) {
    // increment the counter when button is clicked
    instance.counter.set(instance.counter.get() + 1);
  },
});
