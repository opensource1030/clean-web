role :app, %w{54.87.193.65}

set :stage, :development
set :branch, 'master'
set :keep_releases, 3
set :deploy_to, '/home/forge/staging.wirelessanalytics.com/'

set :log_level, :debug

set :ssh_options, {
  user: 'forge'
}

set :tmp_dir, '/home/forge/staging.wirelessanalytics.com/tmp'

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
