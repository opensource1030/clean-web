role :app, %w{34.229.80.114}

set :stage, :production
set :branch, 'env/prod'
set :deploy_to, '/home/forge/app.wirelessanalytics.com/'

set :log_level, :debug

set :ssh_options, {
  user: 'forge'
}

set :tmp_dir, '/home/forge/app.wirelessanalytics.com/tmp'

namespace :ops do

  desc 'Assets Compile'
    task :asset_compile do
        on roles(:app), in: :sequence, wait: 1 do
            execute "cd #{release_path} && npm install"
            execute "cd #{release_path} && npm run build"
        end
    end
end

namespace :deploy do
  after :published, "ops:asset_compile"
end
