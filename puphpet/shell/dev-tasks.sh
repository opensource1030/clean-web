#!/bin/bash

# start RVM using in ZSH
echo "source /etc/profile.d/rvm.sh" >> ~/.zshrc
sudo usermod -aG rvm vagrant
source ~/.zshrc

echo "cd /vagrant" >> ~/.zshrc
echo 'Done with dev tasks.'
