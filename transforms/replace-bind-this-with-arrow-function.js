'use strict';

const get = require('lodash/get');

const isBindWithOnlyThisCall = path => {
    const { node } = path;
    const { callee } = node;

    const isBindMemberExpression =
        get(callee, 'type') === 'MemberExpression' &&
        ['FunctionExpression', 'ArrowFunctionExpression'].includes(get(callee, 'object.type')) &&
        get(callee, 'property.type') === 'Identifier' &&
        get(callee, 'property.name') === 'bind';

    const isOnlyThisCall = get(node, 'arguments.length') === 1 && get(node, 'arguments[0].type') === 'ThisExpression';

    return isBindMemberExpression && isOnlyThisCall;
};

module.exports = function transformer(file, api) {
    const j = api.jscodeshift;

    const applyTransformations = path => {
        const { node } = path;
        const { callee } = node;

        // prettier-ignore
        j(path).replaceWith(
            j.arrowFunctionExpression(
                get(callee, 'object.params'),
                get(callee, 'object.body')
            )
        );
    };

    return j(file.source)
        .find(j.CallExpression)
        .filter(isBindWithOnlyThisCall)
        .forEach(applyTransformations)
        .toSource();
};
