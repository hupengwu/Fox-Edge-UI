import {
  CreatePeriodTaskRequestVO,
  PeriodTaskFormData,
  PeriodTaskListResult,
  PeriodTaskPageResult,
  PeriodTaskQueryParam,
} from './types';
import request from '@/utils/request';
import {AxiosPromise} from 'axios';

/**
 * 获取实体分页列表
 *
 * @taskParam queryParams
 */
export function listPeriodTaskEntityList(queryParams: object): AxiosPromise<PeriodTaskListResult> {
  return request({
    url: '/service/period/task/entities',
    method: 'post',
    data: queryParams,
  });
}

/**
 * 获取实体分页列表
 *
 * @taskParam queryParams
 */
export function listPeriodTaskEntityListByName(queryParams: object): AxiosPromise<PeriodTaskListResult> {
  return request({
    url: '/service/period/task/entitiesByName',
    method: 'post',
    data: queryParams,
  });
}

/**
 * 获取实体分页列表
 *
 * @taskParam queryParams
 */
export function listPeriodTaskEntityPages(queryParams: PeriodTaskQueryParam): AxiosPromise<PeriodTaskPageResult> {
  return request({
    url: '/service/period/task/page',
    method: 'post',
    data: {
      taskName: queryParams.taskName,
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
export function getPeriodTaskEntity(name: string): AxiosPromise<PeriodTaskFormData> {
  return request({
    url: '/service/period/task/entity',
    method: 'get',
    params: {name: name}
  });
}

/**
 * 添加实体
 *
 * @taskParam data
 */
export function createPeriodTaskEntity(data: CreatePeriodTaskRequestVO) {
  return request({
    url: '/service/period/task/entity',
    method: 'post',
    data: data,
  });
}

/**
 * 修改实体
 *
 * @taskParam data
 */
export function updatePeriodTaskEntity(data: CreatePeriodTaskRequestVO) {
  return request({
    url: '/service/period/task/entity',
    method: 'put',
    data: {
      id: data.id,
      deviceType: data.deviceType,
      taskName: data.taskName,
      taskParam: data.taskParam,
      selectDevice: data.selectDevice,
      deviceIds: data.deviceIds,
      objectIds: data.objectIds,
    }
  });
}

/**
 * 删除实体列表
 *
 * @taskParam ids
 */
export function deletePeriodTaskEntity(ids: string) {
  return request({
    url: '/service/period/task/entities',
    method: 'delete',
    params: {ids: ids},
  });
}
