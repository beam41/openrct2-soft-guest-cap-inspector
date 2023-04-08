/// <reference path="../lib/openrct2.d.ts" />
import { main } from '@/src/main'

registerPlugin({
  name: 'Soft Guest Cap Inspector',
  version: '1.0',
  authors: ['beam41'],
  type: 'local',
  licence: 'MIT',
  targetApiVersion: 72,
  main,
})
