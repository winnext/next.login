/* eslint-disable import/no-unresolved */
import Express from 'express';
import UserService from './services/User.service';
import GroupService from './services/Group.service';
import RoleService from './services/Role.service';

const app = Express();
UserService(app);
GroupService(app);
RoleService(app);
app.listen(8080);
