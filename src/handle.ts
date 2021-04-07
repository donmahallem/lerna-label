/*!
 * Source https://github.com/donmahallem/lerna-label
 */

import { syncPRLabels } from '@donmahallem/label-pr';
import { IOpts } from '@donmahallem/label-pr/dist/types/sync-pr-labels';
import { Octokit } from '@octokit/core';
import { resolve } from 'path';
import { parseLernaPackages, IPackage } from './parse-lerna-packages';
import { getChangedFiles } from './pr-changed-files';

export const handle = async (octokit: Octokit,
    opts: IOpts,
    prefix: string = 'pkg',
    cwd: string = './'): Promise<void> => {
    const lernaCfg: IPackage[] = await parseLernaPackages(cwd);
    const changedFiles: string[] = await getChangedFiles(octokit, opts);
    const resolvedChangedFiles: string[] = changedFiles
        .map((filename: string): string => {
            return resolve(cwd, filename);
        });
    const labels: string[] = lernaCfg.filter((item: IPackage): boolean => {
        return resolvedChangedFiles
            .reduce((prev: boolean, curr: string): boolean => {
                return prev || curr.startsWith(item.location);
            }, false);
    }).map((pkg: IPackage): string => pkg.name);
    await syncPRLabels(octokit, opts, labels, prefix);
};
