import fs from 'fs';
import { Request, Response, NextFunction } from 'express';

type PluginManifest = { [pluginName: string]: string };

const getPluginsManifest = (): PluginManifest => {
    const manifestPath =  [
        process.cwd(),
        'dist',
        'plugins',
        'plugins.manifest.json'
    ].join('/');

    return require(manifestPath);
}

const getPluginPath = (plugin: string) => [
    process.cwd(),
    'dist',
    'plugins',
    `${plugin}.latest.js`
].join('/');

export const handler = (req: Request, res: Response, next: NextFunction) => {
    const { plugins } = req.query;

    console.log(plugins)
    if (!plugins?.length) {
        res
            .status(400)
            .send('Plugins list is expected to be provided by "plugins" query param');

        return;
    }

    const manifest = getPluginsManifest();
    if (!manifest) {
        return next(new Error('Plugins manifest Does not exists!'));
    }

    const normalizedPlugins = (Array.isArray(plugins) ? plugins : [plugins]) as string [];
    const assets = normalizedPlugins.map(
        (plugin) => ({
            [plugin]: fs.readFileSync(
                getPluginPath(plugin),
                'utf8'
            )
        })
    );

    res
        .type('json')
        .send(assets);
};
