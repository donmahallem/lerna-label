/**
 * Package @donmahallem/lerna-label
 * Source https://github.com/donmahallem/lerna-label/
 */

import * as actionscore from '@actions/core';
import { syncPRLabels } from '@donmahallem/label-pr';
import { IOpts } from '@donmahallem/label-pr';
import { Octokit } from '@octokit/core';
import { resolve } from 'path';
import { parseLernaPackages } from './parse-lerna-packages.js';
import type { IPackage } from './parse-lerna-packages.js';
import { getChangedFiles } from './pr-changed-files.js';

export const handle = async (octokit: Octokit, opts: IOpts, prefix = 'pkg', cwd = './'): Promise<void> => {
    const lernaCfg: IPackage[] = await parseLernaPackages(cwd);
    const changedFiles: string[] = await getChangedFiles(octokit, opts);
    actionscore.startGroup(`Found ${lernaCfg.length} lerna packages`);
    lernaCfg.forEach((pck: IPackage): void => {
        actionscore.info(`Package: ${pck.name}`);
    });
    actionscore.endGroup();
    actionscore.startGroup(`Found ${changedFiles.length} changed files`);
    changedFiles.forEach((pck: string): void => {
        actionscore.info(pck);
    });
    actionscore.endGroup();
    const resolvedChangedFiles: string[] = changedFiles.map((filename: string): string => {
        return resolve(cwd, filename);
    });
    const labels: string[] = lernaCfg
        .filter((item: IPackage): boolean => {
            return resolvedChangedFiles.reduce((prev: boolean, curr: string): boolean => {
                return prev || curr.startsWith(item.location);
            }, false);
        })
        .map((pkg: IPackage): string => pkg.name);
    await syncPRLabels(octokit, opts, labels, prefix);
};
