/**
 * @file
 * NodeUnit tests for tasks/lib/DataMergerCli.
 */

/// <reference path="../../../typings/tsd.d.ts" />

import nodeunit = require('nodeunit');
import DataMerger = require('../../lib/DataMerger');
import DataMergerCli = require('../../lib/DataMergerCli');
import jsYaml = require('js-yaml');

var dataMergerCliTest: nodeunit.ITestGroup = {

  'Option.constructor': function (test: nodeunit.Test) : void {
    test.expect(7);

    var myOption: DataMergerCli.Option;

    myOption = new DataMergerCli.Option();
    test.equal(myOption.name, null);

    myOption = new DataMergerCli.Option({
      name: 'format',
      nameShort: 'f',
      description: 'My description',
      validator: 'string',
      defaultValue: 'json',
      unknownProperty: 'foo'
    });
    test.equal(myOption.name, 'format');
    test.equal(myOption.nameShort, 'f');
    test.equal(myOption.description, 'My description');
    test.equal(myOption.validator, 'string');
    test.equal(myOption.defaultValue, 'json');
    test.equal(myOption.hasOwnProperty('unknownProperty'), false);

    test.done();
  },

  'OptionString.constructor': function (test: nodeunit.Test) : void {
    test.expect(6);

    var myOption: DataMergerCli.OptionString;

    myOption = new DataMergerCli.OptionString();
    test.equal(myOption.name, null);

    myOption = new DataMergerCli.OptionString({
      name: 'format',
      nameShort: 'f',
      description: 'My description',
      validator: 'string',
      defaultValue: 'json'
    });
    test.equal(myOption.name, 'format');
    test.equal(myOption.nameShort, 'f');
    test.equal(myOption.description, 'My description');
    test.equal(myOption.validator, 'string');
    test.equal(myOption.defaultValue, 'json');

    test.done();
  },

  'OptionNumber.constructor': function (test: nodeunit.Test) : void {
    test.expect(6);

    var myOption: DataMergerCli.OptionNumber;

    myOption = new DataMergerCli.OptionNumber();
    test.equal(myOption.name, null);

    myOption = new DataMergerCli.OptionNumber({
      name: 'indent',
      nameShort: 'i',
      description: 'My description',
      validator: 'int',
      defaultValue: 2
    });
    test.equal(myOption.name, 'indent');
    test.equal(myOption.nameShort, 'i');
    test.equal(myOption.description, 'My description');
    test.equal(myOption.validator, 'int');
    test.equal(myOption.defaultValue, '2');

    test.done();
  },

  'Handler.optionDefinitions': function (test: nodeunit.Test) : void {
    test.expect(1);

    var cli: ICli = require('cli');
    var dataMerger: DataMerge.IDataMerger;
    var handler: DataMergerCli.Handler;

    dataMerger = new DataMerger();
    handler = new DataMergerCli.Handler(cli, dataMerger, jsYaml);
    test.deepEqual(
      handler.optionDefinitions(),
      {
        format: [
          handler.options.format.nameShort,
          handler.options.format.description,
          handler.options.format.validator,
          handler.options.format.defaultValue
        ],
        indent: [
          handler.options.indent.nameShort,
          handler.options.indent.description,
          handler.options.indent.validator,
          handler.options.indent.defaultValue
        ]
      }
    );

    test.done();
  },

  'Handler.main': function (test: nodeunit.Test) : void {
    var cli: ICli = require('cli');
    var dataMerger: DataMerge.IDataMerger;

    var actual: string;
    var handler: DataMergerCli.Handler;
    var i: number;

    // Mock the output handler.
    cli.output = (
      message?: any, ...optionalParams: any[]
    ): void => {
      if (message) {
        actual += message;
      }
    };
    cli.command = 'merge';
    dataMerger = new DataMerger();
    handler = new DataMergerCli.Handler(cli, dataMerger, jsYaml);

    var args: string[] = [
      'fixtures/DataMerger/a.json',
      'fixtures/DataMerger/c.yaml',
      'fixtures/DataMerger/e.txt'
    ];
    var cases: ({
      options: {[name: string]: string | number | boolean},
      expected: string
    })[] = [
      {
        options: {
          format: 'none',
          indent: 2
        },
        expected: ''
      },
      {
        options: {
          format: 'json',
          indent: 2
        },
        expected: [
          '{',
          '  "key1": "a",',
          '  "key2": "c",',
          '  "parent": {',
          '    "child1": "a",',
          '    "child2": "a"',
          '  },',
          '  "key3": "c",',
          '  "key4": "c"',
          '}'
        ].join('\n')
      },
      {
        options: {
          format: 'json',
          indent: 4
        },
        expected: [
          '{',
          '    "key1": "a",',
          '    "key2": "c",',
          '    "parent": {',
          '        "child1": "a",',
          '        "child2": "a"',
          '    },',
          '    "key3": "c",',
          '    "key4": "c"',
          '}'
        ].join('\n')
      },
      {
        options: {
          format: 'yml',
          indent: 2
        },
        expected: [
          'key1: a',
          'key2: c',
          'parent:',
          '  child1: a',
          '  child2: a',
          'key3: c',
          'key4: c',
          ''
        ].join('\n')
      },
      {
        options: {
          format: 'yaml',
          indent: 4
        },
        expected: [
          'key1: a',
          'key2: c',
          'parent:',
          '    child1: a',
          '    child2: a',
          'key3: c',
          'key4: c',
          ''
        ].join('\n')
      }
    ];

    test.expect(cases.length);

    for (i = 0; i < cases.length; i++) {
      actual = '';
      handler.main(args, cases[i].options);
      test.equal(actual, cases[i].expected, JSON.stringify(cases[i].options));
    }

    test.done();
  },

  'Handler.main.unknown.command': function (test: nodeunit.Test) : void {
    var cli: ICli = require('cli');
    var dataMerger: DataMerge.IDataMerger;

    var actual: string;
    var handler: DataMergerCli.Handler;
    var i: number;

    // Mock the output handler.
    cli.output = (
      message?: any, ...optionalParams: any[]
    ): void => {
      if (message) {
        actual += message;
      }
    };
    cli.command = 'none';
    dataMerger = new DataMerger();
    handler = new DataMergerCli.Handler(cli, dataMerger, jsYaml);

    var args: string[] = [
      'fixtures/DataMerger/a.json',
      'fixtures/DataMerger/c.yaml'
    ];

    test.expect(1);

    actual = '';
    handler.main(
      args,
      {
        format: 'yml',
        indent: 2
      }
    );
    test.equal(actual, '', 'Unknown command');

    test.done();
  }

};

module.exports = dataMergerCliTest;
