import request from '@/utils/request';
import {AxiosPromise} from 'axios';
import {
  ChannelFormData,
  ChannelListResult,
  ChannelPageResult,
  ChannelQueryParam,
  CreateChannelRequestVO
} from './types';


/**
 * 获取实体分页列表
 *
 * @taskParam queryParams
 */
export function listChannelEntityList(queryParams: object): AxiosPromise<ChannelListResult> {
  return request({
    url: '/kernel/manager/channel/entities',
    method: 'post',
    data: queryParams,
  });
}

/**
 * 获取实体分页列表
 *
 * @taskParam queryParams
 */
export function listChannelEntityPages(queryParams: ChannelQueryParam): AxiosPromise<ChannelPageResult> {
  return request({
    url: '/kernel/manager/channel/page',
    method: 'post',
    data: {
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
export function getChannelEntity(id: number): AxiosPromise<ChannelFormData> {
  return request({
    url: '/kernel/manager/channel/entity',
    method: 'get',
    params: {id: id}
  });
}

/**
 * 添加实体
 *
 * @taskParam data
 */
export function createChannelEntity(data: CreateChannelRequestVO) {
  return request({
    url: '/kernel/manager/channel/entity',
    method: 'post',
    data: data,
  });
}

/**
 * 修改实体
 *
 * @taskParam data
 */
export function updateChannelEntity(data: CreateChannelRequestVO) {
  return request({
    url: '/kernel/manager/channel/entity',
    method: 'put',
    data: data,
  });
}

/**
 * 删除实体列表
 *
 * @taskParam ids
 */
export function deleteChannelEntity(ids: string) {
  return request({
    url: '/kernel/manager/channel/entities',
    method: 'delete',
    params: {ids: ids},
  });
}
