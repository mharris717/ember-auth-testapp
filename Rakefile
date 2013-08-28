task :get do
  exec "cd /code/orig/ember_npm_projects/"
end

task :authlink do
  res = {}
  res["/code/orig/ember_npm_projects/ember-auth-testapp/vendor/ember-auth-easy/index.js"] = 
  "/code/orig/ember_npm_projects/ember-auth-easy/dist/ember-auth-easy.js"

  res["/code/orig/ember_npm_projects/ember-auth-testapp/vendor/ember-auth/dist/ember-auth.js"] = 
  "/code/orig/ember-auth/dist/ember-auth.js"

  res.each do |target,source|
    `rm #{target}`
    `ln -s #{source} #{target}`
  end
end

task :full_install do
  v = "vendor#{rand(10000000000)}"
  puts `mv vendor #{v} && mkdir vendor && mv #{v}/loader.js vendor && bower install && rm -r #{v}`
end