import { readFile, writeFile, mkdir, copyFile, realpath } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
const source = path.dirname(fileURLToPath(import.meta.url)),
  root = path.resolve(source, '..');
const config = JSON.parse(await readFile(path.join(source, 'manifest.json'), 'utf8'));
const output = path.resolve(root, config.output);
if (
  !output.startsWith(root + path.sep) ||
  !['public/docs', 'apps/web/public/docs', 'documentation-preview', 'docs-site'].includes(
    config.output,
  )
)
  throw Error('Unexpected documentation output');
async function approved(relative) {
  const candidate = await realpath(path.resolve(root, relative));
  if (
    !candidate.startsWith(root + path.sep) ||
    relative
      .split(/[\\/]/)
      .some(
        (part) => part === '..' || part === '.git' || part === 'private-docs' || part === '.env',
      )
  )
    throw Error('Source outside approved project');
  return candidate;
}
const documents = [];
for (const item of config.documents) {
  const content = await readFile(await approved(item.source), 'utf8');
  if (Buffer.byteLength(content) > 400000) throw Error('Document size limit');
  documents.push({ ...item, content });
}
const images = {};
await mkdir(path.join(output, 'images'), { recursive: true });
for (const relative of config.images || []) {
  const input = await approved(relative);
  if (!/\.(png|jpg|jpeg|webp)$/i.test(relative)) throw Error('Unexpected image');
  const name = String(Object.keys(images).length) + path.extname(relative);
  await copyFile(input, path.join(output, 'images', name));
  images[relative] = 'images/' + name;
}
for (const name of [
  'index.html',
  'portal.css',
  'portal.js',
  'brand.css',
  'reading-tools.js',
  'vendor/markdown-it.min.js',
  'vendor/markdown-it.LICENSE',
]) {
  const destination = path.join(output, name);
  await mkdir(path.dirname(destination), { recursive: true });
  await copyFile(path.join(source, name), destination);
}
const payload = {
  project: config.project,
  language: config.language,
  application: config.application,
  revision: 'InnovaLogic v1',
  documents,
  images,
  paths: config.paths,
};
await writeFile(
  path.join(output, 'content.js'),
  'window.INNOVALOGIC_DOCUMENTATION = ' + JSON.stringify(payload).replace(/</g, '\\u003c') + ';\n',
);
console.log(`${config.project}: ${documents.length} approved documents → ${config.output}`);
