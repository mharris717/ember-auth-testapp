module "Auth Smoke", 
  setup: ->
    abc = 42
    console.debug "in setup"
    App.reset()

  teardown: ->
    Ember.run ->
      App.Auth.get("_session").clear()
      App.Auth.trigger "signOutSuccess"
        

test "global exists", ->
  res = !!EmberAuth
  equal res, true

test "App has Auth object", ->
  res = !!App.Auth
  equal res, true

test 'login success - shows email', ->
  visit("/")
  .fillIn(".login-form .email-field input","user@fake.com")
  .fillIn(".login-form .password-field input","password123")
  .click(".login-form button").then ->
    res = $(".user-status").text().match("Signed In as user@fake.com")
    equal res[0],"Signed In as user@fake.com"

test 'login failure', ->
  visit("/")
  .fillIn(".login-form .email-field input","bad@fake.com")
  .fillIn(".login-form .password-field input","password123")
  .click(".login-form button").then ->
    res = $(".user-status").text().match("Signed In")
    equal res,null
    console.debug App.Auth.get('user')