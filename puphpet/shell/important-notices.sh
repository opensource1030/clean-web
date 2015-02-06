#!/bin/bash

# sudo echo "source /etc/profile.d/rvm.sh" >> ~/.zshrc
# sudo usermod -aG rvm vagrant
# source ~/.zshrc

# echo "cd /vagrant" >> ~/.zshrc
# echo 'Done with dev tasks.'

VAGRANT_CORE_FOLDER=$(cat '/.puphpet-stuff/vagrant-core-folder.txt')

if [[ -f '/.puphpet-stuff/displayed-important-notices' ]]; then
    exit 0
fi

cat "${VAGRANT_CORE_FOLDER}/shell/ascii-art/important-notices.txt"

touch '/.puphpet-stuff/displayed-important-notices'

