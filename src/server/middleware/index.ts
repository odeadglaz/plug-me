import { Application } from 'express';
import cors from 'cors';
import { routeTiming, createErrorHandler } from '@fiverr-private/obs';

export const before = (app: Application) => {
    app.use(cors());
    app.use(routeTiming('plugin_service'));
};

export const after = (app: Application) => {
    const errorHandler = createErrorHandler({
        fields: ['request_context']
    });

    app.use(errorHandler);
}