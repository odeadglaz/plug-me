import Express from 'express';
import { logger } from '@fiverr-private/obs';
import configuration from '../configuration';
import * as globals from './globals';
import * as routes from './route';
import * as middleware from './middleware';

class PluginApp {
    static start() {
        const app: Express.Application = Express();

        globals.register();
        middleware.before(app);
        routes.register(app);
        middleware.after(app);

        app.set('etag', false);

        app.listen(configuration.port, this.ready);
    }

    static ready() {
        logger.info(`Server running on port ${configuration.port}`);
    }
}

export default PluginApp;