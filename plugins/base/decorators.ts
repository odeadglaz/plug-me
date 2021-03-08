import { HttpPlugin } from './plugin';

const MonitorTiming = (metric: string) => (
    target: unknown,
    propertyKey: string,
    descriptor: PropertyDescriptor
) => {
    const originalMethod = descriptor.value;

    descriptor.value = async function (...args: any[]) {
        const time = Date.now();
        try {
            return await originalMethod.apply(this, args);
        } finally {
            console.log(`metric:${metric}, propertyKey:${propertyKey} execution time:${Date.now() - time}`);
        }
    };
};

const Expose = (name?: string) => (
    target: HttpPlugin,
    propertyKey: string
) => {
    let value: unknown;
    const exposeUnder = name || propertyKey;

    Object.defineProperty(target, propertyKey, {
        get: function() {
            return value;
        },
        set: function(newValue) {
            value = newValue;
            this.exposed[exposeUnder] = newValue
        }
    });
}

const PollingAction = (delay = 10000) => (
    target: HttpPlugin,
    propertyKey: string,
    descriptor: PropertyDescriptor
) => {
    const originalMethod = descriptor.value;
    let interval: any = null;

    descriptor.value = function() {
        const action = originalMethod.bind(this);
        interval = setInterval(action, delay);
    }

    const originalClear = target.clear;
    target.clear = function() {
        interval && clearInterval(interval);
        originalClear && originalClear();
    }
}

export {
    Expose,
    PollingAction,
    MonitorTiming
};