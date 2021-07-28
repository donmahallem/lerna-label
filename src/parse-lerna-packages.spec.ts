/*
 * Package @donmahallem/lerna-label
 * Source https://donmahallem.github.io/lerna-label/
 */

import { expect } from 'chai';
import 'mocha';
import { resolve } from 'path';
import { parseLernaPackages, IPackage } from './parse-lerna-packages';

describe('./parse-lerna-packages.ts', () => {
    const testDir = './tests';
    it('should parse lerna package roots correctly', async (): Promise<void> => {
        const result: IPackage[] = await parseLernaPackages(testDir);
        expect(result).to.deep.equal([
            {
                basename: 'pkg1',
                location: resolve(testDir, 'packages', 'pkg1'),
                name: 'pkg1',
                rootPath: resolve(testDir),
            },
            {
                basename: 'pkg3',
                location: resolve(testDir, 'packages', 'pkg3'),
                name: '@anyscope/pkg3',
                rootPath: resolve(testDir),
                scope: '@anyscope',
            },
        ]);
    });
});
