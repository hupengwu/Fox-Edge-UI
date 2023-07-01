import {
  CreateTriggerConfigRequestVO,
  TriggerConfigFormData,
  TriggerConfigListResult,
  TriggerConfigPageResult,
  TriggerConfigQueryParam,
} from './types';
import request from '@/utils/request';
import {AxiosPromise} from 'axios';

/**
 * 获取实体分页列表
 *
 * @taskParam queryParams
 */
export function listTriggerConfigEntityList(queryParams: object): AxiosPromise<TriggerConfigListResult> {
  return request({
    url: '/kernel/manager/device/trigger/config/entities',
    method: 'post',
    data: queryParams,
  });
}

/**
 * 获取实体分页列表
 *
 * @taskParam queryParams
 */
export function listTriggerConfigEntityPages(queryParams: TriggerConfigQueryParam): AxiosPromise<TriggerConfigPageResult> {
  return request({
    url: '/kernel/manager/device/trigger/config/page',
    method: 'post',
    data: {
      deviceType: queryParams.deviceType,
      triggerMethodName: queryParams.triggerMethodName,
      triggerModelName: queryParams.triggerModelName,
      objectRange: queryParams.objectRange,
      queueDeep: queryParams.queueDeep,
      triggerConfigName: queryParams.triggerConfigName,
      deviceName: queryParams.deviceName,
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
export function getTriggerConfigEntity(id: number): AxiosPromise<TriggerConfigFormData> {
  return request({
    url: '/kernel/manager/device/trigger/config/entity',
    method: 'get',
    params: {id: id}
  });
}

/**
 * 添加实体
 *
 * @taskParam data
 */
export function createTriggerConfigEntity(data: CreateTriggerConfigRequestVO) {
  return request({
    url: '/kernel/manager/device/trigger/config/entity',
    method: 'post',
    data: data,
  });
}

/**
 * 修改实体
 *
 * @taskParam data
 */
export function updateTriggerConfigEntity(data: CreateTriggerConfigRequestVO) {
  return request({
    url: '/kernel/manager/device/trigger/config/entity',
    method: 'put',
    data: {
      id: data.id,
      deviceType: data.deviceType,
      triggerMethodName: data.triggerMethodName,
      triggerModelName: data.triggerModelName,
      objectRange: data.objectRange,
      queueDeep: data.queueDeep,
      triggerConfigName: data.triggerConfigName,
      deviceName: data.deviceName,
      objectList: data.objectList,
      params: data.params,
    },
  });
}

/**
 * 删除实体列表
 *
 * @taskParam ids
 */
export function deleteTriggerConfigEntity(ids: string) {
  return request({
    url: '/kernel/manager/device/trigger/config/entities',
    method: 'delete',
    params: {ids: ids},
  });
}
