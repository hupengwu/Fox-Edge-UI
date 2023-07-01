import {ServiceStatusItemListResult,} from './types';
import request from '@/utils/request';
import {AxiosPromise} from 'axios';

/**
 * 获取实体分页列表
 *
 * @taskParam queryParams
 */
export function listServiceStatusList(): AxiosPromise<ServiceStatusItemListResult> {
  return request({
    url: '/kernel/manager/service/status/entities',
    method: 'get'
  });
}

/**
 * 获取实体分页列表
 *
 * @taskParam queryParams
 */
export function listProcessStatusList(): AxiosPromise<ServiceStatusItemListResult> {
  return request({
    url: '/kernel/manager/service/process/entities',
    method: 'get'
  });
}
