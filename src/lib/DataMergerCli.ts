/**
 * @file
 * Home of DataMergerCli.
 */

/// <reference path="../../typings/tsd.d.ts" />
/// <reference path="../typings/cli.d.ts" />
/// <reference path="../typings/data-merge.d.ts" />

export class Option {

  public name: string = null;

  public nameShort: string = null;

  public description: string = null;

  public validator: string = 'string';

  public defaultValue: any = null;

  public value: any = null;

  protected properties: string[] = [
    'defaultValue',
    'description',
    'name',
    'nameShort',
    'validator',
  ];

  constructor(
    values?: {[name: string]: any}
  ) {
    if (typeof values !== 'undefined') {
      var i: number;
      var propertyName: string;
      for (i = 0; i < this.properties.length; i++) {
        propertyName = this.properties[i];
        /* istanbul ignore else */
        if (values.hasOwnProperty(propertyName)) {
          this[propertyName] = values[propertyName];
        }
      }
    }
  }

}

export class OptionString extends Option {

  public defaultValue: string;

  public value: string;

}

export class OptionNumber extends Option {

  public defaultValue: number;

  public value: number;

}

export class Handler {

  public options: {
    format: OptionString,
    indent: OptionNumber
  } = {
    format: new OptionString({
      defaultValue: 'json',
      description: 'Output format. json|yaml',
      name: 'format',
      nameShort: 'f',
      validator: ['json', 'yaml', 'yml'],
    }),
    indent: new OptionNumber({
      defaultValue: 2,
      description: 'Number of indentation.',
      name: 'indent',
      nameShort: 'i',
      validator: 'int',
    }),
  };

  public commands: {
    [name: string]: string;
  } = {
    merge: 'Merge all files into one. The later one overwrite the previous ones.'
  };

  protected cli: ICli;

  protected dataMerger: DataMerge.IDataMerger;

  protected jsYaml: typeof jsyaml;

  constructor(
    cli: ICli,
    dataMerger: DataMerge.IDataMerger,
    jsYaml: typeof jsyaml
  ) {
    this.cli = cli;
    this.dataMerger = dataMerger;
    this.jsYaml = jsYaml;

    this.cli.enable('help', 'version');
  }

  public optionDefinitions: {(): CLIOptionDefinitions} = (): CLIOptionDefinitions => {
    var options: CLIOptionDefinitions = {};
    var name: string;
    var option: Option;
    for (name in this.options) {
      /* istanbul ignore else */
      if (this.options.hasOwnProperty(name)) {
        option = this.options[name];
        options[option.name] = [
          option.nameShort,
          option.description,
          option.validator,
          option.defaultValue,
        ];
      }
    }

    return options;
  };

  public main: CLIMainCommandCallback = (
    args: string[],
    options: {[name: string]: string | number | boolean}
  ) => {
    var optionName: string;
    for (optionName in options) {
      /* istanbul ignore else */
      if (options.hasOwnProperty(optionName)) {
        this.options[optionName].value = options[optionName];
      }
    }

    switch (this.cli.command) {
      case 'merge':
        this.cmdMerge(args);
        break;

      default:
        // Currently only the "merge" action is supported.
        break;

    }
  };

  public cmdMerge: {(args: string[]): void} = (
    args: string[]
  ): void => {
    var result: {[key: string]: any} = this.dataMerger.merge(args);

    switch (this.options.format.value) {
      case 'json':
        this.cli.output(JSON.stringify(result, null, this.options.indent.value));
        break;

      case 'yml':
      case 'yaml':
        this.cli.output(this.jsYaml.dump(result, {indent: this.options.indent.value}));
        break;

      default:
        // @todo Report: This format is not supported.
        break;

    }
  };

}
