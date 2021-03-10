import { FiverrContext } from '@fiverr-private/fiverr_context';
import { CookieOptions } from 'express';

type UnknownObject = Record<string, unknown>;
type PluginCookieOptions = CookieOptions;

interface BaseDecorator {
    context: FiverrContext;
    headers: UnknownObject;
    cookies: UnknownObject;
}

export interface RequestDecorator extends BaseDecorator {
    decorate: (name: string, data: unknown) => void;
    redirect:(url: string) => void;
}

export interface ResponseDecorator extends BaseDecorator {
    setHeader: (name: string, value: string | string[] | number) => void;
    setCookie: (name: string, value: string, options: PluginCookieOptions) => void;
}

export abstract class HttpPlugin {
    abstract name: string;
    exposed: UnknownObject = {};
    abstract init(): void;
    decorateRequest?(decorator: RequestDecorator): void;
    decorateResponse?(decorator: ResponseDecorator): void;
    clear?(): void;
}

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
    get:<P extends HttpPlugin> (name: string) => P | PluginDoesNotExistsError;
    decorateRequest: (request: Request, response: Response) => void;
    decorateResponse: (request: Request, response: Response) => void;
}
