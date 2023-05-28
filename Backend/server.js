const express = require('express');
const connectDB = require('./config/db');
const cors = require('cors')
const app = express()
const port = 5000
const bodyParser = require('body-parser');


app.use(cors());
app.use(express.json());
connectDB();

app.use(
    bodyParser.urlencoded({
        extended: true,
        parameterLimit: 1000000,
        limit: '100mb',
    })
);

app.use(bodyParser.json({ limit: '100mb' }))

app.use(
    express.json({
        limit: '100mb',
    })
);

app.use(
    express.urlencoded({
        limit: '50mb',
    })
);

// Serve static files from the './uploads/images' directory
app.use('/uploads/images', express.static('./uploads/images'));

app.use('/api/auth', require('./routes/auth'));
app.use('/api/shelter', require('./routes/shelter'));
app.use('/api/rescue', require('./routes/rescue'));
app.use('/api/petAd', require('./routes/petAd'));
app.use('/api/image', require('./routes/ImageMulter'));
app.use('/api/shelterAuth', require('./routes/shelterAuth'));


app.listen(port, () => {
    console.log(`Petify Backend listening on port ${port}`);
});
