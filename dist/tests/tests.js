define("appkit/tests/acceptance/auth_smoke_test",
  [],
  function() {
    "use strict";
    module("Auth Smoke", {
      setup: function() {
        var abc;
        abc = 42;
        console.debug("in setup");
        return App.reset();
      },
      teardown: function() {
        return Ember.run(function() {
          App.Auth.get("_session").clear();
          App.Auth.trigger("signOutSuccess");
          return Em.Auth.Request.MyDummy.clearOptsList();
        });
      }
    });

    test("global exists", function() {
      var res;
      res = !!EmberAuth;
      return equal(res, true);
    });

    test("App has Auth object", function() {
      var res;
      res = !!App.Auth;
      return equal(res, true);
    });

    test('login success - shows email shorter', function() {
      return helpers.loginSuccessfully().then(function() {
        var res;
        res = $(".user-status").text().match("Signed In as user@fake.com");
        equal(res[0], "Signed In as user@fake.com");
        return equal(Em.Auth.Request.MyDummy.getOptsList().length, 1);
      });
    });

    test('login success - saves token', function() {
      return helpers.loginSuccessfully().then(function() {
        return equal(App.Auth.get('authToken'), 'token123');
      });
    });

    test('login failure', function() {
      return helpers.loginFail().then(function() {
        var res;
        res = $(".user-status").text().match("Signed In");
        equal(res, null);
        return equal(Em.Auth.Request.MyDummy.getOptsList().length, 1);
      });
    });

    if (false) {
      test('find after login', function() {
        return helpers.loginSuccessfully().then(function() {
          var a, data;
          a = App.Post.find();
          equal(2, Em.Auth.Request.MyDummy.getOptsList().length);
          data = Em.Auth.Request.MyDummy.getOptsList()[1];
          equal("" + (App.getServerUrl()) + "/posts", data.url);
          return equal("token123", data.data.auth_token);
        });
      });
    }

  });
define("appkit/tests/acceptance/index_test",
  ["appkit/routes/index","appkit/app"],
  function(Index, App) {
    "use strict";

    module("Acceptances - Index", {
      setup: function(){
        App.reset();
      }
    });

    test("index renders", function(){
      expect(3);

      visit('/').then(function(){
        ok(exists("h2:contains('Welcome to Ember.js')"));

        var list = find("ul li");
        equal(list.length, 3);
        equal(list.text(), "redyellowblue");
      });
    });

  });
define("appkit/tests/acceptance/posts_test",
  [],
  function() {
    "use strict";
    module("Posts Test", {
      setup: function() {
        return App.reset();
      },
      teardown: function() {
        return Ember.run(function() {
          App.Auth.get("_session").clear();
          App.Auth.trigger("signOutSuccess");
          return Em.Auth.Request.MyDummy.clearOptsList();
        });
      }
    });

    test('posts index', function() {
      return visit("/posts").then(function() {
        return equal($(".post").length, 2);
      });
    });

  });
define("appkit/tests/acceptance/registration_test",
  [],
  function() {
    "use strict";
    module("Registration", {
      setup: function() {
        return App.reset();
      },
      teardown: function() {
        return Ember.run(function() {
          App.Auth.get("_session").clear();
          App.Auth.trigger("signOutSuccess");
          return Em.Auth.Request.MyDummy.clearOptsList();
        });
      }
    });

    test("smoke", function() {
      return equal(2, 2);
    });

    if (false) {
      test("register smoke", function() {
        var email, password;
        email = "test@fake.com";
        password = "p123";
        return helpers.register(email, password).then(function() {
          var data;
          equal(Em.Auth.Request.MyDummy.getOptsList().length, 1);
          data = Em.Auth.Request.MyDummy.getOptsList()[0];
          console.debug("opts");
          console.debug(data);
          equal(data.url, "" + (App.getServerUrl()) + "/users.json");
          equal(data.type, "POST");
          equal(data.data.user.email, email);
          equal(data.data.user.password, password);
          equal($(".registered").text().trim(), "Successfully Registered");
          return equal(App.get('currentPath'), 'registered');
        });
      });
    }

    test("register path", function() {
      var email, password;
      email = "test@fake.com";
      password = "p123";
      return helpers.register(email, password).then(function() {
        equal($(".registered").text().trim(), "Successfully Registered");
        return equal(App.get('currentPath'), 'registered');
      });
    });

    test("register data", function() {
      var email, password;
      email = "test@fake.com";
      password = "p123";
      return helpers.register(email, password).then(function() {
        var u;
        u = App.RegisterController.justRegistered;
        equal(u.get('email'), email);
        return equal(u.get('password'), password);
      });
    });

  });
define("appkit/tests/unit/routes/index_test",
  ["appkit/routes/index","appkit/app"],
  function(Index, App) {
    "use strict";

    var route;

    module("Unit - IndexRoute", {
      setup: function(){
        route = App.__container__.lookup('route:index');
      }
    });

    test("it exists", function(){
      ok(route);
      ok(route instanceof Ember.Route);
    });

    test("#model", function(){
      deepEqual(route.model(), ['red', 'yellow', 'blue']);
    });

  });
//@ sourceMappingURL=tests.js.map