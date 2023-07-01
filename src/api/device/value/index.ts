import {
  CreateDeviceValueRequestVO,
  DeviceValueFormData,
  DeviceValueListResult,
  DeviceValuePageResult,
  DeviceValueQueryParam,
} from './types';
import request from '@/utils/request';
import {AxiosPromise} from 'axios';

/**
 * 获取实体分页列表
 *
 * @taskParam queryParams
 */
export function listDeviceValueEntityList(queryParams: object): AxiosPromise<DeviceValueListResult> {
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
export function listDeviceValueEntityPages(queryParams: DeviceValueQueryParam): AxiosPromise<DeviceValuePageResult> {
  return request({
    url: '/kernel/manager/device/value/page',
    method: 'post',
    data: {
      deviceName: queryParams.deviceName,
      deviceType: queryParams.deviceType,
      objectName: queryParams.objectName,
      objectTime: queryParams.objectTime,
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
export function getDeviceValueEntity(id: number): AxiosPromise<DeviceValueFormData> {
  return request({
    url: '/kernel/manager/device/value/entity',
    method: 'get',
    params: {id: id}
  });
}

/**
 * 添加实体
 *
 * @taskParam data
 */
export function createDeviceValueEntity(data: CreateDeviceValueRequestVO) {
  return request({
    url: '/kernel/manager/device/value/entity',
    method: 'post',
    data: data,
  });
}

/**
 * 修改实体
 *
 * @taskParam data
 */
export function updateDeviceValueEntity(data: CreateDeviceValueRequestVO) {
  return request({
    url: '/kernel/manager/device/value/entity',
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
export function deleteDeviceValueEntity(objectNames: any) {
  return request({
    url: '/kernel/manager/device/value/remove',
    method: 'post',
    data: {
      objectNames: objectNames,
    }
  });
}
