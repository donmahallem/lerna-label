# {{ template:title }}
{{ template:badges }}

{{ template:description }}

## Details

This action labels your pull requests based on modified files within the pull request. 
It takes the package name and adds an optional prefix and adds an label.

If a package isn't touched anymore the tag will be removed.

## Usage

```
name: Workspace Package Labeler
on:
  pull_request:
    types: [opened, edited, synchronize]
    branches-ignore:
      - master

jobs:
  label:
    name: Label Package Pull Requests
    runs-on: ubuntu-latest
    steps:
      - name: "Checkout code"
        uses: actions/checkout@v2.3.4
      - name: Label the PR
        uses: donmahallem/lerna-label@{{ pkg.version}}
        with:
          github_secret: "${ { secrets.GITHUB_TOKEN } }"
          prefix: "pkg"
```
