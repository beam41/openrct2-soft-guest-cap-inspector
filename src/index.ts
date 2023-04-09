/// <reference path="../lib/openrct2.d.ts" />
import { main } from './main'

registerPlugin({
  name: 'Soft Guest Cap Inspector',
  version: '0.1',
  authors: ['beam41'],
  type: 'local',
  licence: 'MIT',
  targetApiVersion: 72,
  main,
})
