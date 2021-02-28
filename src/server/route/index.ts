import { Application, Router } from 'express';
import * as handlers from './handlers';

export const register = (app: Application) => {
    const router = Router();

    router.get('/api/v1/plugin', handlers.plugin);
    router.get('/api/v1/plugin/hash', handlers.pluginsHash);
    router.get('/healthcheck', handlers.health);

    app.use(router);
};
