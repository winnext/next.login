import Express from 'express';
import UserService from './services/User.service';

const app = Express();
UserService(app);
app.listen(8080);
