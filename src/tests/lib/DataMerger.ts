/**
 * @file
 * Test for "data-merge".
 */

/// <reference path="../../../typings/tsd.d.ts" />

import nodeunit = require('nodeunit');
import DataMerger = require('../../lib/DataMerger');

var dataMergerTest: nodeunit.ITestGroup = {

  'merge': function(test: nodeunit.Test) : void {
    test.expect(1);

    var dataMerger: DataMerge.IDataMerger;
    var expected: {[key: string]: any};

    dataMerger = new DataMerger();

    expected = {
      key1: 'custom',
      key2: 'c',
      parent: {
        child1: 'a',
        child2: 'a',
      },
      key3: 'd',
      key4: 'c',
      key5: 'd',
    };
    test.deepEqual(
      expected,
      dataMerger.merge([
        './fixtures/DataMerger/a.json',
        './fixtures/DataMerger/b.json',
        './fixtures/DataMerger/c.yaml',
        './fixtures/DataMerger/d.yml',
        './fixtures/DataMerger/Z.yml',
        {key1: 'custom'},
      ])
    );

    test.done();
  },

};

module.exports = dataMergerTest;
