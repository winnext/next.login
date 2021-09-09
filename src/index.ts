import Express from 'express';
import UserService from './services/User.service';
import GroupService from './services/Group.service';

const app = Express();
UserService(app);
GroupService(app);
app.listen(8080);
