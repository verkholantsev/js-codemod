'use strict';

const fn = function someFunction() {
    console.log(this);
}.bind(this);

const fn1 = function someFunction(somePartialAppliedParam) {
    console.log(this);
}.bind(this, 'some partial applied param');

const fn2 = someFunction.bind(this);

const fn3 = obj.someMethod.bind(this);

const fn4 = (() => console.log(this)).bind(this);
