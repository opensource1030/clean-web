role :app, %w{54.90.108.69}

set :stage, :development
set :branch, 'master'
set :deploy_to, '/home/forge/default'

set :log_level, :debug

set :ssh_options, {
  user: 'forge'
}

set :tmp_dir, '/home/forge/default/tmp'
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
