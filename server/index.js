import express from 'express';

const app = express();
app.use(express.static('dist'));

export default app;
