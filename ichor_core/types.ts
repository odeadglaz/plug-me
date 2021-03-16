import {
    IchorPlugin,
    RequestDecorator,
    ResponseDecorator
} from '../base/ichor.base';

export interface IchorDecorator extends RequestDecorator, ResponseDecorator {}

export type IchorDecoratorAdapter<Request, Response> = (request: Request, response: Response) => IchorDecorator;

type IchorConfig = { name: string; version?: string };

interface IchorsConfig {
    plugins: IchorConfig[]
}

interface InvalidIchorAdapter extends Error {}
interface InvalidIchorConfig extends Error {}
interface IchorDoesNotExistsError extends Error {}

export interface IchorCore<Request, Response> {
    initialize: (
        config: IchorsConfig,
        decoratorAdapter: IchorDecoratorAdapter<Request, Response>
    ) => void | InvalidIchorAdapter | InvalidIchorConfig;
    plugins: IchorPlugin[];
    get:<P extends IchorPlugin> (name: string) => Partial<P> | IchorDoesNotExistsError;
    decorateRequest: (request: Request, response: Response) => void;
    decorateResponse: (request: Request, response: Response) => void;
}
