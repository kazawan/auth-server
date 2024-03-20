import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import router from './authRoutes/index.js';
const app = express();

app.use(cors());
app.use(bodyParser.json());

app.use('/auth', router);



app.get('/', (req, res) => {
    res.send('Hello World');
});

app.listen(3000, () => {
    console.log(`Server is running at http://localhost:3000`);
});
