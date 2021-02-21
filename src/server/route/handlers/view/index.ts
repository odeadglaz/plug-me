import { Context } from 'koa';

const wait = () => new Promise(resolve => setTimeout(resolve, 1000));

export const handler = async(ctx: Context) => {
    await wait();

    ctx.body = 'Hello World \o/';
};
