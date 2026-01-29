/**
 * Package @donmahallem/lerna-label
 * Source https://github.com/donmahallem/lerna-label/
 */

import { expect } from 'chai';
import 'mocha';
import { resolve } from 'path';
import { parseLernaPackages } from './parse-lerna-packages.js';
import type { IPackage } from './parse-lerna-packages.js';

describe('./parse-lerna-packages.ts', function () {
    const testDir = './tests';

    it('should parse lerna package roots correctly', async function (): Promise<void> {
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
