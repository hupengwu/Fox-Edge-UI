/**
 * 操作响应VO
 */
export interface ChannelRespondVO extends ChannelRequestVO {
  code: number;
  msg: string;
}

/**
 * 操作请求VO
 */
export interface ChannelRequestVO {
  name?: string;
  uuid?: string;
  mode?: string;
  send: object;
  timeout: number;
}

