import {
  CreateDeviceRequestVO, DeviceFormData, DevicePageResult, DeviceQueryParam,
} from './types';
import request from '@/utils/request';
import {AxiosPromise} from 'axios';

/**
 * 获取实体分页列表
 *
 * @taskParam queryParams
 */
export function listDeviceEntityPages(queryParams: DeviceQueryParam): AxiosPromise<DevicePageResult> {
  return request({
    url: '/kernel/manager/device/page',
    method: 'post',
    data: {
      deviceName: queryParams.deviceName,
      deviceType: queryParams.deviceType,
      channelType: queryParams.channelType,
      channelName: queryParams.channelName,
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
export function getDeviceEntity(id: number): AxiosPromise<DeviceFormData> {
  return request({
    url: '/kernel/manager/device/entity',
    method: 'get',
    params: {id: id}
  });
}

/**
 * 添加实体
 *
 * @taskParam data
 */
export function createDeviceEntity(data: CreateDeviceRequestVO) {
  return request({
    url: '/kernel/manager/device/entity',
    method: 'post',
    data: data,
  });
}

/**
 * 修改实体
 *
 * @taskParam data
 */
export function updateDeviceEntity(data: CreateDeviceRequestVO) {
  return request({
    url: '/kernel/manager/device/entity',
    method: 'put',
    data: data,
  });
}

/**
 * 删除实体列表
 *
 * @taskParam ids
 */
export function deleteDeviceEntity(ids: string) {
  return request({
    url: '/kernel/manager/device/entities',
    method: 'delete',
    params: {ids: ids},
  });
}
