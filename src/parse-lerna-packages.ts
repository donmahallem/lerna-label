/*
 * Package @donmahallem/lerna-label
 * Source https://donmahallem.github.io/lerna-label/
 */

import { getPackages } from '@lerna/project';

export interface IPackage {
    location: string;
    name: string;
    rootPath: string;
    scope?: string;
}

const packageRegex = /^(@[a-z\d][\w\-.]+\/)?(.+)$/;
/** naïvely splits package name into optional scope and basename */
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
    const pkgs: IPackage[] = await getPackages(cwd);

    return pkgs.map((pkg: IPackage): IPackage => {
        return {
            location: pkg.location,
            name: pkg.name,
            rootPath: pkg.rootPath,
            ...parsePackageName(pkg.name),
        };
    });
};
