/**
 * @file
 * NodeUnit tests for tasks/lib/index.
 */

/// <reference path="../../typings/tsd.d.ts" />

import nodeunit = require('nodeunit');

var indexTest: nodeunit.ITestGroup = {

  'include': function (test: nodeunit.Test) : void {
    test.expect(1);

    var dataMerger: DataMerge.IDataMerger = require('../data-merge');

    test.deepEqual(
      dataMerger.merge([
        './fixtures/DataMerger/b.json'
      ]),
      {
        key2: 'b'
      }
    );

    test.done();
  },

};

module.exports = indexTest;
