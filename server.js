import express from 'express';
import { existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

const app = express();
const dist = fileURLToPath(new URL('./dist/', import.meta.url));

if (!existsSync(`${dist}/index.html`)) {
  throw new Error('Build ausente. Execute npm run build antes de npm start.');
}

app.disable('x-powered-by');
app.use(express.static(dist));

app.listen(8080, '0.0.0.0', () => {
  console.log('Raidoxx: servidor Node.js em 0.0.0.0:8080');
});
