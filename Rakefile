task :get do
  exec "cd /code/orig/ember_npm_projects/"
end

task :authlink do
  res = {}
  dir = File.expand_path(File.dirname(__FILE__))
  res["#{dir}/vendor/ember-auth-easy/index.js"] = 
  "/code/orig/ember_npm_projects/ember-auth-easy/dist/ember-auth-easy.js"

  res["#{dir}/vendor/ember-auth/dist/ember-auth.js"] = 
  "/code/orig/ember-auth/dist/ember-auth.js"

  res.each do |target,source|
    `rm #{target}`
    `ln -s #{source} #{target}`
  end
end

task :full_install do
  v = "vendor#{rand(10000000000)}"
  puts `mv vendor #{v} && mkdir vendor && mv #{v}/loader.js vendor && bower install && rm -r #{v} && cp vendor/ember/ember.js vendor/ember/index.js`
end

def run_shell_test(cmd)
  puts cmd
  res = `#{cmd}`
  puts res
  raise "bad test | #{cmd} | #{res}" unless $?.success?
  res
end

task :test do
  run_shell_test "npm test"
end

namespace :lib do
  task :release do
    run_shell_test "cd /code/orig/ember_npm_projects/ember-auth-easy && rake release"
  end
end

namespace :app do
  task :release => :test do
    run_shell_test "git push origin master:master"
  end
end

task :release => ['app:release','lib:release']