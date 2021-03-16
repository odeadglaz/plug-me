import {
    NodePlugin,
    RequestDecorator,
    ResponseDecorator
} from '../base/plugin.base';

export interface PluginDecorator extends RequestDecorator, ResponseDecorator {}

export type PluginDecoratorAdapter<Request, Response> = (request: Request, response: Response) => PluginDecorator;

type PluginConfig = { name: string; version?: string };

interface PluginsConfig {
    plugins: PluginConfig[]
}

interface InvalidPluginAdapter extends Error {}
interface InvalidPluginConfig extends Error {}
interface PluginDoesNotExistsError extends Error {}

export interface PluginCore<Request, Response> {
    initialize: (
        config: PluginsConfig,
        decoratorAdapter: PluginDecoratorAdapter<Request, Response>
    ) => void | InvalidPluginAdapter | InvalidPluginConfig;
    plugins: NodePlugin[];
    get:<P extends NodePlugin> (name: string) => Partial<P> | PluginDoesNotExistsError;
    decorateRequest: (request: Request, response: Response) => void;
    decorateResponse: (request: Request, response: Response) => void;
}
