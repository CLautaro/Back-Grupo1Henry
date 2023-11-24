import app from './src/server.js';

const port = 3001;

app.listen(3001, () => {
  console.info(`Server listening on port ${port}`);
});
