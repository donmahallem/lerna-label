/**
 * Package @donmahallem/lerna-label
 * Source https://github.com/donmahallem/lerna-label/
 */

import { expect } from 'chai';
import { strict as esmock } from 'esmock';
import 'mocha';
import { resolve } from 'path';
import sinon from 'sinon';
import type { handle } from './handle.js';
import type { IPackage } from './parse-lerna-packages.js';

/* eslint-disable  @typescript-eslint/no-explicit-any */
describe('handle.ts', function () {
    let sandbox: sinon.SinonSandbox;

    before(function (): void {
        sandbox = sinon.createSandbox();
    });

    afterEach(function (): void {
        sandbox.reset();
    });

    after(function (): void {
        sandbox.restore();
    });

    describe('handle', function (): void {
        let getChangedFilesStub: sinon.SinonStub;
        let syncPRLabelsStub: sinon.SinonStub;
        let parseLernaPackages: sinon.SinonStub;
        let testMethod: typeof handle;

        before(async function (): Promise<void> {
            parseLernaPackages = sandbox.stub().named('parseLernaPackages');
            getChangedFilesStub = sandbox.stub().named('getChangedFiles');
            syncPRLabelsStub = sandbox.stub().named('syncPRLabels');
            testMethod = (
                await esmock('./handle', {
                    './parse-lerna-packages': { parseLernaPackages },
                    './pr-changed-files': {
                        getChangedFiles: getChangedFilesStub,
                    },
                    '@donmahallem/label-pr': {
                        syncPRLabels: syncPRLabelsStub,
                    },
                })
            ).handle as typeof handle;
        });

        it('a', async function (): Promise<void> {
            const testPackages: IPackage[] = [
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
            await testMethod('octokit' as any, 'pr opts' as any, undefined as any);
            expect(getChangedFilesStub.callCount).to.equal(1);
            expect(syncPRLabelsStub.callCount).to.equal(1);
            expect(syncPRLabelsStub.getCall(0).args).to.deep.eq(['octokit', 'pr opts' as any, ['dir1', 'dir2'], 'pkg']);
        });
    });
});
