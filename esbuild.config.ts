import esbuild from 'esbuild';

await esbuild.build({
  entryPoints: ['src/app.ts'],
  bundle: true,
  platform: 'node',
  target: 'es2024',
  outdir: 'dist',
  format: 'esm',
  external: [
    'pg', 
    'bcrypt',
    'better-sqlite3',
    'mysql2', 
    'oracledb', 
    'mysql', 
    'pg-query-stream',
    'sqlite3',
    'tedious',
    'pg-native'
  ],
});
