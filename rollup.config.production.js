import commonjs from '@rollup/plugin-commonjs'
import nodeResolve from '@rollup/plugin-node-resolve'
import typescript from '@rollup/plugin-typescript'
import terser from '@rollup/plugin-terser'
import del from 'rollup-plugin-delete'
import { defineConfig } from 'rollup'

export default defineConfig({
  external: ['@/lib/openrct2'],
  input: './src/index.ts',
  output: {
    file: './build/soft-guest-cap-inspector.js',
    format: 'iife',
  },
  plugins: [
    del({ targets: './build/*' }),
    nodeResolve(),
    commonjs(),
    typescript(),
    terser({
      compress: {
        passes: 5,
        negate_iife: false,
      },
      format: {
        quote_style: 1,
        wrap_iife: true,
      },
    }),
  ],
  treeshake: 'smallest',
})
