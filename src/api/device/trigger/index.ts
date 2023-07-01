import {
  CreateDeviceTriggerRequestVO,
  DeviceTriggerFormData,
  DeviceTriggerListResult,
  DeviceTriggerPageResult,
  DeviceTriggerQueryParam,
} from './types';
import request from '@/utils/request';
import {AxiosPromise} from 'axios';

/**
 * 获取实体分页列表
 *
 * @taskParam queryParams
 */
export function listDeviceTriggerEntityList(queryParams: object): AxiosPromise<DeviceTriggerListResult> {
  return request({
    url: '/kernel/manager/device/trigger/entities',
    method: 'post',
    data: queryParams,
  });
}

/**
 * 获取实体分页列表
 *
 * @taskParam queryParams
 */
export function listDeviceTriggerEntityPages(queryParams: DeviceTriggerQueryParam): AxiosPromise<DeviceTriggerPageResult> {
  return request({
    url: '/kernel/manager/device/trigger/page',
    method: 'post',
    data: {
      modelName: queryParams.modelName,
      methodName: queryParams.methodName,
      manufacturer: queryParams.manufacturer,
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
export function getDeviceTriggerEntity(id: number): AxiosPromise<DeviceTriggerFormData> {
  return request({
    url: '/kernel/manager/device/trigger/entity',
    method: 'get',
    params: {id: id}
  });
}

/**
 * 添加实体
 *
 * @taskParam data
 */
export function createDeviceTriggerEntity(data: CreateDeviceTriggerRequestVO) {
  return request({
    url: '/kernel/manager/device/trigger/entity',
    method: 'post',
    data: data,
  });
}

/**
 * 修改实体
 *
 * @taskParam data
 */
export function updateDeviceTriggerEntity(data: CreateDeviceTriggerRequestVO) {
  return request({
    url: '/kernel/manager/device/trigger/entity',
    method: 'put',
    data: {
      id: data.id,
      deviceName: data.modelName,
      methodName: data.methodName,
      manufacturer: data.manufacturer
    }
  });
}

/**
 * 删除实体列表
 *
 * @taskParam ids
 */
export function deleteDeviceTriggerEntity(ids: string) {
  return request({
    url: '/kernel/manager/device/trigger/entities',
    method: 'delete',
    params: {ids: ids},
  });
}
