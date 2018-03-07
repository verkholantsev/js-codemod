'use strict';

const get = require('lodash/get');

const isUnderscoreBindCall = node =>
    get(node, 'callee.type') === 'MemberExpression' &&
    get(node, 'callee.object.name') === '_' &&
    get(node, 'callee.property.name') === 'bind';

module.exports = function transformer(file, api) {
    const j = api.jscodeshift;

    return j(file.source)
        .find(j.CallExpression)
        .filter(({ node }) => isUnderscoreBindCall(node))
        .forEach(path => {
            const { node } = path;
            const { arguments: args } = node;

            // prettier-ignore
            j(path).replaceWith(
                j.callExpression(
                    j.memberExpression(
                        args[0],
                        j.identifier('bind')
                    ),
                    args.slice(1)
                )
            );
        })
        .toSource();
};
