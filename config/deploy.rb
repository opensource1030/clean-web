# config valid only for current version of Capistrano
lock '3.3.5'

set :application, 'clean-frontend'
set :repo_url, 'git@github.com:WirelessAnalytics/clean-frontend.git'

# Compile
namespace :ops do

  desc 'Assets Compile'
    task :asset_compile do
        on roles(:app), in: :sequence, wait: 1 do
            execute "cd #{release_path} && npm install"
            execute "cd #{release_path} && bower install"
            execute "cd #{release_path} && ember build"
        end
    end

end
