import {
  CreateOperateRecordRequestVO,
  OperateRecordFormData,
  OperateRecordListResult,
  OperateRecordPageResult,
  OperateRecordQueryParam,
} from './types';
import request from '@/utils/request';
import {AxiosPromise} from 'axios';

/**
 * 获取实体分页列表
 *
 * @taskParam queryParams
 */
export function listOperateRecordEntityList(queryParams: object): AxiosPromise<OperateRecordListResult> {
  return request({
    url: '/kernel/manager/device/operate/record/entities',
    method: 'post',
    data: queryParams,
  });
}

/**
 * 获取实体分页列表
 *
 * @taskParam queryParams
 */
export function listOperateRecordEntityPages(queryParams: OperateRecordQueryParam): AxiosPromise<OperateRecordPageResult> {
  return request({
    url: '/kernel/manager/device/operate/record/page',
    method: 'post',
    data: {
      deviceName: queryParams.deviceName,
      deviceType: queryParams.deviceType,
      recordName: queryParams.recordName,
      clientModel: queryParams.clientModel,
      operateUuid: queryParams.deviceName,
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
export function getOperateRecordEntity(id: number): AxiosPromise<OperateRecordFormData> {
  return request({
    url: '/kernel/manager/device/operate/record/entity',
    method: 'get',
    params: {id: id}
  });
}

/**
 * 添加实体
 *
 * @taskParam data
 */
export function createOperateRecordEntity(data: CreateOperateRecordRequestVO) {
  return request({
    url: '/kernel/manager/device/operate/record/entity',
    method: 'post',
    data: data,
  });
}

/**
 * 修改实体
 *
 * @taskParam data
 */
export function updateOperateRecordEntity(data: CreateOperateRecordRequestVO) {
  return request({
    url: '/kernel/manager/device/operate/record/entity',
    method: 'put',
    data: {
      id: data.id,
      deviceName: data.deviceName,
      deviceType: data.deviceType,
      recordName: data.recordName,
      clientModel: data.recordData,
      operateUuid: data.deviceName,
      recordParam: data.deviceType,
      recordData: data.recordName,
    }
  });
}

/**
 * 删除实体列表
 *
 * @taskParam ids
 */
export function deleteOperateRecordEntity(ids: string) {
  return request({
    url: '/kernel/manager/device/operate/record/entities',
    method: 'delete',
    params: {ids: ids},
  });
}
