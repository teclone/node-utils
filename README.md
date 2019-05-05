# Node-Utils

[![Build Status](https://travis-ci.org/harrison-ifeanyichukwu/node-utils.svg?branch=master)](https://travis-ci.org/harrison-ifeanyichukwu/node-utils)
[![Coverage Status](https://coveralls.io/repos/github/harrison-ifeanyichukwu/node-utils/badge.svg?branch=master)](https://coveralls.io/github/harrison-ifeanyichukwu/node-utils?branch=master)
[![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg)](https://github.com/semantic-release/semantic-release)
[![npm version](https://badge.fury.io/js/%40forensic-js%2Fnode-utils.svg)](https://badge.fury.io/js/%40forensic-js%2Fnode-utils)
![npm](https://img.shields.io/npm/dt/%40forensic-js%2Fnode-utils.svg)

Node-Utils is a collection of day-to-day utility methods usable in both node and browser environments. It is developed for reusability purpose and for fast project development, letting you focus on what matters in your application.

Because it is a typescript project, you get excellent auto-completion and type checks.

## Installation

```bash
npm install @forensic-js/node-utils
```

## Usage Sample

```typescript
import {getEntryPath, isProdEnv, isDevEnv. isTestEnv, mkDirSync} from '@forensic-js/node-utils';

process.env.NODE_ENV = 'production';
console.log(isProdEnv()); //logs true

process.env.NODE_ENV = 'test';
console.log(isTestEnv()); //true
console.log(isDevEnv()); //returns true as long as env is not in production

process.env.NODE_ENV = '';
console.log(isTestEnv()); //false
console.log(isDevEnv()); //true

//iteratively creates the folder is it does not exist
mkDirSync('a directory or file path');

//gets the project root directory by inspection
getEntryPath();
```
