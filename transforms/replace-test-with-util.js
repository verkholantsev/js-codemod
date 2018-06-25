'use strict';

module.exports = function transformer(file, api) {
    const j = api.jscodeshift;

    const DEFINE_CALL = {
        type: 'CallExpression',
        callee: {
            name: 'define',
        },
    };

    return j(file.source)
        .find(j.CallExpression, DEFINE_CALL)
        .forEach(path => {
            if (path.value.arguments && path.value.arguments[0] && path.value.arguments[0].type === 'ArrayExpression') {
                fix(path.value.arguments[0]);
            } else if (
                path.value.arguments &&
                path.value.arguments[1] &&
                path.value.arguments[1].type === 'ArrayExpression'
            ) {
                fix(path.value.arguments[1]);
            }
        })
        .toSource();
};

function fix(arg) {
    for (let i = 0; i < arg.elements.length; i++) {
        const el = arg.elements[i];
        if (el.value === 'sinon-sinon') {
            el.value = 'sinon';
        }
        // el.value = el.value.replace(//, 'util/');
    }
}
