/**
 * @file
 * TypeScript definitions for deep-extend.
 */

interface IDeepExtend {

  (...something: any[]): any;

}

declare module 'deep-extend' {

  var deepExtend: IDeepExtend;

  export = deepExtend;

}
