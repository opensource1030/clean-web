role :app, %w{10.1.20.25}

set :stage, :demo
set :deploy_to, '/home/deploy/webapps/clean_frontend'

set :log_level, :debug

set :ssh_options, {
  user: 'deploy'
}

set :tmp_dir, '/home/deploy/tmp'

namespace :deploy do

  after :published, "ops:asset_compile"

end
