import Application from 'koa';
import Router from 'koa-router';
import * as handlers from './handlers';

export const register = (app: Application) => {
    const router = new Router({
        prefix: '/api/v1'
    });

    router.get('/', handlers.view);
    router.get('/plugin', handlers.plugin);
    router.post('/healthcheck', handlers.health);

    app.use(router.routes());
    app.use(router.allowedMethods());
};
