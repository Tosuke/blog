const moduleAlias = require('module-alias');
moduleAlias.addAliases({
  react: 'preact/compat',
  'react-dom': 'preact/compat',
  'react-ssr-prepass': 'preact-ssr-prepass'
});
const { createServer } = require('http');
const next = require('next');

const dev = process.env.NODE_ENV !== 'production';
const port = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;

process.env.PORT = `${port}`;

const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  createServer(handle).listen(port, () => {
    console.log(`Listen on http://localhost:${port}`);
  });
});
