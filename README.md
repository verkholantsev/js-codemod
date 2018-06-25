[![Build Status](https://img.shields.io/travis/verkholantsev/js-codemod.svg)](https://travis-ci.org/verkholantsev/js-codemod)
[![Coverage report](https://img.shields.io/coveralls/github/verkholantsev/js-codemod.svg)](https://coveralls.io/github/verkholantsev/js-codemod)

# js-codemod

## Setup

```sh
git clone git@github.com:verkholantsev/js-codemod.git
cd js-codemod
yarn install
```

## Usage

```sh
./node_modules/.bin/jscodeshift -t <transformation_file> <target_file>
```

### Transformations

#### `add-console-error-to-empty-catch`

Transforms empty catch clauses to catch clauses with error logging to console.

```js
// input file
try {
    throw new Error('Error!');
} catch (error) {
    // do nothing
}

// output file
try {
    throw new Error('Error!');
} catch (error) {
    // eslint-disable-next-line no-console
    console.error(error);
}
```

#### `replace-underscore-bind-to-native-bind`

Transforms underscore and lodash bind to native bind.

```js
// input file
const fn = _.bind(function someFunction() {
    console.log(this);
}, this);

// output file
const fn = function someFunction() {
    console.log(this);
}.bind(this);
```

#### `replace-bind-this-with-arrow-function`

Transforms functions binds with `this` as the only argument to arrow functions.

```js
// input file
const boundedFn = function(a, b) {
    console.log(this, a, b);
}.bind(this);

// output file
const boundedFn = (a, b) => {
    console.log(this, a, b);
};
```

Does nothing with calls with more that one argument or with the only argument other than `this` expression.

```js
// input file
const boundedFnWithPartiallyAppliedParam = function() {
    console.log(this);
}.bind(this, 'some-partially-applied-param');

const boundedFnWithSomethingOtherAsContext = function() {
    console.log(this);
}.bind(somethingOtherAsContext);

// output file
const boundedFnWithPartiallyAppliedParam = function() {
    console.log(this);
}.bind(this, 'some-partially-applied-param');

const boundedFnWithSomethingOtherAsContext = function() {
    console.log(this);
}.bind(somethingOtherAsContext);
```

#### `remove-duplicate-object-properties`

Removes duplicate object properties.

```js
// input file
const a = {
    a: 1,
    a: 1
};

// output file
const a = {
    a: 1
};
```

Always keeps the first property from preperty list.
