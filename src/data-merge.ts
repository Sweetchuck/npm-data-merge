/**
 * @file
 * Documentation missing.
 */

/// <reference path="../typings/tsd.d.ts" />
/// <reference path="./typings/deep-extend.d.ts" />
/// <reference path="./typings/fs.d.ts" />

'use strict';

import DataMerger = require('./lib/DataMerger');

var merger: DataMerge.IDataMerger = new DataMerger();

export = merger;
