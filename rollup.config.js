import babel from 'rollup-plugin-babel';
import strip from '@rollup/plugin-strip';
import { terser } from 'rollup-plugin-terser';

export default [
  // modern browsers
  {
    input: 'src/main.js',
    output: {
      file: 'dist/ucw.js',
      format: 'iife'
    },
    plugins: [
      strip({
        functions: ['console.*']
      }),
      babel({
        exclude: 'node_modules/**',
        presets: [
          [
            '@babel/env',
            {
              targets: 'defaults, not IE 11'
            }
          ]
        ]
      }),
      terser()
    ]
  },
  // old browsers
  {
    input: 'src/main.js',
    output: {
      file: 'dist/ucw.legacy.js',
      format: 'iife'
    },
    plugins: [
      strip({
        functions: ['console.*']
      }),
      babel({
        exclude: 'node_modules/**',
        presets: [
          [
            '@babel/env',
            {
              targets: {
                ie: '11'
              }
            }
          ]
        ]
      }),
      terser()
    ]
  }
];
