import * as path from 'path';
import * as fs from 'fs';

export const joinPaths = (...paths: string[]): string => {
  return path.join(...paths);
};

export const resolvePaths = (...paths: string[]): string => {
  return path.resolve(...paths);
};

export const getEntryPath = (startPath?: string) => {
  /* istanbul ignore if */
  let mainFileName = startPath;

  /* istanbul ignore else */
  if (!startPath) {
    mainFileName = require.main ? require.main.filename : __dirname;
  }

  /* istanbul ignore if */
  if (mainFileName.indexOf('node_modules') > 0) {
    return mainFileName.split('/node_modules')[0];
  }

  let currentPath: string = path.join(mainFileName, '../');
  let result = '';

  while (currentPath !== '/') {
    if (fs.existsSync(currentPath + '/package.json')) {
      result = currentPath;
      break;
    }
    currentPath = path.resolve(currentPath, '../');
  }
  return result;
};

/**
 * synchronously creates the directory if it does not exist
 * @param dirPath - directory or file path.
 */
export const mkDirSync = (dirPath: string): void => {
  const extname = path.extname(dirPath);
  dirPath = extname !== '' ? path.dirname(dirPath) : dirPath;
  if (!fs.existsSync(dirPath)) {
    let existingPath = '';
    let current = dirPath;
    while (existingPath === '' && current !== '/' && current !== '') {
      current = path.join(current, '../');
      if (fs.existsSync(current)) {
        existingPath = current;
      }
    }

    dirPath
      .split(existingPath)[1]
      .split('/')
      .forEach(pathToken => {
        existingPath = path.join(existingPath, pathToken);
        fs.mkdirSync(existingPath);
      });
  }
};

/**
 * returns true if running in production environment
 */
export const isProdEnv = (): boolean => {
  return (
    process.env.NODE_ENV &&
    process.env.NODE_ENV.toLowerCase().indexOf('prod') === 0
  );
};

/**
 * returns true if running in test environment
 */
export const isTestEnv = (): boolean => {
  return (
    process.env.NODE_ENV &&
    process.env.NODE_ENV.toLowerCase().indexOf('test') === 0
  );
};

/**
 * returns true if app is not running in production environment
 */
export const isDevEnv = (): boolean => {
  return !isProdEnv();
};
