import {
  CreateDeviceMapperRequestVO,
  DeviceMapperFormData,
  DeviceMapperListResult,
  DeviceMapperPageResult,
  DeviceMapperQueryParam,
} from './types';
import request from '@/utils/request';
import {AxiosPromise} from 'axios';

/**
 * 获取实体分页列表
 *
 * @taskParam queryParams
 */
export function listDeviceMapperEntityList(queryParams: object): AxiosPromise<DeviceMapperListResult> {
  return request({
    url: '/kernel/manager/device/mapper/entities',
    method: 'post',
    data: queryParams,
  });
}

/**
 * 获取实体分页列表
 *
 * @taskParam queryParams
 */
export function listDeviceMapperEntityPages(queryParams: DeviceMapperQueryParam): AxiosPromise<DeviceMapperPageResult> {
  return request({
    url: '/kernel/manager/device/mapper/page',
    method: 'post',
    data: {
      objectName: queryParams.objectName,
      deviceType: queryParams.deviceType,
      mapperName: queryParams.mapperName,
      mapperMode: queryParams.mapperMode,
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
export function getDeviceMapperEntity(id: number): AxiosPromise<DeviceMapperFormData> {
  return request({
    url: '/kernel/manager/device/mapper/entity',
    method: 'get',
    params: {id: id}
  });
}

/**
 * 添加实体
 *
 * @taskParam data
 */
export function createDeviceMapperEntity(data: CreateDeviceMapperRequestVO) {
  return request({
    url: '/kernel/manager/device/mapper/entity',
    method: 'post',
    data: data,
  });
}

/**
 * 修改实体
 *
 * @taskParam data
 */
export function updateDeviceMapperEntity(data: any) {
  return request({
    url: '/kernel/manager/device/mapper/entity',
    method: 'put',
    data: {
      list: data,
    }
  });
}

/**
 * 删除实体列表
 *
 * @taskParam ids
 */
export function deleteDeviceMapperEntity(data: any) {
  return request({
    url: '/kernel/manager/device/mapper/delete',
    method: 'post',
    data: {
      list: data,
    }
  });
}
