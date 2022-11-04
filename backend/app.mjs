import { program } from 'commander';
import express from 'express';
import path from 'path';
import api from './api/index.mjs';
import { syncDB } from './models/index.mjs'

const app = express();
const port = process.env.port || 8888;
const publicRoot = path.join(process.cwd(), 'public');
// const publicRoot = path.join(process.cwd(), 'dist/public');

program.option('-s, --sync', 'sync database')
program.parse(process.argv);
const options = program.opts();

console.log(options)
if (options.sync) {
  await syncDB()
  process.exit(0)
}

console.log('public path', publicRoot)
app.use(express.static(publicRoot));
app.use(express.json());
app.use('/api', api);
app.use('*', function (req, res) {
  res.sendFile(path.join(publicRoot, 'index.html'));
});

app.use(function (req, res, next) {
  let err = new Error('Not Found');
  err.status = 404;
  next();
});

app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`)
})