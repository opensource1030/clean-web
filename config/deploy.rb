# config valid only for current version of Capistrano
set :application, 'clean-web'
set :repo_url, 'git@github.com:WirelessAnalytics/clean-web.git'

set :keep_releases, 3

set :log_level, :debug

set :ssh_options, {
  user: 'forge'
}
