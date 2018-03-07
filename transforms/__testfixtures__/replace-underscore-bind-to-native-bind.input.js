'use strict';

const fn = _.bind(function someFunction() {
    console.log(this);
}, this);

const fn1 = _.bind(function someFunction(somePartialAppliedParam) {
    console.log(this);
}, this, 'some partial applied param');

const fn2 = _.bind(someFunction, this);

const fn3 = _.bind(obj.someMethod, this);

const fn4 = _.bind(() => console.log(this), this);
