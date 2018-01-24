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
