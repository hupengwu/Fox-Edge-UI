import {PeriodRecordFormData, PeriodRecordListResult, PeriodRecordPageResult, PeriodRecordQueryParam,} from './types';
import request from '@/utils/request';
import {AxiosPromise} from 'axios';

/**
 * 获取实体分页列表
 *
 * @taskParam queryParams
 */
export function listPeriodRecordObjectEntityPages(queryParams: PeriodRecordQueryParam): AxiosPromise<PeriodRecordPageResult> {
  return request({
    url: '/service/period/record/object/page',
    method: 'post',
    data: {
      objectName: queryParams.objectName,
      taskName: queryParams.taskName,
      recordBatch: queryParams.recordBatch,
      deviceName: queryParams.deviceName,
      pageNum: queryParams.pageNum,
      pageSize: queryParams.pageSize
    },
  });
}

/**
 * 获取实体分页列表
 *
 * @taskParam queryParams
 */
export function listPeriodTaskEntityObjectNames(queryParams: PeriodRecordQueryParam): AxiosPromise<string[]> {
  return request({
    url: '/service/period/task/objectNames',
    method: 'post',
    data: {
      taskName: queryParams.taskName,
      deviceName: queryParams.deviceName,
    },
  });
}
