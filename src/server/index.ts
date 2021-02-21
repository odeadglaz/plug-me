import Koa from 'koa';
import configuration from '../configuration';
import * as routes from './route';
import * as middleware from './middleware';

class PluginApp {

    static start() {
        const app = new Koa();

        middleware.register(app);
        routes.register(app);

        app.listen(configuration.port);

        console.log(`Server running on port ${configuration.port}`);
    }
}

export default PluginApp;