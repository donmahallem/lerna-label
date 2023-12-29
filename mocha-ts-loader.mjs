import {register} from 'node:module'
import {pathToFileURL} from 'node:url'
process.env.TS_NODE_PROJECT="./tsconfig.json";
register('ts-node/esm', pathToFileURL(import.meta.url))