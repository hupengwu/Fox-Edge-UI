import {
  CreateOperateMonitorTaskRequestVO,
  OperateMonitorTaskFormData,
  OperateMonitorTaskListResult,
  OperateMonitorTaskPageResult,
  OperateMonitorTaskQueryParam,
} from './types';
import request from '@/utils/request';
import {AxiosPromise} from 'axios';

/**
 * 获取实体分页列表
 *
 * @taskParam queryParams
 */
export function listOperateTemplateEntityList(queryParams: object): AxiosPromise<OperateMonitorTaskListResult> {
  return request({
    url: '/kernel/manager/device/operate/task/monitor/entities',
    method: 'post',
    data: queryParams,
  });
}

/**
 * 获取实体分页列表
 *
 * @taskParam queryParams
 */
export function listOperateTemplateEntityListByName(queryParams: object): AxiosPromise<OperateMonitorTaskListResult> {
  return request({
    url: '/kernel/manager/device/operate/task/monitor/entitiesByName',
    method: 'post',
    data: queryParams,
  });
}

/**
 * 获取实体分页列表
 *
 * @taskParam queryParams
 */
export function listOperateTemplateEntityPages(queryParams: OperateMonitorTaskQueryParam): AxiosPromise<OperateMonitorTaskPageResult> {
  return request({
    url: '/kernel/manager/device/operate/task/monitor/page',
    method: 'post',
    data: {
      templateName: queryParams.templateName,
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
export function getOperateTemplateEntity(id: number): AxiosPromise<OperateMonitorTaskFormData> {
  return request({
    url: '/kernel/manager/device/operate/task/monitor/entity',
    method: 'get',
    params: {id: id}
  });
}

/**
 * 添加实体
 *
 * @taskParam data
 */
export function createOperateTemplateEntity(data: CreateOperateMonitorTaskRequestVO) {
  return request({
    url: '/kernel/manager/device/operate/task/monitor/entity',
    method: 'post',
    data: data,
  });
}

/**
 * 修改实体
 *
 * @taskParam data
 */
export function updateOperateTemplateEntity(data: CreateOperateMonitorTaskRequestVO) {
  return request({
    url: '/kernel/manager/device/operate/task/monitor/entity',
    method: 'put',
    data: {
      id: data.id,
      deviceType: data.deviceType,
      templateName: data.templateName,
      templateParam: data.templateParam,
      deviceIds: data.deviceIds,
    }
  });
}

/**
 * 删除实体列表
 *
 * @taskParam ids
 */
export function deleteOperateTemplateEntity(ids: string) {
  return request({
    url: '/kernel/manager/device/operate/task/monitor/entities',
    method: 'delete',
    params: {ids: ids},
  });
}
