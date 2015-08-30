/**
 * @file
 * Home of DataMerger.
 */

import fs = require('fs');
import path = require('path');
import deepExtend = require('deep-extend');
import yaml = require('js-yaml');

class DataMerger implements DataMerge.IDataMerger {

  constructor() {
    // Nothing to do.
  }

  public merge(
    items: any[]
  ) : {[key: string]: any} {

    var result: {[key: string]: any} = {};
    var item: any;
    var i: number;
    var extension: string;
    var readOptions: FSReadFileSyncOptions = {
      encoding: 'utf8'
    };

    for (i = 0; i < items.length; i++) {
      item = items[i];

      if (typeof item === 'string') {
        if (!fs.existsSync(item)) {
          continue;
        }

        extension = path.extname(item).toLowerCase();
        switch (extension) {
          case '.json':
            deepExtend(result, JSON.parse(fs.readFileSync(item, readOptions)));
            break;

          case '.yml':
          case '.yaml':
            deepExtend(result, yaml.safeLoad(fs.readFileSync(item, readOptions)));
            break;

          default:
            // @todo Report: This extension is not supported.
            break;

        }
      }
      else {
        deepExtend(result, item);
      }
    }

    return result;
  }

}

export = DataMerger;
