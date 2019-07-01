role :app, %w{50.19.173.84}

set :stage, :staging
set :branch, 'env/staging'
set :deploy_to, '/home/forge/staging.wirelessanalytics.com/'

set :tmp_dir, '/home/forge/staging.wirelessanalytics.com/tmp'

namespace :ops do

  desc 'Assets Compile'
    task :asset_compile do
        on roles(:app), in: :sequence, wait: 1 do
            execute "cd #{release_path} && npm install"
            execute "cd #{release_path} && npm run staging"
        end
    end
end

namespace :deploy do
  after :published, "ops:asset_compile"
end
