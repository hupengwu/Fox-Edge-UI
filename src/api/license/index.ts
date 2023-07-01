import {licenseInfo,} from './types';
import request from '@/utils/request';
import {AxiosPromise} from 'axios';

/**
 * 获取License信息
 *
 * @taskParam queryParams
 */
export function getLicenseId(): AxiosPromise<licenseInfo> {
  return request({
    url: '/kernel/manager/edge/license',
    method: 'get'
  });
}

export function registerLicense(license: string): AxiosPromise<licenseInfo> {
  return request({
    url: '/kernel/manager/edge/license/register',
    method: 'post',
    data: {
      license: license,
    },
  });

}

