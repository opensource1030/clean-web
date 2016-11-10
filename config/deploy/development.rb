role :app, %w{204.156.175.49}

set :stage, :development
set :branch, 'master'
set :deploy_to, '/home/deploy/webapps/clean/app'

set :log_level, :debug

set :ssh_options, {
  user: 'deploy'
}

set :tmp_dir, '/home/deploy/tmp'
namespace :ops do

  desc 'Assets Compile'
    task :asset_compile do
        on roles(:app), in: :sequence, wait: 1 do
            execute "cd #{release_path} && npm install"
            execute "cd #{release_path} && npm run develop"
        end
    end
end

namespace :deploy do
  after :published, "ops:asset_compile"
end
