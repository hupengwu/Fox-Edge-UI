import {
  CreateDeviceHistoryRequestVO,
  DeviceHistoryFormData,
  DeviceHistoryListResult,
  DeviceHistoryPageResult,
  DeviceHistoryQueryParam,
} from './types';
import request from '@/utils/request';
import {AxiosPromise} from 'axios';

/**
 * 获取实体分页列表
 *
 * @taskParam queryParams
 */
export function listDeviceHistoryEntityList(queryParams: object): AxiosPromise<DeviceHistoryListResult> {
  return request({
    url: '/kernel/manager/device/history/entities',
    method: 'post',
    data: queryParams,
  });
}

/**
 * 获取实体分页列表
 *
 * @taskParam queryParams
 */
export function listDeviceHistoryEntityPages(queryParams: DeviceHistoryQueryParam): AxiosPromise<DeviceHistoryPageResult> {
  return request({
    url: '/kernel/manager/device/history/page',
    method: 'post',
    data: {
      deviceName: queryParams.deviceName,
      objectName: queryParams.objectName,
      paramValue: queryParams.paramValue,
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
export function getDeviceHistoryEntity(id: number): AxiosPromise<DeviceHistoryFormData> {
  return request({
    url: '/kernel/manager/device/history/entity',
    method: 'get',
    params: {id: id}
  });
}

/**
 * 添加实体
 *
 * @taskParam data
 */
export function createDeviceHistoryEntity(data: CreateDeviceHistoryRequestVO) {
  return request({
    url: '/kernel/manager/device/history/entity',
    method: 'post',
    data: data,
  });
}

/**
 * 修改实体
 *
 * @taskParam data
 */
export function updateDeviceHistoryEntity(data: CreateDeviceHistoryRequestVO) {
  return request({
    url: '/kernel/manager/device/history/entity',
    method: 'put',
    data: {
      id: data.id,
      objectId: data.objectId,
      paramValue: data.paramValue,
    }
  });
}

/**
 * 删除实体列表
 *
 * @taskParam ids
 */
export function deleteDeviceHistoryEntity(ids: string) {
  return request({
    url: '/kernel/manager/device/history/entities',
    method: 'delete',
    params: {ids: ids},
  });
}
