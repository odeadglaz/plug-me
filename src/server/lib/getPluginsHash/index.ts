import crypto from 'crypto';
import fs from 'fs';

const pluginsBundle = (): string => fs.readFileSync(
  `${process.cwd()}/dist/plugins/index.js`,
  'utf-8'
);

let hash = '';

const setPluginsHash = () => {
    hash = crypto
        .createHash('sha1')
        .update(pluginsBundle())
        .digest('hex')
        .toString();
}

/**
 * Build hash based on a given string value.
 * @returns {String}
 */
const getPluginsHash = (): string => {
    if (!hash) {
        setPluginsHash();
    }

    return hash;
}

export default getPluginsHash;
