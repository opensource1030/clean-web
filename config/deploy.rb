# config valid only for current version of Capistrano
set :application, 'clean-web'
set :repo_url, 'git@github.com:WirelessAnalytics/clean-web.git'

# Slack Notifications
set :slackistrano, {
    klass: Slackistrano::CustomMessaging,
    team: "wirelessanalytics",
    webhook: "https://hooks.slack.com/services/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",
    token: "xoxp-2153660998-7383443462-7449051621-4e69f4",
    channel:'#dev-ops'
}
# Compile

