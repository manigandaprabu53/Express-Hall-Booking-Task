import express from 'express';
import router from './src/Routes/index.js';
const app = express();
const port = 8000;

// app.get('/', (req, res)=>{
//     res.send('<h1>Welcome to Express JS Task</h1>')
// })

app.use(express.json());

app.use(router);

app.listen(port, ()=>console.log(`App is listening on ${port}`));