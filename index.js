import express from 'express';
import 'dotenv/config'
import cookieParser from 'cookie-parser';
import {router as userRouter} from './routes/user.routes.js';
import {router as postRouter} from './routes/post.routes.js'

const app = express();

//Regular middlewares
app.use(express.urlencoded({ 
    limit: "16kb",
    extended: true
}));

app.use(express.json({ //From the request body, we will be able to use json using this
    limit: "16kb"
}))

//Cookie middleware --> To trap and verify the cookies
app.use(cookieParser());

app.get('/', (_, res) => {
    res.send("Hello World");
})

app.use('/api', userRouter);
app.use('/api/posts', postRouter);

app.listen(3000, () => {
    console.log("The server is listening on port 3000");
})