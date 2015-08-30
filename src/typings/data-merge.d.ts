/**
 * @file
 * Documentation missing.
 */


declare module DataMerge {

  export interface IDataMerger {

    merge(
      items: any[]
    ): {[key: string]: any};

  }

}

declare module 'data-merge' {

  var m: DataMerge.IDataMerger;

  export = m;

}
