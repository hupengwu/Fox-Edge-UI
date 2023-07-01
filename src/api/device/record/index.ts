import {
  CreateDeviceRecordRequestVO,
  DeviceRecordFormData,
  DeviceRecordListResult,
  DeviceRecordPageResult,
  DeviceRecordQueryParam,
} from './types';
import request from '@/utils/request';
import {AxiosPromise} from 'axios';

/**
 * 获取实体分页列表
 *
 * @taskParam queryParams
 */
export function listDeviceRecordEntityList(queryParams: object): AxiosPromise<DeviceRecordListResult> {
  return request({
    url: '/kernel/manager/device/record/entities',
    method: 'post',
    data: queryParams,
  });
}

/**
 * 获取实体分页列表
 *
 * @taskParam queryParams
 */
export function listDeviceRecordEntityPages(queryParams: DeviceRecordQueryParam): AxiosPromise<DeviceRecordPageResult> {
  return request({
    url: '/kernel/manager/device/record/page',
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
export function getDeviceRecordEntity(id: number): AxiosPromise<DeviceRecordFormData> {
  return request({
    url: '/kernel/manager/device/record/entity',
    method: 'get',
    params: {id: id}
  });
}

/**
 * 添加实体
 *
 * @taskParam data
 */
export function createDeviceRecordEntity(data: CreateDeviceRecordRequestVO) {
  return request({
    url: '/kernel/manager/device/record/entity',
    method: 'post',
    data: data,
  });
}

/**
 * 修改实体
 *
 * @taskParam data
 */
export function updateDeviceRecordEntity(data: CreateDeviceRecordRequestVO) {
  return request({
    url: '/kernel/manager/device/record/entity',
    method: 'put',
    data: {
      id: data.id,
      deviceName: data.deviceName,
      deviceType: data.deviceType,
      recordName: data.recordName,
      recordData: data.recordData,
    }
  });
}

/**
 * 删除实体列表
 *
 * @taskParam ids
 */
export function deleteDeviceRecordEntity(ids: string) {
  return request({
    url: '/kernel/manager/device/record/entities',
    method: 'delete',
    params: {ids: ids},
  });
}
