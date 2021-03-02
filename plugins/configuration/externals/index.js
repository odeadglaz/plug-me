const {
    dependencies,
    devDependencies,
    peerDependencies
} = require('../../../package.json');

const FIVERR_VENDORS_PACKAGE_PREFIX = '@fiverr-private/vendors-';

const createVendor = (name) => ({
    [name]: {
        commonjs: name,
        commonjs2: name
    }
})

const allVendorsPackages = Object
    .keys(
        Object.assign(
            {},
            dependencies,
            devDependencies,
            peerDependencies
        )
    )
    .filter(
        (dep) => dep.startsWith(FIVERR_VENDORS_PACKAGE_PREFIX)
    );

const getDependencyProperty = (property, list = allVendorsPackages) => list.reduce(
    (collector, pkg) => Object.assign(collector, require(`${pkg}/lib/${property}`)),
    {}
);

const externals = getDependencyProperty('externals');

console.log(externals);

module.exports = {
    ...externals,
    ...createVendor('@fiverr-private/obs')
};
