/*
 * Package @donmahallem/lerna-label
 * Source https://donmahallem.github.io/lerna-label/
 */

import * as syncPRLabels from '@donmahallem/label-pr';
import { expect } from 'chai';
import 'mocha';
import { resolve } from 'path';
import sinon from 'sinon';
import { handle } from './handle';
import * as lernaPackages from './parse-lerna-packages';
import * as prChangedFiles from './pr-changed-files';

describe('handle.ts', () => {
    let sandbox: sinon.SinonSandbox;
    before((): void => {
        sandbox = sinon.createSandbox();
    });

    afterEach((): void => {
        sandbox.reset();
    });
    after((): void => {
        sandbox.restore();
    });
    describe('handle', (): void => {
        let getChangedFilesStub: sinon.SinonStub;
        let syncPRLabelsStub: sinon.SinonStub;
        let parseLernaPackages: sinon.SinonStub;
        before((): void => {
            parseLernaPackages = sandbox.stub(lernaPackages, 'parseLernaPackages');
            getChangedFilesStub = sandbox.stub(prChangedFiles, 'getChangedFiles');
            syncPRLabelsStub = sandbox.stub(syncPRLabels, 'syncPRLabels');
        });
        it('a', async (): Promise<void> => {
            const testPackages: lernaPackages.IPackage[] = [
                {
                    location: resolve('./packages/dir1'),
                    name: 'dir1',
                    rootPath: resolve('./'),
                },
                {
                    location: resolve('./packages/dir2'),
                    name: 'dir2',
                    rootPath: resolve('./'),
                },
            ];
            parseLernaPackages.resolves(testPackages);
            getChangedFilesStub.resolves(['packages/dir1/any.json', 'packages/dir2/any.json', 'unknown/dir3/any.json']);
            syncPRLabelsStub.resolves();
            await handle('octokit' as any, 'pr opts' as any, undefined as any);
            expect(getChangedFilesStub.callCount).to.equal(1);
            expect(syncPRLabelsStub.callCount).to.equal(1);
            expect(syncPRLabelsStub.getCall(0).args).to.deep.eq(['octokit', 'pr opts' as any, ['dir1', 'dir2'], 'pkg']);
        });
    });
});
