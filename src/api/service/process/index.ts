import {ProcessStatusListResult,} from './types';
import request from '@/utils/request';
import {AxiosPromise} from 'axios';

/**
 * 获取实体分页列表
 *
 * @taskParam queryParams
 */
export function listProcessStatusList(): AxiosPromise<ProcessStatusListResult> {
  return request({
    url: '/kernel/manager/service/process/entities',
    method: 'get'
  });
}

/**
 * 重启进程
 *
 * @taskParam queryParams
 */
export function restartProcess(appName: string, appType: string): AxiosPromise<ProcessStatusListResult> {
  return request({
    url: '/kernel/manager/service/process/restart',
    method: 'post',
    data: {
      appName: appName,
      appType: appType
    },
  });
}

/**
 * 重启进程
 *
 * @taskParam queryParams
 */
export function stopProcess(appName: string, appType: string): AxiosPromise<ProcessStatusListResult> {
  return request({
    url: '/kernel/manager/service/process/stop',
    method: 'post',
    data: {
      appName: appName,
      appType: appType
    },
  });
}

export function uninstallProcess(appName: string, appType: string): AxiosPromise<ProcessStatusListResult> {
  return request({
    url: '/kernel/manager/service/process/uninstall',
    method: 'post',
    data: {
      appName: appName,
      appType: appType
    },
  });
}

/**
 * 重启进程
 *
 * @taskParam queryParams
 */
export function updateLoadConfig(appName: string, appType: string, appLoad: boolean): AxiosPromise<ProcessStatusListResult> {
  return request({
    url: '/kernel/manager/service/config/load',
    method: 'post',
    data: {
      appName: appName,
      appType: appType,
      appLoad: appLoad,
    },
  });
}

/**
 * GC 进程
 *
 * @taskParam queryParams
 */
export function gcProcess(pid: number): AxiosPromise<ProcessStatusListResult> {
  return request({
    url: '/kernel/manager/service/process/gc',
    method: 'get',
    params: {pid: pid},
  });
}
