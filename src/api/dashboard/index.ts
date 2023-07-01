import request from '@/utils/request';
import {AxiosPromise} from 'axios';
import {Indicator} from './types';

/**
 * 获取实体分页列表
 *
 * @taskParam queryParams
 */
export function listIndicator(): AxiosPromise<Indicator> {
  return request({
    url: '/kernel/manager/dashboard/indicator',
    method: 'post',
    data: {},
  });
}

