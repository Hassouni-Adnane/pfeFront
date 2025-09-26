# Project Setup

## Install node_modules from package/package-lock.json

```bash
# optional but recommended: match the Node version you used
nvm use            # if you have a .nvmrc
# install exactly what the lockfile says (clean + deterministic)
npm ci             # or: yarn install --frozen-lockfile / pnpm i --frozen-lockfile

