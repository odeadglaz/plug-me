import { Application, Router } from 'express';
import * as handlers from './handlers';

export const register = (app: Application) => {
    const router = Router();

    router.get('/api/v1/plugin', handlers.plugin);
    router.get('/api/v1/plugin/hash', handlers.pluginsHash);
    router.get('/api/v1/plugin/upload', handlers.uploadPlugin);
    router.get('/api/v1/plugin/get', handlers.getPlugin);
    router.get('/healthcheck', handlers.health);

    app.use(router);
};
