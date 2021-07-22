/*!
 * Source https://github.com/donmahallem/lerna-label
 */

import * as actionscore from '@actions/core';
import { context as githubContext, getOctokit } from '@actions/github';
import { IOpts } from '@donmahallem/label-pr/dist/types/sync-pr-labels';
import { Octokit } from '@octokit/core';
import { IConfig } from './config';
import { handle } from './handle';

const config: IConfig = {
    GITHUB_SECRET: actionscore.getInput('github_secret', {
        required: true,
    }),
    PREFIX: actionscore.getInput('prefix', {
        required: false,
    }),
};
const pullRequestConfig: IOpts = {
    owner: githubContext.repo.owner,
    pull_number: githubContext.payload.pull_request?.number || 0,
    repo: githubContext.repo.repo,
};
const githubClient: Octokit = getOctokit(config.GITHUB_SECRET);
handle(githubClient, pullRequestConfig, config.PREFIX, './')
    .catch((err: any): void => {
        actionscore.error(err);
        actionscore.setFailed(err.message || 'Error');
    }).then((): void => {
        actionscore.info('Success');
    });
