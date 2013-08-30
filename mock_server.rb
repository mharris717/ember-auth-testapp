require 'sinatra'
require 'json'
require 'mharris_ext'

before do
  response.headers["Access-Control-Allow-Origin"] = "http://localhost:8000"
  response.headers["Access-Control-Allow-Methods"] = "GET, POST, PUT, OPTIONS"
  response.headers["Access-Control-Allow-Headers"] = "Origin, X-Requested-With, Content-Type, Accept, X-Prototype-Version, X-CSRF-Token"
end

class User
  include FromHash
  attr_accessor :email, :password, :id
  def auth_token
    "token123"
  end
  def as_json
    {email: email, auth_token: auth_token}
  end
end

helpers do
  def users
    res = []
    res << User.new(:email => "user@fake.com", :password => "password123", :id => 1)
    res
  end
  def get_user(params)
    users.find { |x| x.email == params['email'] && x.password == params['password'] }
  end
end


post "/users/sign_in.json" do
  content_type :json
  params = JSON.parse(request.body.read)
  user = get_user(params)
  
  if user
    {user_id: user.id, auth_token: user.auth_token}.to_json
  else
    status 404
    {}.to_json
  end
end

get "/users/:id" do
  content_type :json
  user = users.find { |x| x.id == params[:id].to_i }
  raise "bad token" unless params[:auth_token] == user.auth_token
  {user: user.as_json, meta: {}}.to_json
end


options "*" do
  content_type :json
  puts "OPTIONS #{params.inspect}"
  halt 200
end


