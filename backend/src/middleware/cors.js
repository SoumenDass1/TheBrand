import cors from 'cors';
import config from '../config/env.js';

const corsOptions = {
    origin: config.corsOrigin,
    credentials: true,
    optionsSuccessStatus: 200,
};

export default cors(corsOptions);
