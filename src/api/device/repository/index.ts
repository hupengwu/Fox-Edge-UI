import {CreateRepositoryRequestVO, RepositoryPageResult, RepositoryQueryParam,} from './types';
import request from '@/utils/request';
import {AxiosPromise} from 'axios';

export function listEntityList(queryParams: RepositoryQueryParam): AxiosPromise<RepositoryPageResult> {
  return request({
    url: '/kernel/manager/repository/page',
    method: 'post',
    data: {
      source: queryParams.source,
      modelType: queryParams.modelType,
      modelName: queryParams.modelName,
      component: queryParams.component,
      status: queryParams.status !== undefined ? Number(queryParams.status) : undefined,
      pageNum: queryParams.pageNum,
      pageSize: queryParams.pageSize
    }
  });
}

export function downloadEntity(data: CreateRepositoryRequestVO): AxiosPromise<RepositoryPageResult> {
  return request({
    url: '/kernel/manager/repository/download',
    method: 'post',
    data: {
      list: data,
    },
  });
}

export function installEntity(data: CreateRepositoryRequestVO): AxiosPromise<RepositoryPageResult> {
  return request({
    url: '/kernel/manager/repository/install',
    method: 'post',
    data: {
      modelType: data.modelType,
      modelName: data.modelName,
      fileName: data.fileName,
      version: data.version,
      component: data.component,
    },
  });
}

export function scanEntityList(data: CreateRepositoryRequestVO): AxiosPromise<RepositoryPageResult> {
  return request({
    url: '/kernel/manager/repository/scan',
    method: 'post',
    data: {
      modelType: data.modelType,
    },
  });
}

export function deleteEntity(data: CreateRepositoryRequestVO[]): AxiosPromise<RepositoryPageResult> {
  return request({
    url: '/kernel/manager/repository/delete',
    method: 'post',
    data: {
      list: data,
    },
  });
}
