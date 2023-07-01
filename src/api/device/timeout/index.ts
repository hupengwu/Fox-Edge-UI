import {
  CreateDeviceTimeOutRequestVO,
  DeviceTimeOutFormData,
  DeviceTimeOutListResult,
  DeviceTimeOutPageResult,
  DeviceTimeOutQueryParam,
} from './types';
import request from '@/utils/request';
import {AxiosPromise} from 'axios';

/**
 * 获取实体分页列表
 *
 * @taskParam queryParams
 */
export function listDeviceTimeOutEntityList(queryParams: object): AxiosPromise<DeviceTimeOutListResult> {
  return request({
    url: '/kernel/manager/device/timeout/entities',
    method: 'post',
    data: queryParams,
  });
}

/**
 * 获取实体分页列表
 *
 * @taskParam queryParams
 */
export function listDeviceTimeOutEntityPages(queryParams: DeviceTimeOutQueryParam): AxiosPromise<DeviceTimeOutPageResult> {
  return request({
    url: '/kernel/manager/device/timeout/page',
    method: 'post',
    data: {
      deviceName: queryParams.deviceName,
      deviceType: queryParams.deviceType,
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
export function getDeviceTimeOutEntity(id: number): AxiosPromise<DeviceTimeOutFormData> {
  return request({
    url: '/kernel/manager/device/timeout/entity',
    method: 'get',
    params: {id: id}
  });
}

/**
 * 添加实体
 *
 * @taskParam data
 */
export function createDeviceTimeOutEntity(data: CreateDeviceTimeOutRequestVO) {
  return request({
    url: '/kernel/manager/device/timeout/entity',
    method: 'post',
    data: data,
  });
}

/**
 * 修改实体
 *
 * @taskParam data
 */
export function updateDeviceTimeOutEntity(data: CreateDeviceTimeOutRequestVO) {
  return request({
    url: '/kernel/manager/device/timeout/entity',
    method: 'put',
    data: {
      id: data.id,
      deviceName: data.deviceName,
      deviceType: data.deviceType,
      commFailedCount: data.commFailedCount,
      commFailedTime: data.commFailedCount,
      commSuccessTime: data.commSuccessTime,
    }
  });
}

/**
 * 删除实体列表
 *
 * @taskParam ids
 */
export function deleteDeviceTimeOutEntity(ids: string) {
  return request({
    url: '/kernel/manager/device/timeout/entities',
    method: 'delete',
    params: {ids: ids},
  });
}
