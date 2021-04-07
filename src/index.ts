/*!
 * Source https://github.com/donmahallem/github-release-action
 */

import * as actionscore from '@actions/core';
import * as github from '@actions/github';
import { IOpts } from '@donmahallem/label-pr/dist/types/sync-pr-labels';
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
    owner: github.context.repo.owner,
    pull_number: github.context.payload.pull_request?.number || 0,
    repo: github.context.repo.repo,
};
const githubClient: github.GitHub = new github.GitHub(config.GITHUB_SECRET) as any;
handle(githubClient as any, pullRequestConfig, config.PREFIX, './').catch((err) => {
    actionscore.error(err);
    actionscore.setFailed(err.message || 'Error');
}).then(() => {
    actionscore.info('Success');
});
