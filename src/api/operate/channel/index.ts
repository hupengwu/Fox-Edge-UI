import {
  ChannelRequestVO,
} from './types';
import request from '@/utils/request';

/**
 * 操作设备
 *
 * @taskParam requestVO
 */
export function operateChannel(channelType: string, requestVO: ChannelRequestVO): any {
  return request({
    url: '/service/proxy-redis-topic/proxy/redis/topic/channel/topic_channel_request_' + channelType,
    method: 'post',
    data: requestVO
  });
}
