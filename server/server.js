import express from 'express';
import path from 'path';
import bodyParser from 'body-parser';
import webpack from 'webpack';
import webpackMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import webpackConfig from '../webpack.config';
import trace from './routes/trace';
import posts from './routes/posts';
import auth from './routes/auth';
import tags from './routes/tags';
// import documents from './routes/documents';

const app = express();
const publicPath = express.static(path.join(__dirname, '../client/assets'));

app.use('/', publicPath);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/api/v1/trace', trace);
app.use('/api/v1/posts', posts);
app.use('/api/v1/auth', auth);
app.use('/api/v1/tags', tags);
// app.use('/api/search', search);

const compiler = webpack(webpackConfig);

app.use(webpackMiddleware(compiler, {
  publicPath: webpackConfig.output.publicPath,
  noInfo: true,
}));

app.use(webpackHotMiddleware(compiler));

app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(process.env.PORT || 8000);

export default app;
