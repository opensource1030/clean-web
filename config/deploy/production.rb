# role :app, %w{204.156.175.49}
role :app, %w{10.1.20.24}

set :stage, :production
set :branch, 'env/prod'
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
            execute "cd #{release_path} && npm run build"
        end
    end
end

namespace :deploy do
  after :published, "ops:asset_compile"
end
