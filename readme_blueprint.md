# {{ template:title }}

{{ template:badges }}

{{ template:description }}

## Details

This action labels your pull requests based on modified files within the pull request.
It takes the package name and adds an optional prefix to it before setting it as a label.
Other labels should not be touched by this action.

## Security Considerations

This action should be run on 'pull_request_target' events BUT consider to not checkout the target commit.
For information about this read [here](https://securitylab.github.com/research/github-actions-preventing-pwn-requests/).
Additionally this prevents malicious actors to spam your repository with new tags!

## Example Projects

This action is used for example by [donmahallem/js-libs](https://github.com/donmahallem/js-libs/pulls)

## Example Config

This config show cases a simple workflow to label pull requests with already known packages.

```yaml
name: Workspace Package Labeler
on:
    pull_request_target:
        types: [opened, edited, synchronize]

jobs:
    label:
        name: Label Package Pull Requests
        runs-on: ubuntu-latest
        steps:
            - name: 'Checkout code'
              uses: actions/checkout@v2.3.4
            - name: Label the PR
              uses: donmahallem/lerna-label@{{ pkg.version}}
              with:
                  github_secret: '${ { secrets.GITHUB_TOKEN } }'
                  prefix: 'pkg'
```

{{ template:contributors }}
