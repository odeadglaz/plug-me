import { loggerListener, statsListener } from '@fiverr-private/obs';

export const register = () => {
    loggerListener({
        mode: 'development',
        logLevel: 'info'
    });

    statsListener({
        mode: 'development'
    });
};