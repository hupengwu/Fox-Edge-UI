import {formatOptionLabel} from "@/utils/formatter";


/**
 * 获取选项列表
 * @taskParam field 字段类型
 */
export function listOptionList(field: string): OptionType[] {
  const options = [] as OptionType[];

  if (field === 'templateType') {
    options.push({value: 'DeviceEntity', label: '设备管理.参数'});
    options.push({value: 'OperateTemplateEntity', label: '操作模板.参数'});
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
