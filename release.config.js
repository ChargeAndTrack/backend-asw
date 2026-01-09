import config, { plugins } from 'semantic-release-preconfigured-conventional-commits';
plugins.push(
    "@semantic-release/github",
    "@semantic-release/git",
)
export default config
