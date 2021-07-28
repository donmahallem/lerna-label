/*
 * Package @donmahallem/lerna-label
 * Source https://donmahallem.github.io/lerna-label/
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

actionscore.startGroup(`Got started with config`);
actionscore.info(`PREFIX: ${config.PREFIX}`);
actionscore.info(`OWNER: ${pullRequestConfig.owner}`);
actionscore.info(`REPO: ${pullRequestConfig.repo}`);
actionscore.info(`PULL_NUMBER: ${pullRequestConfig.pull_number}`);
actionscore.endGroup();

const githubClient: Octokit = getOctokit(config.GITHUB_SECRET);

handle(githubClient, pullRequestConfig, config.PREFIX, './')
    .then((): void => {
        actionscore.info('Success');
    })
    .catch((err: any | Error): void => {
        actionscore.error(err);
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        actionscore.setFailed(err?.message || 'Error');
    });
