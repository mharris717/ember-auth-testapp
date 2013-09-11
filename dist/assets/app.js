define("appkit/app",
  ["resolver","appkit/routes","appkit/models/post"],
  function(Resolver, routes, post) {
    "use strict";

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
      adapter: 'DS.FixtureAdapter'
    });

    DS.RESTAdapter.reopen({
      url: App.getServerUrl()
    });

    //var ops = EmberAuth.defaultOps || {baseUrl: App.getServerUrl()};
    //EmberAuth.setupApp(App,ops);

    App.Router.map(routes); // TODO: just resolve the router

    App.Post = post;


    return App;
  });
define("appkit/models/post",
  [],
  function() {
    "use strict";
    var post = DS.Model.extend({
      body: DS.attr('string'),
      title: DS.attr('string')
    });

    post.FIXTURES = [
      {id: 1, title: "FUN"},
      {id: 2, title: "More Fun!"}
    ];

    return post;
  });
define("appkit/routes",
  [],
  function() {
    "use strict";
    function Routes() {
      // // routes/resources
      this.resource('posts', function() {
        this.route('new');
      });

    }


    return Routes;
  });
define("appkit/routes/index",
  [],
  function() {
    "use strict";
    var IndexRoute = Ember.Route.extend({
      model: function() {
        return ['red', 'yellow', 'blue'];
      }
    });


    return IndexRoute;
  });
define("appkit/routes/posts",
  [],
  function() {
    "use strict";
    var PostsRoute = Ember.Route.extend({
      model: function() {
        console.debug("PostsRoute model call");
        return App.Post.find();
      }
    });


    return PostsRoute;
  });
//@ sourceMappingURL=app.js.map