#!/bin/bash

# Get the current version
# depends on semver - https://github.com/jlindsey/semantic
CURR_VER="$(semver)"
PROJECT_NAME="CLEAN Web"

# config files to update:
gsed -i "13s/VERSION:.*/VERSION:'${CURR_VER}'/" ./config/dev.env.js
gsed -i "13s/VERSION:.*/VERSION:'${CURR_VER}'/" ./config/staging.env.js
gsed -i "13s/VERSION:.*/VERSION:'${CURR_VER}'/" ./config/prod.env.js
gsed -i "13s/VERSION:.*/VERSION:'${CURR_VER}'/" ./config/test.env.js
gsed -i "13s/VERSION:.*/VERSION:'${CURR_VER}'/" ./config/trial.env.js
gsed -i "13s/VERSION:.*/VERSION:'${CURR_VER}'/" ./config/demo.env.js

echo "Updated ${PROJECT_NAME} to ${CURR_VER}"
