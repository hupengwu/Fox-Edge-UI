import {
  CreateParamTemplateRequestVO,
  ParamTemplateFormData,
  ParamTemplateListResult,
  ParamTemplatePageResult,
  ParamTemplateQueryParam,
} from './types';
import request from '@/utils/request';
import {AxiosPromise} from 'axios';

/**
 * 获取实体分页列表
 *
 * @taskParam queryParams
 */
export function listParamTemplateEntityList(queryParams: object): AxiosPromise<ParamTemplateListResult> {
  return request({
    url: '/kernel/manager/param/template/entities',
    method: 'post',
    data: queryParams,
  });
}

/**
 * 获取实体分页列表
 *
 * @taskParam queryParams
 */
export function listParamTemplateEntityPages(queryParams: ParamTemplateQueryParam): AxiosPromise<ParamTemplatePageResult> {
  return request({
    url: '/kernel/manager/param/template/page',
    method: 'post',
    data: {
      templateType: queryParams.templateType,
      templateName: queryParams.templateName,
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
export function getParamTemplateEntity(id: number): AxiosPromise<ParamTemplateFormData> {
  return request({
    url: '/kernel/manager/param/template/entity',
    method: 'get',
    params: {id: id}
  });
}

/**
 * 添加实体
 *
 * @taskParam data
 */
export function createParamTemplateEntity(data: CreateParamTemplateRequestVO) {
  return request({
    url: '/kernel/manager/param/template/entity',
    method: 'post',
    data: data,
  });
}

/**
 * 修改实体
 *
 * @taskParam data
 */
export function updateParamTemplateEntity(data: CreateParamTemplateRequestVO) {
  return request({
    url: '/kernel/manager/param/template/entity',
    method: 'put',
    data: {
      id: data.id,
      templateType: data.templateType,
      templateName: data.templateName,
      templateParam: data.templateParam
    }
  });
}

/**
 * 删除实体列表
 *
 * @taskParam ids
 */
export function deleteParamTemplateEntity(ids: string) {
  return request({
    url: '/kernel/manager/param/template/entities',
    method: 'delete',
    params: {ids: ids},
  });
}
