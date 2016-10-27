# config valid only for current version of Capistrano
set :application, 'clean-frontend'
set :repo_url, 'git@github.com:WirelessAnalytics/clean-frontend.git'

# Slack Notifications
set :slackistrano, {
    klass: Slackistrano::CustomMessaging,
    team: "wirelessanalytics",
    webhook: "https://hooks.slack.com/services/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",
    token: "xoxp-2153660998-7383443462-7449051621-4e69f4",
    channel:'#dev-ops'
}

# Compile
namespace :ops do

  desc 'Assets Compile'
    task :asset_compile do
        on roles(:app), in: :sequence, wait: 1 do
            execute "cd #{release_path} && npm install"
            execute "cd #{release_path} && npm run build"
        end
    end

end
