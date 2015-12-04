# data-merge

[![Build Status](https://travis-ci.org/Sweetchuck/npm-data-merge.svg?branch=)](https://travis-ci.org/Sweetchuck/npm-data-merge)
[![Dependency Status](https://david-dm.org/Sweetchuck/npm-data-merge.svg)](https://david-dm.org/Sweetchuck/npm-data-merge)
[![devDependency Status](https://david-dm.org/Sweetchuck/npm-data-merge/dev-status.svg)](https://david-dm.org/Sweetchuck/npm-data-merge#info=devDependencies)
[![Coverage Status](https://coveralls.io/repos/Sweetchuck/npm-data-merge/badge.svg?branch=master&service=github)](https://coveralls.io/github/Sweetchuck/npm-data-merge?branch=master)


Merge two or more YAML or JSON objects into one.

## Install

`npm install --save-dev data-merge`


## Executables


### Bin - data-merge

Get JSON or Yaml file names as a command line argument and merge their
content into one object and serialize the new object with JSON or Yaml and
write it to the standard output.

For more information run `node bin/data-merge.js --help`


## Contributing

Contributions welcome; Please submit all pull requests against _master_ branch.
If your pull request contains TypeScript patches or features, you should include
relevant unit tests.

__To start run__:

`npm install`

`npm run get-started`

__Before \`git commit\` run__:

`npm test`

__To check the content of the package__:

If you have added new files then run the following command and review _manually_
the content of the _tmp/package_ directory.

`npm run unpack`


## Author

**Andor Dávid**

* [GitHub](https://github.com/Sweetchuck)
* [Twitter](http://twitter.com/andor_david)
* [LinkedIn](https://hu.linkedin.com/pub/andor-dávid/5b/484/b83)


## Release History

* **v1.0.1** - 2015-11-28
  * Fix package.json/bin mapping.
* **v1.0.0** - 2015-11-28
  * Initial release with basic functions.


## License

Available under GPL-2.0+

