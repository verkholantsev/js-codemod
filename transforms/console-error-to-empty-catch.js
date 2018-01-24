'use strict';

module.exports = function transformer(file, api) {
    const j = api.jscodeshift;

    return j(file.source)
        .find(j.CatchClause)
        .filter(path => path.node.body.body.length === 0)
        .forEach(path => {
            const { name } = path.node.param;

            j(path).replaceWith(
                j.catchClause(
                    j.identifier(name),
                    null,
                    j.blockStatement([
                        j.expressionStatement(
                            j.callExpression(j.memberExpression(j.identifier('console'), j.identifier('error')), [
                                j.identifier(name),
                            ])
                        ),
                    ])
                )
            );
        })
        .find(j.CallExpression)
        .forEach(p => {
            p.node.comments = [j.commentLine(' eslint-disable-next-line no-console')];
        })
        .toSource();
};
