import { logger } from '@fiverr-private/obs';

const getLocalization = () => {
    console.log('Fetched localization');
    logger.info('Oh we that fetch!', { enh: 'localization' });
};

export {
    getLocalization
};