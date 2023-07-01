import {
  CreateDeviceDecoderRequestVO,
  DeviceDecoderPageResult,
  DeviceDecoderQueryParam,
} from './types';
import request from '@/utils/request';
import {AxiosPromise} from 'axios';

/**
 * 获取实体分页列表
 *
 * @taskParam queryParams
 */
export function listDeviceDecoderEntityPages(queryParams: DeviceDecoderQueryParam): AxiosPromise<DeviceDecoderPageResult> {
  return request({
    url: '/kernel/manager/device/decoder/page',
    method: 'post',
    data: {
      fileName: queryParams.fileName,
      load: queryParams.load,
      pageNum: queryParams.pageNum,
      pageSize: queryParams.pageSize
    },
  });
}

/**
 * 修改实体
 *
 * @taskParam data
 */
export function updateDeviceDecoderEntity(data: CreateDeviceDecoderRequestVO) {
  return request({
    url: '/kernel/manager/device/decoder/entity',
    method: 'put',
    data: {
      fileName: data.fileName,
      load: data.load,
    }
  });
}

/**
 * 删除实体列表
 *
 * @taskParam ids
 */
export function deleteDeviceDecoderEntity(fileName: string) {
  return request({
    url: '/kernel/manager/device/decoder/entity',
    method: 'delete',
    params: {fileName: fileName},
  });
}

/**
 * 重启服务
 *
 * @taskParam ids
 */
export function restartDeviceService() {
  return request({
    url: '/kernel/manager/device/decoder/process/restart',
    method: 'post',
    data: {applicationName: 'device-service'},
  });
}

