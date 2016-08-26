role :app, %w{204.156.175.49}

set :stage, :develop
set :branch, 'develop'
set :deploy_to, '/home/deploy/webapps/app'

set :log_level, :debug

set :ssh_options, {
  user: 'deploy'
}

set :tmp_dir, '/home/deploy/tmp'

namespace :deploy do

  after :published, "ops:asset_compile"

end
