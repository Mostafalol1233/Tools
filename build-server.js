import { build } from 'esbuild';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

async function buildServer() {
  try {
    await build({
      entryPoints: ['server/index.ts'],
      bundle: true,
      platform: 'node',
      format: 'esm',
      outdir: 'dist',
      external: [
        'express',
        'fs',
        'path',
        'http',
        'vite',
        'nanoid',
        '@replit/vite-plugin-cartographer',
        '@replit/vite-plugin-runtime-error-modal',
        '@vitejs/plugin-react'
      ],
      packages: 'external',
      target: 'node18',
      loader: {
        '.ts': 'ts'
      },
      tsconfig: 'tsconfig.json',
      minify: false,
      sourcemap: false,
      metafile: false,
      logLevel: 'info'
    });
    
    console.log('✓ Server build completed successfully');
  } catch (error) {
    console.error('✗ Server build failed:', error);
    process.exit(1);
  }
}

buildServer();