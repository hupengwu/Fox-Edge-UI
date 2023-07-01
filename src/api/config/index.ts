import {
  ConfigPageResult,
  ConfigQueryParam,
  CreateConfigRequestVO,
} from './types';
import request from '@/utils/request';
import {AxiosPromise} from 'axios';


/**
 * 获取实体分页列表
 *
 * @taskParam queryParams
 */
export function listConfigEntityPages(queryParams: ConfigQueryParam): AxiosPromise<ConfigPageResult> {
  return request({
    url: '/kernel/manager/config/page',
    method: 'post',
    data: {configName: queryParams.configName, serviceName: queryParams.serviceName, pageNum: queryParams.pageNum, pageSize: queryParams.pageSize},
  });
}

/**
 * 添加实体
 *
 * @taskParam data
 */
export function createConfigEntity(data: CreateConfigRequestVO) {
  return request({
    url: '/kernel/manager/config/entity',
    method: 'post',
    data: data,
  });
}

/**
 * 修改实体
 *
 * @taskParam data
 */
export function updateConfigEntity(data: CreateConfigRequestVO) {
  return request({
    url: '/kernel/manager/config/entity',
    method: 'put',
    data: data,
  });
}

/**
 * 删除实体列表
 *
 * @taskParam ids
 */
export function deleteConfigEntity(ids: string) {
  return request({
    url: '/kernel/manager/config/entities',
    method: 'delete',
    params: {ids: ids},
  });
}
