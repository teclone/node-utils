import {mkDirSync, isProdEnv, isDevEnv, getEntryPath, isTestEnv, joinPaths, resolvePaths} from '../src';
import * as fs from 'fs';
import * as path from 'path';
import rimraf from 'rimraf';

describe('Util', function() {

    describe('.joinPaths(...paths: string[]): string', function() {
        it(`should join the path arguments and return the result`, function() {
            expect(joinPaths('/users', '1/profile')).toEqual('/users/1/profile');
        });
    });

    describe('.resolvePaths(...paths: string[]): string', function() {
        it(`should resolve the path arguments and return the result`, function() {
            expect(resolvePaths('/users', '1/profile')).toEqual('/users/1/profile');
            expect(resolvePaths('/users', '/1/profile')).toEqual('/1/profile');
        });
    });

    describe('.getEntryPath()', function() {
        it(`should return the project absolute root directory by inspection`, function() {
            expect(getEntryPath()).toEqual(path.resolve(__dirname, '../'));
        });
    });

    describe('.mkDirSync(dirPath: string)', function() {
        it(`should synchronously and recursively create the given directory if it does
            not exist`, function() {
            const dirPath = path.resolve(__dirname, '../../arbitrary');

            expect(fs.existsSync(dirPath)).toBeFalsy();
            mkDirSync(dirPath);
            expect(fs.existsSync(dirPath)).toBeTruthy();
            fs.rmdirSync(dirPath);
        });

        it(`should extract the directory path if path points to a file before proceeding`, function() {
            const dirPath = path.resolve(__dirname, '../../arbitrary/modules/package.json');

            expect(fs.existsSync(dirPath)).toBeFalsy();
            mkDirSync(dirPath);
            expect(fs.existsSync(dirPath)).toBeFalsy();
            expect(fs.existsSync(path.resolve(dirPath, '../'))).toBeTruthy();
            rimraf.sync(path.resolve(dirPath, '../../'));
        });

        it(`should do nothing if directory exists`, function() {
            const dirPath = path.resolve(__dirname, '../../src');
            mkDirSync(dirPath);
        });
    });

    describe('.isProdEnv()', function() {
        it(`should return true if NODE_ENV starts with prod, case insensitive`, function() {
            process.env.NODE_ENV = 'production';
            expect(isProdEnv()).toBeTruthy();
        });

        it(`should return false if NODE_ENV does not start with prod`, function() {
            process.env.NODE_ENV = 'Droduction';
            expect(isProdEnv()).toBeFalsy();
        });
    });

    describe('.isTestEnv()', function() {
        it(`should return true if NODE_ENV starts with test, case insensitive`, function() {
            process.env.NODE_ENV = 'test';
            expect(isTestEnv()).toBeTruthy();
        });

        it(`should return false if NODE_ENV does not start with test, case insensitive`, function() {
            process.env.NODE_ENV = 'Production';
            expect(isTestEnv()).toBeFalsy();
        });
    });

    describe('.isDevEnv()', function() {
        it(`should return true if NODE_ENV does not start with prod, case insensitive`, function() {
            process.env.NODE_ENV = 'Droduction';
            expect(isDevEnv()).toBeTruthy();
        });

        it(`should return false if NODE_ENV does start with prod, case insensitive`, function() {
            process.env.NODE_ENV = 'Production';
            expect(isDevEnv()).toBeFalsy();
        });
    });
});