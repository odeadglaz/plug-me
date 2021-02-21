import { Context } from 'koa';

export const handler = (ctx: Context) => {
    ctx.body = 'Health: OK';
};
