import { noop } from 'lodash';

type UnknownObject = Record<string, unknown>;
type StaticDataResponse = UnknownObject;

export interface PluginContext {
    addData: (data: UnknownObject) => void;
    addMarkup: (htmlMarkup: string) => void;
    addHeader: (name: string, value: string) => void;
    addCookie: (name: string, value: string) => void;
    redirect:() => void;
}

abstract class HttpPlugin {
    decorateRequest:(context: PluginContext) => void = noop;
    decorateResponse:(context: PluginContext) => void = noop;
    setStaticData:(response: StaticDataResponse) => void = noop;
}

export default HttpPlugin;