import {
  CreateDeviceOperateRequestVO,
  DeviceOperateFormData,
  DeviceOperateListResult,
  DeviceOperatePageResult,
  DeviceOperateQueryParam,
} from './types';
import request from '@/utils/request';
import {AxiosPromise} from 'axios';

/**
 * 获取实体分页列表
 *
 * @taskParam queryParams
 */
export function listDeviceOperateEntityList(queryParams: object): AxiosPromise<DeviceOperateListResult> {
  return request({
    url: '/kernel/manager/device/operate/entities',
    method: 'post',
    data: queryParams,
  });
}

/**
 * 获取实体分页列表
 *
 * @taskParam queryParams
 */
export function listDeviceOperateEntityPages(queryParams: DeviceOperateQueryParam): AxiosPromise<DeviceOperatePageResult> {
  return request({
    url: '/kernel/manager/device/operate/page',
    method: 'post',
    data: {
      deviceType: queryParams.deviceType,
      operateName: queryParams.operateName,
      operateMode: queryParams.operateMode,
      manufacturer: queryParams.manufacturer,
      dataType: queryParams.dataType,
      polling: queryParams.polling,
      timeout: queryParams.timeout,
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
export function getDeviceOperateEntity(id: number): AxiosPromise<DeviceOperateFormData> {
  return request({
    url: '/kernel/manager/device/operate/entity',
    method: 'get',
    params: {id: id}
  });
}

/**
 * 添加实体
 *
 * @taskParam data
 */
export function createDeviceOperateEntity(data: CreateDeviceOperateRequestVO) {
  return request({
    url: '/kernel/manager/device/operate/entity',
    method: 'post',
    data: data,
  });
}

/**
 * 修改实体
 *
 * @taskParam data
 */
export function updateDeviceOperateEntity(data: CreateDeviceOperateRequestVO) {
  return request({
    url: '/kernel/manager/device/operate/entity',
    method: 'put',
    data: {
      id: data.id,
      deviceType: data.deviceType,
      operateName: data.operateName,
      operateMode: data.operateMode,
      manufacturer: data.manufacturer,
      dataType: data.dataType,
      polling: data.polling,
      timeout: data.timeout,
    }
  });
}

/**
 * 删除实体列表
 *
 * @taskParam ids
 */
export function deleteDeviceOperateEntity(ids: string) {
  return request({
    url: '/kernel/manager/device/operate/entities',
    method: 'delete',
    params: {ids: ids},
  });
}
