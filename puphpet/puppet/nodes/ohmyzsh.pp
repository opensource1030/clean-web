class { 'ohmyzsh': }

# for a single user
ohmyzsh::install { 'vagrant': }

ohmyzsh::theme { 'vagrant': theme => 'muse' } # specific theme


ohmyzsh::plugins { 'vagrant': plugins => 'git cp command-not-found git-extras gnu-utils history screen laravel4 wd git-flow' }