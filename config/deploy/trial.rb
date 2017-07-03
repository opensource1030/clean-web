role :app, %w{54.87.193.65}

set :stage, :trial
set :branch, 'env/trial'
set :deploy_to, '/home/forge/trial.wirelessanalytics.com/'

set :log_level, :debug

set :ssh_options, {
  user: 'forge'
}

set :tmp_dir, '/home/forge/trial.wirelessanalytics.com/tmp'

namespace :ops do

  desc 'Assets Compile'
    task :asset_compile do
        on roles(:app), in: :sequence, wait: 1 do
            execute "cd #{release_path} && npm install"
            execute "cd #{release_path} && npm run trial"
        end
    end
end

namespace :deploy do
  after :published, "ops:asset_compile"
end
