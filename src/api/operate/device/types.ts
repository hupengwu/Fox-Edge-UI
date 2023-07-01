/**
 * 任务响应VO
 */
export interface TaskRespondVO {
  code: number;
  msg: string;
  timeout: number;
  clientName: string;
  uuid: string;
  respondVOS?: OperateRespondVO[];
}

/**
 * 任务请求VO
 */
export interface TaskRequestVO {
  uuid: string;
  clientName: string;
  timeout: number;
  requestVOS: OperateRequestVO[];
  rspdParamJson?: string;
}

/**
 * 操作响应VO
 */
export interface OperateRespondVO extends OperateRequestVO {
  code: number;
  msg: string;
  data?: object;
  dataJson?: string;
}

/**
 * 操作请求VO
 */
export interface OperateRequestVO {
  check?: boolean;
  uuid?: string;
  operateMode?: string;
  deviceName: string;
  deviceType?: string;
  operateName: string;
  record?: boolean;
  param: object;
  paramJson?: string;
  timeout: number;
}

