import {formatOptionLabel} from "@/utils/formatter";


/**
 * 获取选项列表
 * @taskParam field 字段类型
 */
export function listOptionList(field: string): OptionType[] {
  const options = [] as OptionType[];

  if (field === 'role') {
    options.push({value: 'ADMIN', label: '管理员'});
    options.push({value: 'SYSTEM', label: '系统'});
  }
  if (field === 'menu') {
    options.push({value: 'ADMIN', label: '管理员'});
    options.push({value: 'SYSTEM', label: '系统'});
  }
  if (field === 'permission') {
    options.push({value: 'ADMIN', label: '管理员'});
    options.push({value: 'SYSTEM', label: '系统'});
  }

  return options;
}

/**
 * 获得option的文本
 * @taskParam optionType option的类型
 * @taskParam optionValue option的数值
 */
export function getSelectLabel(optionType: any, optionValue: any): string {
  const options = listOptionList(optionType);
  return formatOptionLabel(options, optionValue);
}

/**
 * 获得option的文本
 * @taskParam row 行信息
 * @taskParam column 列信息
 */
export function getOptionLabel(row: any, column: any): string {
  const options = listOptionList(column.property);
  return formatOptionLabel(options, row[column.property]);
}
