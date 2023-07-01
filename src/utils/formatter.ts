/**
 * el-table-column的时间格式化
 * @taskParam row
 * @taskParam column
 */
export function formatDate4elTableColumn(row: any, column: any) {
  // 获取单元格数据
  const data = row[column.property];
  if (data === null || data === 0 || data=== undefined) {
    return '-'
  }
  const dt = new Date(data)
  return dt.getFullYear() + '-' + (dt.getMonth() + 1) + '-' + dt.getDate() + ' ' + dt.getHours() + ':' + dt.getMinutes() + ':' + dt.getSeconds()
}

export function formatDate4elTableColumn2(row: any, column: any) {
  const cs = column.property.split(".");
  if (cs.length < 2){
    return '-'
  }
  // 获取单元格数据
  const data0 = row[cs[0]];
  if (data0 === null || data0 === 0 || data0=== undefined) {
    return '-'
  }

  const data1 = data0[cs[1]];
  if (data1 === null || data1 === 0 || data1=== undefined) {
    return '-'
  }

  const dt = new Date(data1)
  return dt.getFullYear() + '-' + (dt.getMonth() + 1) + '-' + dt.getDate() + ' ' + dt.getHours() + ':' + dt.getMinutes() + ':' + dt.getSeconds()
}

/**
 * 格式化行的option信息信息
 * @taskParam options
 * @taskParam optionValue
 */
export function formatOptionLabel(options: OptionType[], optionValue: any): string {
  let label = '';
  options.map(value => {
    if (value.value === String(optionValue)) {
      label = value.label;
      return label;
    }
  });

  return label;

}
