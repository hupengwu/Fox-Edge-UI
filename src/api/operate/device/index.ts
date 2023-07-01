import {
  TaskRequestVO,
} from './types';
import request from '@/utils/request';

/**
 * 操作设备
 *
 * @taskParam requestVO
 */
export function operateDevice(requestVO: TaskRequestVO): any {
  return request({
    url: '/service/proxy-redis-topic/proxy/redis/topic/device/topic_device_request_public',
    method: 'post',
    data: requestVO
  });
}
