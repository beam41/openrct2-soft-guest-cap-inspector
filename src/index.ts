/// <reference path="../lib/openrct2.d.ts" />
import 'core-js/actual/map'
import { main } from './main'

registerPlugin({
  name: 'Soft Guest Cap Inspector',
  version: '1.0',
  authors: ['beam41'],
  type: 'local',
  licence: 'MIT',
  targetApiVersion: 72,
  main,
})
