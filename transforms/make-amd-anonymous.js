'use strict';

module.exports = function transformer(file, api) {
    const j = api.jscodeshift;

    const DEFINE_CALL = {
        type: 'CallExpression',
        callee: {
            name: 'define',
        },
    };

    const isNamedDefine = ({ value }) => {
        const firstArg = value.arguments[0];
        return firstArg.type === 'Literal' && typeof firstArg.value === 'string';
    };

    return j(file.source)
        .find(j.CallExpression, DEFINE_CALL)
        .filter(isNamedDefine)
        .forEach(path => {
            path.value.arguments.shift();
        })
        .toSource();
};
