import { Context, Next, Middleware } from 'koa';

export const routeTiming: Middleware = async(ctx: Context, next: Next) => {
    const { req, res } = ctx;

    const start = Date.now();

    await next();

    const metric = [
        req.method,
        ctx.routerPath?.replace(/\W/g, '_') || 'unknown',
        res.statusCode,
        Date.now() - start
    ].join('.');

    console.log('Time : ', metric);
};
