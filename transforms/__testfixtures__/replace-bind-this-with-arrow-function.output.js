'use strict';

const boundedFn = (a, b) => {
    console.log(this, a, b);
};

const boundedArrowFn = () => console.log(this);

const boundedFnWithPartiallyAppliedParam = function () {
    console.log(this);
}.bind(this, 'some-partially-applied-param');

const boundedFnWithSomethingOtherAsContext = function () {
    console.log(this);
}.bind(somethingOtherAsContext);
