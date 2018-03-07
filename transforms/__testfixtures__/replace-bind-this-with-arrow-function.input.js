'use strict';

const boundedFn = function (a, b) {
    console.log(this, a, b);
}.bind(this);

const boundedArrowFn = (() => console.log(this)).bind(this);

const boundedFnWithPartiallyAppliedParam = function () {
    console.log(this);
}.bind(this, 'some-partially-applied-param');

const boundedFnWithSomethingOtherAsContext = function () {
    console.log(this);
}.bind(somethingOtherAsContext);
