import {formatOptionLabel} from "@/utils/formatter";


/**
 * 获取选项列表
 * @taskParam field 字段类型
 */
export function listTriggerOptionList(field: string): OptionType[] {
  const options = [] as OptionType[];

  if (field === 'objectRange') {
    options.push({value: 'Global', label: '全局级'});
    options.push({value: 'Device', label: '设备级'});
  }

  return options;
}

/**
 * 获得option的文本
 * @taskParam optionType option的类型
 * @taskParam optionValue option的数值
 */
export function getSelectLabel(optionType: any, optionValue: any): string {
  const options = listTriggerOptionList(optionType);
  return formatOptionLabel(options, optionValue);
}

/**
 * 获得option的文本
 * @taskParam row 行信息
 * @taskParam column 列信息
 */
export function getOptionLabel(row: any, column: any): string {
  const options = listTriggerOptionList(column.property);
  return formatOptionLabel(options, row[column.property]);
}
