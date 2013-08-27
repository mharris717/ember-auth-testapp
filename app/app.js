import Resolver from 'resolver';

var App = Ember.Application.create({
  LOG_ACTIVE_GENERATION: true,
  LOG_VIEW_LOOKUPS: true,
  modulePrefix: 'appkit', // TODO: loaded via config
  Resolver: Resolver
});

App.getServerUrl = function () {
  return "";
};

App.Store = DS.Store.extend({
  revision: 11,
  adapter: 'DS.RESTAdapter'
});


var ops = {requestAdapter: "MyDummy"};
EmberAuth.setupApp(App,ops);

App.SignInController.reopen({
  showLoginForm: (function() { return true; }).property()
});

import routes from 'appkit/routes';
App.Router.map(routes); // TODO: just resolve the router

export default App;
