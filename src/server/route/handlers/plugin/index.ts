import fs from 'fs';
import { Context } from 'koa';

const getPluginPath = (): string => [
    process.cwd(),
    'dist',
    'plugins',
    'index.js'
].join('/');

export const handler = async(ctx: Context) => {
    const { plugins } = ctx.query ;

    console.log(plugins)
    if (!plugins?.length) {
        ctx.status = 400;
        ctx.message = 'Plugins list is expected to be provided by "plugins" query param'
        return;
    }

    if (!fs.existsSync(getPluginPath())) {
        console.log('Does not exists!')
    }

    ctx.body = fs.readFileSync(getPluginPath(), 'utf8');;
};
