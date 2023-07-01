import {
  CreateOperateManualTaskRequestVO,
  OperateManualTaskFormData,
  OperateManualTaskListResult,
  OperateManualTaskPageResult,
  OperateManualTaskQueryParam,
} from './types';
import request from '@/utils/request';
import {AxiosPromise} from 'axios';

/**
 * 获取实体分页列表
 *
 * @taskParam queryParams
 */
export function listOperateManualTaskEntityList(queryParams: object): AxiosPromise<OperateManualTaskListResult> {
  return request({
    url: '/kernel/manager/device/operate/task/manual/entities',
    method: 'post',
    data: queryParams,
  });
}

/**
 * 获取实体分页列表
 *
 * @taskParam queryParams
 */
export function listOperateManualTaskEntityListByName(queryParams: object): AxiosPromise<OperateManualTaskListResult> {
  return request({
    url: '/kernel/manager/device/operate/task/manual/entitiesByName',
    method: 'post',
    data: queryParams,
  });
}

/**
 * 获取实体分页列表
 *
 * @taskParam queryParams
 */
export function listOperateManualTaskEntityPages(queryParams: OperateManualTaskQueryParam): AxiosPromise<OperateManualTaskPageResult> {
  return request({
    url: '/kernel/manager/device/operate/task/manual/page',
    method: 'post',
    data: {
      taskName: queryParams.taskName,
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
export function getOperateManualTaskEntity(id: number): AxiosPromise<OperateManualTaskFormData> {
  return request({
    url: '/kernel/manager/device/operate/task/manual/entity',
    method: 'get',
    params: {id: id}
  });
}

/**
 * 添加实体
 *
 * @taskParam data
 */
export function createOperateManualTaskEntity(data: CreateOperateManualTaskRequestVO) {
  return request({
    url: '/kernel/manager/device/operate/task/manual/entity',
    method: 'post',
    data: data,
  });
}

/**
 * 修改实体
 *
 * @taskParam data
 */
export function updateOperateManualTaskEntity(data: CreateOperateManualTaskRequestVO) {
  return request({
    url: '/kernel/manager/device/operate/task/manual/entity',
    method: 'put',
    data: {
      id: data.id,
      taskName: data.taskName,
      deviceType: data.deviceType,
      deviceName: data.deviceName,
      taskParam: data.taskParam
    }
  });
}

/**
 * 删除实体列表
 *
 * @taskParam ids
 */
export function deleteOperateManualTaskEntity(ids: string) {
  return request({
    url: '/kernel/manager/device/operate/task/manual/entities',
    method: 'delete',
    params: {ids: ids},
  });
}
