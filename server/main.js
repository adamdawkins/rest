import { Meteor } from 'meteor/meteor';

const POLL_INTERVAL = 5000;
const COLLECTION_NAME = 'posts';

Meteor.publish('posts', function() {

	const publishedKeys = {};

	const poll = () => {
		const data = HTTP.get('https://jsonplaceholder.typicode.com/posts');
		JSON.parse(data.content).forEach((doc) => {
			if (publishedKeys[doc.id]) {
				this.changed(COLLECTION_NAME, doc.id, doc);
			} else {
				publishedKeys[doc.id] = true;
				this.added(COLLECTION_NAME, doc.id, doc);
			}
		});
	};

	poll();
	this.ready();

	const interval = Meteor.setInterval(poll, POLL_INTERVAL);

	this.onStop(() => {
		Meteor.clearInterval(interval);
	});
});

Meteor.startup(() => {
});
