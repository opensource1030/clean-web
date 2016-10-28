# role :app, %w{204.156.175.49}
role :app, %w{10.1.20.24}

set :stage, :production
set :branch, 'env/prod'
set :deploy_to, '/home/deploy/webapps/app'

set :log_level, :debug

set :ssh_options, {
  user: 'deploy'
}

set :tmp_dir, '/home/deploy/tmp'

namespace :deploy do
  after :published, "ops:asset_compile"
end
