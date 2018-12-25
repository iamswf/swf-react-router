/**
 * @file matchPath
 * @author iamswf@163.com
 */

import pathToRegexp from 'path-to-regexp';

function matchPath (pathname, options = {}) {
    const {path, exact = false} = options;

    // Turn a path string such as /user/:name into a regular expression
    const keys = [];
    const regexp = pathToRegexp(path, keys, {
        end: exact,
        sensitive: true,
        strict: false
    });

    const match = regexp.exec(pathname);

    if (!match) {
        return null;
    }

    const [url, ...values] = match;
    const isExact = pathname === url;

    if (exact && !isExact) {
        return null;
    }

    return {
        path,
        url,
        isExact,
        params: keys.reduce((accu, curr, index) => {
            accu[curr.name] = values[index];
            return accu;
        }, {})
    };
}

export default matchPath;
