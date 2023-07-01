import {formatOptionLabel} from "@/utils/formatter";


/**
 * 获取选项列表
 * @taskParam field 字段类型
 */
export function listOptionList(field: string): OptionType[] {
  const options = [] as OptionType[];

  if (field === 'polling') {
    options.push({value: 'true', label: '是'});
    options.push({value: 'false', label: '否'});
  }
  if (field === 'dataType') {
    options.push({value: 'result', label: '操作结果'});
    options.push({value: 'status', label: '设备状态'});
    options.push({value: 'record', label: '设备记录'});
  }
  if (field === 'operateMode') {
    options.push({value: 'exchange', label: '问答操作'});
    options.push({value: 'publish', label: '发布操作'});
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
