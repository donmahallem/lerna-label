# {{ template:title }}
{{ template:badges }}

{{ template:description }}

## Usage

Run the following command to install the package:

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
