module "Auth Smoke", 
  setup: ->
    abc = 42
    console.debug "in setup"
    App.reset()

  teardown: ->
    Ember.run ->
      App.Auth.get("_session").clear()
      App.Auth.trigger "signOutSuccess"
      Em.Auth.Request.MyDummy.clearOptsList()
        

test "global exists", ->
  res = !!EmberAuth
  equal res, true

test "App has Auth object", ->
  res = !!App.Auth
  equal res, true

test 'login success - shows email shorter', ->
  helpers.loginSuccessfully().then ->
    res = $(".user-status").text().match("Signed In as user@fake.com")
    equal res[0],"Signed In as user@fake.com"
    equal Em.Auth.Request.MyDummy.getOptsList().length,1
    
test 'login success - saves token', ->
  helpers.loginSuccessfully().then ->
    equal App.Auth.get('authToken'),'token123'

test 'login failure', ->
  helpers.loginFail().then ->
    res = $(".user-status").text().match("Signed In")
    equal res,null
    equal Em.Auth.Request.MyDummy.getOptsList().length,1

test 'find after login', ->
  helpers.loginSuccessfully().then ->
    a = App.Post.find()
    equal Em.Auth.Request.MyDummy.getOptsList().length,2
    data = Em.Auth.Request.MyDummy.getOptsList()[1]
    equal "#{App.getServerUrl()}/posts",data.url
    equal "token123",data.data.auth_token

