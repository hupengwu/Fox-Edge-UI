import {
  CreateTriggerValueRequestVO,
  TriggerValueFormData,
  TriggerValueListResult,
  TriggerValuePageResult,
  TriggerValueQueryParam,
} from './types';
import request from '@/utils/request';
import {AxiosPromise} from 'axios';

/**
 * 获取实体分页列表
 *
 * @taskParam queryParams
 */
export function listTriggerValueEntityList(queryParams: object): AxiosPromise<TriggerValueListResult> {
  return request({
    url: '/kernel/manager/device/value/entities',
    method: 'post',
    data: queryParams,
  });
}

/**
 * 获取实体分页列表
 *
 * @taskParam queryParams
 */
export function listTriggerValueEntityPages(queryParams: TriggerValueQueryParam): AxiosPromise<TriggerValuePageResult> {
  return request({
    url: '/kernel/manager/trigger/value/page',
    method: 'post',
    data: {
      deviceName: queryParams.deviceName,
      deviceType: queryParams.deviceType,
      triggerConfigName: queryParams.triggerConfigName,
      objectName: queryParams.objectName,
      pageNum: queryParams.pageNum,
      pageSize: queryParams.pageSize
    },
  });
}

/**
 * 获取实体详情
 *
 * @taskParam id
 */
export function getTriggerValueEntity(id: number): AxiosPromise<TriggerValueFormData> {
  return request({
    url: '/kernel/manager/trigger/value/entity',
    method: 'get',
    params: {id: id}
  });
}

/**
 * 添加实体
 *
 * @taskParam data
 */
export function createTriggerValueEntity(data: CreateTriggerValueRequestVO) {
  return request({
    url: '/kernel/manager/trigger/value/entity',
    method: 'post',
    data: data,
  });
}

/**
 * 修改实体
 *
 * @taskParam data
 */
export function updateTriggerValueEntity(data: CreateTriggerValueRequestVO) {
  return request({
    url: '/kernel/manager/trigger/value/entity',
    method: 'put',
    data: {
      id: data.id,
      deviceName: data.deviceName,
      deviceType: data.deviceType,
      configType: data.configType,
      params: data.configParam
    }
  });
}

/**
 * 删除实体列表
 *
 * @taskParam ids
 */
export function deleteTriggerValueEntity(ids: string) {
  return request({
    url: '/kernel/manager/trigger/value/entities',
    method: 'delete',
    params: {ids: ids},
  });
}
