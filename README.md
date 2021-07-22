<!-- ⚠️ This README has been generated from the file(s) "./readme_blueprint.md" ⚠️-->
[![-----------------------------------------------------](https://raw.githubusercontent.com/andreasbm/readme/master/assets/lines/water.png)](#h1-aligncenterdonmahallemlerna-labelh1)

# ➤ <h1 align="center">@donmahallem/lerna-label</h1>
<p align="center">
		<a href="https://github.com/donmahallem/js-libs/actions?query=workflow%3ATest+branch%3Amaster"><img alt="Test" src="https://github.com/donmahallem/js-libs/workflows/Test/badge.svg?branch=master&event=push" height="20"/></a>
<a href="https://codecov.io/gh/donmahallem/js-libs/branch/master"><img alt="codecov" src="https://codecov.io/gh/donmahallem/js-libs/branch/master/graph/badge.svg" height="20"/></a>
<a href="https://github.com/donmahallem/js-libs/releases"><img alt="GitHub release (latest SemVer)" src="https://img.shields.io/github/v/release/donmahallem/js-libs?sort=semver" height="20"/></a>
<a href="https://github.com/donmahallem/js-libs/blob/master/LICENSE"><img alt="GitHub license" src="https://img.shields.io/github/license/donmahallem/js-libs" height="20"/></a>
<a href="https://github.com/donmahallem/js-libs"><img alt="David" src="https://img.shields.io/david/dev/donmahallem/js-libs" height="20"/></a>
<a href="https://github.com/donmahallem/js-libs/graphs/contributors"><img alt="GitHub contributors" src="https://img.shields.io/github/contributors-anon/donmahallem/js-libs" height="20"/></a>
	</p>


<p align="center">
  <b>Require Labels for Github Actions</b></br>
  <sub><sub>
</p>

<br />



[![-----------------------------------------------------](https://raw.githubusercontent.com/andreasbm/readme/master/assets/lines/water.png)](#usage)

## ➤ Usage

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
        uses: donmahallem/lerna-label@0.0.5
        with:
          github_secret: "${ { secrets.GITHUB_TOKEN } }"
          prefix: "pkg"
```
