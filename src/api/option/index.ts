import request from '@/utils/request';
import {AxiosPromise} from 'axios';


/**
 * 获取选项列表
 * @taskParam entityType 实体类型
 * @taskParam field
 */
export function listOptionList(entityType: string, field: string): AxiosPromise<OptionType[]> {
  return request({
    url: '/kernel/manager/option/data',
    method: 'post',
    data: {entityType: entityType, field1: field},
  });
}

/**
 * 获取选项列表
 * @taskParam entityType 实体类型
 * @taskParam field
 */
export function listOption2List(entityType: string, field1: string, value1: string, field2: string): AxiosPromise<OptionType[]> {
  return request({
    url: '/kernel/manager/option/data',
    method: 'post',
    data: {entityType: entityType, field1: field1, value1: value1, field2: field2},
  });
}

/**
 * 获取选项列表
 * @taskParam entityType 实体类型
 * @taskParam field
 */
export function listOption2VLList(entityType: string, field1: string, value1: string, field2: string, value: string, label: string): AxiosPromise<OptionType[]> {
  return request({
    url: '/kernel/manager/option/data',
    method: 'post',
    data: {entityType: entityType, field1: field1, value1: value1, field2: field2, value: value, label: label},
  });
}
