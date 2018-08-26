const { createServer } = require('http');
const { parse } = require('url');
const { createReadStream } = require('fs');
const next = require('next');

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  createServer((req, res) => {
    const parsedUrl = parse(req.url, true);
    const { pathname } = parsedUrl;

    if (pathname === '/service-worker.js') {
      res.setHeader('content-type', 'text/javascript');
      createReadStream('./worker/service-worker.js').pipe(res);
    }
    else if (pathname === '/workbox-sw.js') {
      res.setHeader('content-type', 'text/javascript');
      createReadStream('./worker/workbox-sw.js').pipe(res);
    }
    else if (pathname === '/workbox-routing.js') {
      res.setHeader('content-type', 'text/javascript');
      createReadStream('./worker/workbox-routing.js').pipe(res);
    }
    else if (pathname === '/workbox-strategies.js') {
      res.setHeader('content-type', 'text/javascript');
      createReadStream('./worker/workbox-strategies.js').pipe(res);
    }
    else if (pathname === '/workbox-background-sync.js') {
      res.setHeader('content-type', 'text/javascript');
      createReadStream('./worker/workbox-background-sync.js').pipe(res);
    }
    else if (pathname === '/idb.js') {
      res.setHeader('content-type', 'text/javascript');
      createReadStream('./utils/idb.js').pipe(res);
    }
    else if (pathname === '/utility.js') {
      res.setHeader('content-type', 'text/javascript');
      createReadStream('./utils/utility.js').pipe(res);
    }
    else {
      handle(req, res, parsedUrl);
    }
  }).listen(3000, err => {
    if (err) throw err;
    console.log('> Ready on http://localhost:3000');
  });
});