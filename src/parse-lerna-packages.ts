/**
 * Package @donmahallem/lerna-label
 * Source https://github.com/donmahallem/lerna-label/
 */

import { Package } from '@lerna/package';
import { getPackages } from '@lerna/project';
import npa from 'npm-package-arg';

export interface IPackage {
    location: string;
    name: string;
    rootPath: string;
    scope?: string;
}

/**
 * naïvely splits package name into optional scope and basename
 * @param {string} name package name
 * @returns {SplitPackage} package name by scope
 */
const parsePackageName = (
    name: string
): {
    basename: string;
    scope?: string;
} => {
    const resolved = npa(name);
    const basename: string = resolved.scope ? resolved.name!.substring(resolved.scope.length + 1) : resolved.name!;
    return resolved.scope
        ? {
              basename,
              scope: resolved.scope,
          }
        : {
              basename,
          };
};
export const parseLernaPackages = async (cwd: string): Promise<IPackage[]> => {
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
