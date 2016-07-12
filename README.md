# Decaf Common

[![Build Status](https://travis-ci.org/biosustain/potion-node.svg?branch=master)](https://travis-ci.org/biosustain/potion-node)
[![Dependency Status](https://gemnasium.com/badges/github.com/biosustain/potion-node.svg)](https://gemnasium.com/github.com/biosustain/potion-node)

> A TypeScript collection of common js for the Decaf project.

### Installation
----------------
You can install this package via [JSPM](http://jspm.io/): 
```shell
$(node bin)/jspm install decaf-common=github:biosustain/decaf-frontend-common
```


### Contributing
----------------
Clone the repository `git clone https://github.com/biosustain/decaf-frontend-common`, install all the deps (`npm install`, `$(npm bin)/typings install`) and start hacking.
Make sure that the builds and tests will run successfully, before you make a pull request. Follow the next steps:
- use `npm run build` to build the `.ts` files and see if any errors have occurred;
- run the tests using `npm test` (*if you wish to run tests on file change, use `$(npm bin)/karma start karma.config.js`.*);
- lint the code with `npm run lint`.

**Note**: If you add new files or remove files, make sure to edit the `"files"` field in `tsconfig.json`:
```js
"files": [
    // These files MUST always be here as they provide the type definitions
    "typings/index.d.ts",
    "node_modules/typescript/lib/lib.es7.d.ts",
    // You can change the below as you wish
    "src/index.ts",
    "src/path.ts"
]
```
