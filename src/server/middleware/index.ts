import Application from 'koa';
import cors from '@koa/cors';
import { routeTiming } from './routeTiming';

export const register = (app: Application) => {
    app.use(cors());
    app.use(routeTiming);
};