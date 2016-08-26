# config valid only for current version of Capistrano
set :application, 'clean-frontend'
set :repo_url, 'git@github.com:WirelessAnalytics/clean-frontend.git'

# Slack Notifications
set :slack_team, "wirelessanalytics"
set :slack_webhook, "https://hooks.slack.com/services/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"
set :slack_token, "xoxp-2153660998-7383443462-7449051621-4e69f4"
set :slack_channel,'#dev-lobby'
set :slack_icon_emoji, ':rocket:'
set :slack_username, 'Deployment'
set :slack_revision, -> { `git rev-parse origin/#{fetch(:branch)}`.strip! }
set :slack_msg_updated, nil
set :slack_fallback_updated, "#{fetch(:slack_deploy_user)} deployed #{fetch(:application)} on #{fetch(:stage)}"
set :slack_fields_updated,
  [
    {
      title: "CLEAN FRONTEND",
      value: "<https://github.com/WirelessAnalytics/#{fetch(:application)}|#{fetch(:application)}>",
      short: true
    },
    {
      title: "Environment",
      value: fetch(:stage),
      short: true
    },
    {
      title: "Deployer",
      value: fetch(:slack_deploy_user),
      short: true
    },
    {
      title: "Revision",
      value: "<https://github.com/WirelessAnalytics/#{fetch(:application)}/commit/#{fetch(:slack_revision)}|#{fetch(:slack_revision)[0..6]}>",
      short: true
    }
  ]



# Compile
namespace :ops do

  desc 'Assets Compile'
    task :asset_compile do
        on roles(:app), in: :sequence, wait: 1 do
            execute "cd #{release_path} && npm install"
            execute "cd #{release_path} && bower install"
            execute "cd #{release_path} && gulp build"
        end
    end

end
