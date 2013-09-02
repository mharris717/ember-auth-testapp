module "Registration", 
  setup: ->
    App.reset()

  teardown: ->
    Ember.run ->
      App.Auth.get("_session").clear()
      App.Auth.trigger "signOutSuccess"
      Em.Auth.Request.MyDummy.clearOptsList()

test "smoke", ->
  equal 2,2

if true
  test "register smoke", ->
    email = "test@fake.com"
    password = "p123"
    helpers.register(email,password).then ->
      equal Em.Auth.Request.MyDummy.getOptsList().length,1
      data = Em.Auth.Request.MyDummy.getOptsList()[0]
      console.debug "opts"
      console.debug data

      equal data.url,"#{App.getServerUrl()}/users.json"
      equal data.type,"POST"

      equal data.data.user.email, email
      equal data.data.user.password, password

      equal $(".registered").text().trim(),"Successfully Registered"
      equal App.get('currentPath'),'registered'
