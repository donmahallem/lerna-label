/*
 * Package @donmahallem/lerna-label
 * Source https://github.com/donmahallem/lerna-label/
 */

import { Package } from '@lerna/package';
import { getPackages } from '@lerna/project';

export interface IPackage {
    location: string;
    name: string;
    rootPath: string;
    scope?: string;
}

const packageRegex = /^(@[a-z\d][\w\-.]+\/)?(.+)$/;
/**
 * The complete Triforce, or one or more components of the Triforce.
 *
 * @typedef {Object} SplitPackage
 * @property {string} basename - Package name without scope
 * @property {string} [scope] - If provided the package scope
 */
/**
 * naïvely splits package name into optional scope and basename
 *
 * @param {string} name package name
 * @returns {SplitPackage} package name by scope
 */
const parsePackageName = (
    name: string
): {
    basename: string;
    scope?: string;
} => {
    const splits: RegExpMatchArray | null = packageRegex.exec(name);
    // tslint:disable-next-line:triple-equals
    if (splits == undefined) {
        throw new Error('Could not parse package name');
    }
    // tslint:disable-next-line:triple-equals
    return splits[1] != undefined
        ? {
              basename: splits[2],
              scope: splits[1].slice(0, -1),
          }
        : {
              basename: splits[2],
          };
};
export const parseLernaPackages = async (cwd: string): Promise<IPackage[]> => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call
    const pkgs: Package[] = await getPackages(cwd);

    return pkgs.map((pkg: Package): IPackage => {
        return {
            location: pkg.location,
            name: pkg.get('name'),
            rootPath: pkg.rootPath,
            ...parsePackageName(pkg.get('name')),
        };
    });
};
