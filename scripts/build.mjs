import { readdir, mkdir, readFile, writeFile, copyFile } from 'node:fs/promises';
import { transformAsync } from '@babel/core';
import jsx from '@babel/plugin-transform-react-jsx';

const root = new URL('../', import.meta.url);
async function compile(relative = '') {
  for (const entry of await readdir(new URL(`src/${relative}`, root), { withFileTypes: true })) {
    const name = `${relative}${entry.name}`;
    if (entry.isDirectory()) { await compile(`${name}/`); continue; }
    const output = new URL(`dist/${name.replace(/\.jsx$/, '.js')}`, root);
    await mkdir(new URL('./', output), { recursive: true });
    if (/\.jsx?$/.test(name)) {
      const result = await transformAsync(await readFile(new URL(`src/${name}`, root), 'utf8'), {
        filename: name, babelrc: false, configFile: false,
        plugins: [[jsx, { runtime: 'automatic' }]],
      });
      await writeFile(output, result.code + '\n');
    } else { await copyFile(new URL(`src/${name}`, root), output); }
  }
}
await compile();
console.log('Biblioteca compilada em dist/ (ESM, JSX transformado, diretivas client preservadas).');
