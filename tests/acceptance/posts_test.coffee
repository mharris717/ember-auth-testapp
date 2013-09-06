module "Posts Test", 
  setup: ->
    App.reset()

  teardown: ->
    Ember.run ->
      App.Auth.get("_session").clear()
      App.Auth.trigger "signOutSuccess"
      Em.Auth.Request.MyDummy.clearOptsList()

test 'posts index', ->
  visit("/posts").then ->
    equal $(".post").length,2