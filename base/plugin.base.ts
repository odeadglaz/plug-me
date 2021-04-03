import { FiverrContext } from '@fiverr-private/fiverr_context';
import { CookieOptions } from 'express';

type UnknownObject = Record<string, unknown>;
type DecoratorCookieOptions = CookieOptions | UnknownObject;

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
    setCookie: (name: string, value: string, options: DecoratorCookieOptions) => void;
}

declare const PLUGINS_INTERNAL_VERSION: string

export abstract class NodePlugin {
    abstract name: string;
    exposed: UnknownObject = {};
    internalVersion: string = PLUGINS_INTERNAL_VERSION;
    abstract init(): void;
    decorateRequest?(decorator: RequestDecorator): void;
    decorateResponse?(decorator: ResponseDecorator): void;
    clear?(): void;
}