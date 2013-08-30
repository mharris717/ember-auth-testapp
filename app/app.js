import Resolver from 'resolver';

var App = Ember.Application.create({
  LOG_ACTIVE_GENERATION: true,
  LOG_VIEW_LOOKUPS: true,
  modulePrefix: 'appkit', // TODO: loaded via config
  Resolver: Resolver
});

App.getServerUrl = function () {
  return "http://localhost:4567";
};

App.Store = DS.Store.extend({
  revision: 11,
  adapter: 'DS.RESTAdapter'
});

DS.RESTAdapter.reopen({
  url: App.getServerUrl()
});

DS.RESTAdapter.registerTransform('hash',{
  serialize: function(value) {return value;},
  deserialize: function(value) {return value;}
});

var ops = EmberAuth.defaultOps || {baseUrl: App.getServerUrl()};
EmberAuth.setupApp(App,ops);

App.SignInController.reopen({
  showLoginForm: (function() { return true; }).property()
});

import routes from 'appkit/routes';
App.Router.map(routes); // TODO: just resolve the router

import post from "appkit/models/post";
App.Post = post;

export default App;
