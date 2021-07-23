<!-- ⚠️ This README has been generated from the file(s) "./readme_blueprint.md" ⚠️-->
[![-----------------------------------------------------](https://raw.githubusercontent.com/andreasbm/readme/master/assets/lines/water.png)](#h1-aligncenterdonmahallemlerna-labelh1)

# ➤ <h1 align="center">@donmahallem/lerna-label</h1>
<p align="center">
		<a href="https://github.com/donmahallem/lerna-label/actions?query=workflow%3ATest+branch%3Amain"><img alt="Test" src="https://github.com/donmahallem/lerna-label/workflows/Test/badge.svg?branch=main&event=push" height="20"/></a>
<a href="https://codecov.io/gh/donmahallem/lerna-label/branch/main"><img alt="codecov" src="https://codecov.io/gh/donmahallem/lerna-label/branch/main/graph/badge.svg" height="20"/></a>
<a href="https://github.com/donmahallem/lerna-label/blob/main/LICENSE"><img alt="GitHub license" src="https://img.shields.io/github/license/donmahallem/lerna-label" height="20"/></a>
<a href="https://github.com/donmahallem/lerna-label"><img alt="David" src="https://img.shields.io/david/dev/donmahallem/lerna-label" height="20"/></a>
<a href="https://github.com/donmahallem/lerna-label/graphs/contributors"><img alt="GitHub contributors" src="https://img.shields.io/github/contributors-anon/donmahallem/lerna-label" height="20"/></a>
	</p>


<p align="center">
  <b>Require Labels for Github Actions</b></br>
  <sub><sub>
</p>

<br />



[![-----------------------------------------------------](https://raw.githubusercontent.com/andreasbm/readme/master/assets/lines/water.png)](#details)

## ➤ Details

This action labels your pull requests based on modified files within the pull request. 
It takes the package name and adds an optional prefix and adds an label.

If a package isn't touched anymore the tag will be removed.


[![-----------------------------------------------------](https://raw.githubusercontent.com/andreasbm/readme/master/assets/lines/water.png)](#usage)

## ➤ Usage

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
        uses: donmahallem/lerna-label@0.0.6
        with:
          github_secret: "${ { secrets.GITHUB_TOKEN } }"
          prefix: "pkg"
```
