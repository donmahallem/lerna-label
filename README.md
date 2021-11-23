<!-- ⚠️ This README has been generated from the file(s) "./readme_blueprint.md" ⚠️-->
[![-----------------------------------------------------](https://raw.githubusercontent.com/andreasbm/readme/master/assets/lines/water.png)](#h1-aligncenterdonmahallemlerna-labelh1)

# ➤ <h1 align="center">@donmahallem/lerna-label</h1>
<p align="center">
		<a href="https://github.com/donmahallem/lerna-label/actions?query=workflow%3ATest+branch%3Amain"><img alt="Test" src="https://github.com/donmahallem/lerna-label/workflows/Test/badge.svg?branch=main&event=push" height="20"/></a>
<a href="https://codecov.io/gh/donmahallem/lerna-label/branch/main"><img alt="codecov" src="https://codecov.io/gh/donmahallem/lerna-label/branch/main/graph/badge.svg" height="20"/></a>
<a href="https://github.com/donmahallem/lerna-label/blob/main/LICENSE"><img alt="GitHub license" src="https://img.shields.io/github/license/donmahallem/lerna-label" height="20"/></a>
<a href="https://github.com/donmahallem/lerna-label"><img alt="David" src="https://img.shields.io/david/donmahallem/lerna-label" height="20"/></a>
<a href="https://github.com/donmahallem/lerna-label"><img alt="David" src="https://img.shields.io/david/dev/donmahallem/lerna-label" height="20"/></a>
<a href="https://github.com/donmahallem/lerna-label/graphs/contributors"><img alt="GitHub contributors" src="https://img.shields.io/github/contributors-anon/donmahallem/lerna-label" height="20"/></a>
	</p>


<p align="center">
  <b>Tags Github Pull Requests with affected Lerna packages</b></br>
  <sub><sub>
</p>

<br />



[![-----------------------------------------------------](https://raw.githubusercontent.com/andreasbm/readme/master/assets/lines/water.png)](#details)

## ➤ Details

This action labels your pull requests based on modified files within the pull request. 
It takes the package name and adds an optional prefix to it before setting it as a label.
Other labels should not be touched by this action.


[![-----------------------------------------------------](https://raw.githubusercontent.com/andreasbm/readme/master/assets/lines/water.png)](#security-considerations)

## ➤ Security Considerations

This action should be run on 'pull_request_target' events BUT consider to not checkout the target commit. For information about this read [here](https://securitylab.github.com/research/github-actions-preventing-pwn-requests/)
Additionally this prevents malicious actors to spam your repository with new tags! 


[![-----------------------------------------------------](https://raw.githubusercontent.com/andreasbm/readme/master/assets/lines/water.png)](#example-projects)

## ➤ Example Projects

This action is used for example by [donmahallem/js-libs](https://github.com/donmahallem/js-libs/pulls)


[![-----------------------------------------------------](https://raw.githubusercontent.com/andreasbm/readme/master/assets/lines/water.png)](#example-config)

## ➤ Example Config

This config show cases a simple workflow to label pull requests with already known packages.
```
name: Workspace Package Labeler
on:
  pull_request_target:
    types: [opened, edited, synchronize]
    
jobs:
  label:
    name: Label Package Pull Requests
    runs-on: ubuntu-latest
    steps:
      - name: "Checkout code"
        uses: actions/checkout@v2.3.4
      - name: Label the PR
        uses: donmahallem/lerna-label@0.1.8
        with:
          github_secret: "${ { secrets.GITHUB_TOKEN } }"
          prefix: "pkg"
```


[![-----------------------------------------------------](https://raw.githubusercontent.com/andreasbm/readme/master/assets/lines/water.png)](#contributors)

## ➤ Contributors
	

| [<img alt="donmahallem" src="https://avatars.githubusercontent.com/u/4698322?v=4" width="100">](https://github.com/donmahallem) |
|:--------------------------------------------------:|
| [donmahallem](https://github.com/donmahallem)    |
| 💻                                               |
| 🐛                                               |

