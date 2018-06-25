'use strict';

module.exports = function transformer(file, api) {
    const j = api.jscodeshift;

    return j(file.source)
        .find(j.ObjectExpression)
        .forEach(path => {
            const { value } = path;
            const { properties } = value;

            const propertiesNamesSet = new Set();
            const newProperties = properties.filter(property => {
                const key = property.key.name || property.key.value;

                if (typeof key !== 'string') {
                    throw new Error('Unexpected property key');
                }

                const alreadyHasThisName = propertiesNamesSet.has(key);

                propertiesNamesSet.add(key);

                return !alreadyHasThisName;
            });

            value.properties = newProperties;
        })
        .toSource();
};
