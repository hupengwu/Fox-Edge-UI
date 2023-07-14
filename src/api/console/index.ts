import request from '@/utils/request';
import {AxiosPromise} from 'axios';
import {ConsolePageResult, ConsoleQueryParam,} from './types';

/**
 * 获取实体分页列表
 *
 * @taskParam queryParams
 */
export function listConsoleEntityPages(queryParams: ConsoleQueryParam): AxiosPromise<ConsolePageResult> {
  return request({
    url: '/kernel/manager/console/page',
    method: 'post',
    data: {
      serviceType: queryParams.serviceType,
      serviceName: queryParams.serviceName,
      level: queryParams.level,
      pageNum: queryParams.pageNum,
      pageSize: queryParams.pageSize
    },
  });
}
