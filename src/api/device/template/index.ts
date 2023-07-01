import {
  CreateDeviceTemplateRequestVO,
  DeviceTemplatePageResult,
  DeviceTemplateQueryParam,
} from './types';
import request from '@/utils/request';
import {AxiosPromise} from 'axios';

/**
 * 获取实体分页列表
 *
 * @taskParam queryParams
 */
export function listDeviceTemplateEntities(queryParams: DeviceTemplateQueryParam): AxiosPromise<DeviceTemplatePageResult> {
  return request({
    url: '/kernel/manager/device/template/page',
    method: 'post',
    data: {
      pageNum: queryParams.pageNum,
      pageSize: queryParams.pageSize
    }
  });
}

/**
 * 删除实体列表
 *
 * @taskParam ids
 */
export function deleteDeviceTemplateEntity(data: CreateDeviceTemplateRequestVO[]): AxiosPromise<DeviceTemplatePageResult> {
  return request({
    url: '/kernel/manager/device/template/delete',
    method: 'post',
    data: {
      list: data,
    },
  });
}

export function downloadDeviceTemplateEntity(data: CreateDeviceTemplateRequestVO[]){
  return request({
    url: '/kernel/manager/device/template/download',
    method: 'post',
    data: data[0],
    responseType: 'blob',
  });
}
