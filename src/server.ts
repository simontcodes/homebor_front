import {
  AngularNodeAppEngine,
  createNodeRequestHandler,
  isMainModule,
  writeResponseToNodeResponse,
} from '@angular/ssr/node';
import express from 'express';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const serverDistFolder = dirname(fileURLToPath(import.meta.url));
const browserDistFolder = resolve(serverDistFolder, '../browser');

const app = express();
const angularApp = new AngularNodeAppEngine();

app.use(
  express.static(browserDistFolder, {
    maxAge: '1y',
    index: false,
    redirect: false,
  }),
);

app.use('/**', (req, res, next) => {
  const host = req.hostname;
  const parts = host.split('.');

  const isTenant = parts.length > 2 && parts[0] !== 'www';
  const slug = isTenant ? parts[0] : 'homebor';

  angularApp
    .handle(req, {
      serverContext: {
        tenantSlug: slug,
      },
    })
    .then((response) =>
      response ? writeResponseToNodeResponse(response, res) : next(),
    )
    .catch(next);
});

if (isMainModule(import.meta.url)) {
  const port = process.env['PORT'] || 4000;
  app.listen(port, () => {
    console.log(`SSR server running at http://localhost:${port}`);
  });
}

export const reqHandler = createNodeRequestHandler(app);
