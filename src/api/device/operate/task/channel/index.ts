import {
  CreateOperateChannelTaskRequestVO,
  OperateChannelTaskFormData,
  OperateChannelTaskListResult,
  OperateChannelTaskPageResult,
  OperateChannelTaskQueryParam,
} from './types';
import request from '@/utils/request';
import {AxiosPromise} from 'axios';

/**
 * 获取实体分页列表
 *
 * @taskParam queryParams
 */
export function listOperateChannelTaskEntityList(queryParams: object): AxiosPromise<OperateChannelTaskListResult> {
  return request({
    url: '/kernel/manager/device/operate/task/channel/entities',
    method: 'post',
    data: queryParams,
  });
}

/**
 * 获取实体分页列表
 *
 * @taskParam queryParams
 */
export function listOperateChannelTaskEntityListByName(queryParams: object): AxiosPromise<OperateChannelTaskListResult> {
  return request({
    url: '/kernel/manager/device/operate/task/channel/entitiesByName',
    method: 'post',
    data: queryParams,
  });
}

/**
 * 获取实体分页列表
 *
 * @taskParam queryParams
 */
export function listOperateChannelTaskEntityPages(queryParams: OperateChannelTaskQueryParam): AxiosPromise<OperateChannelTaskPageResult> {
  return request({
    url: '/kernel/manager/device/operate/task/channel/page',
    method: 'post',
    data: {
      taskName: queryParams.taskName,
      channelName: queryParams.channelName,
      channelType: queryParams.channelType,
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
export function getOperateChannelTaskEntity(id: number): AxiosPromise<OperateChannelTaskFormData> {
  return request({
    url: '/kernel/manager/device/operate/task/channel/entity',
    method: 'get',
    params: {id: id}
  });
}

/**
 * 添加实体
 *
 * @taskParam data
 */
export function createOperateChannelTaskEntity(data: CreateOperateChannelTaskRequestVO) {
  return request({
    url: '/kernel/manager/device/operate/task/channel/entity',
    method: 'post',
    data: data,
  });
}

/**
 * 修改实体
 *
 * @taskParam data
 */
export function updateOperateChannelTaskEntity(data: CreateOperateChannelTaskRequestVO) {
  return request({
    url: '/kernel/manager/device/operate/task/channel/entity',
    method: 'put',
    data: {
      id: data.id,
      taskName: data.taskName,
      channelType: data.channelType,
      channelName: data.channelName,
      taskParam: data.taskParam,
      sendMode: data.sendMode,
      timeout: data.timeout,
    }
  });
}

/**
 * 删除实体列表
 *
 * @taskParam ids
 */
export function deleteOperateChannelTaskEntity(ids: string) {
  return request({
    url: '/kernel/manager/device/operate/task/channel/entities',
    method: 'delete',
    params: {ids: ids},
  });
}
