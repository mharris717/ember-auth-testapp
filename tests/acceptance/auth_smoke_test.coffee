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

loginWith = (email,password) ->
  visit("/")
  .fillIn(".login-form .email-field input",email)
  .fillIn(".login-form .password-field input",password)
  .click(".login-form button")

loginSuccessfully = ->
  loginWith("user@fake.com","password123")

loginFail = ->
  loginWith("user@fake.com","passwordwrong")

test 'login success - shows email shorter', ->
  loginSuccessfully().then ->
    res = $(".user-status").text().match("Signed In as user@fake.com")
    equal res[0],"Signed In as user@fake.com"
    equal Em.Auth.Request.MyDummy.getOptsList().length,1
    
test 'login success - saves token', ->
  loginSuccessfully().then ->
    equal App.Auth.get('authToken'),'token123'

test 'login failure', ->
  loginFail().then ->
    res = $(".user-status").text().match("Signed In")
    equal res,null
    equal Em.Auth.Request.MyDummy.getOptsList().length,1

test 'find after login', ->
  loginSuccessfully().then ->
    a = App.Post.find()
    equal Em.Auth.Request.MyDummy.getOptsList().length,2
    data = Em.Auth.Request.MyDummy.getOptsList()[1]
    equal "#{App.getServerUrl()}/posts",data.url
    equal "token123",data.data.auth_token

register = (email,password) ->
  visit("/register")
  .fillIn(".register-form .email-field input",email)
  .fillIn(".register-form .password-field input",password)
  .click(".register-form button")

test "register smoke", ->
  email = "test@fake.com"
  password = "p123"
  register(email,password).then ->
    equal Em.Auth.Request.MyDummy.getOptsList().length,1
    data = Em.Auth.Request.MyDummy.getOptsList()[0]
    console.debug "opts"
    console.debug data
    equal data.data.user.email, email
    equal data.data.user.password, password
