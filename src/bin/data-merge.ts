/**
 * @file
 * CLI version of Data merger.
 */

/// <reference path="../typings/cli.d.ts" />

import cli = require('cli');
import jsYaml = require('js-yaml');
import dataMerger = require('../data-merge');
import DataMergerCli = require('../lib/DataMergerCli');

var handler: DataMergerCli.Handler = new DataMergerCli.Handler(cli, dataMerger, jsYaml);

cli.parse(handler.optionDefinitions(), handler.commands);
cli.main(handler.main);
