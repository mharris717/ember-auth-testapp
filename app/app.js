import Resolver from 'resolver';

var App = Ember.Application.create({
  LOG_ACTIVE_GENERATION: true,
  LOG_VIEW_LOOKUPS: true,
  modulePrefix: 'appkit', // TODO: loaded via config
  Resolver: Resolver,

  currentPath: '',

  ApplicationController : Ember.Controller.extend({
      updateCurrentPath: function() {
          App.set('currentPath', this.get('currentPath'));
      }.observes('currentPath')
  })
});

App.getServerUrl = function () {
  return "http://localhost:8800";
};

App.Store = DS.Store.extend({
  revision: 11,
  adapter: 'DS.PaginationFixtureAdapter'
});

DS.RESTAdapter.reopen({
  url: App.getServerUrl()
});

//var ops = EmberAuth.defaultOps || {baseUrl: App.getServerUrl()};
//EmberAuth.setupApp(App,ops);

import routes from 'appkit/routes';
App.Router.map(routes); // TODO: just resolve the router

import post from "appkit/models/post";
App.Post = post;

export default App;
