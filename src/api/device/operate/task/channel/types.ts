/**
 * 实体查询参数类型
 */
export interface OperateChannelTaskQueryParam extends PageQuery {
  taskName?: string;
  channelName?: string;
  channelType?: string;
}

/**
 * 实体分页列表项
 */
export interface OperateChannelTaskItem extends Entity {
  taskName?: string;
  channelName?: string;
  channelType?: string;
  sendMode?: string;
  timeout?: number;
  taskParam?: TaskParamObject;
  taskParamJson?: string;
  taskParamType?: string;
  rspdParamJson?: string;
  createTime?: number;
  updateTime?: number;
}

export interface TaskParamObject{
  sendTxt?: string;
  sendMap?: object;
  sendList?: object;
}

/**
 * 实体列表类型
 */
export type OperateChannelTaskListResult = OperateChannelTaskItem[];

/**
 * 实体分页项类型
 */
export type OperateChannelTaskPageResult = PageResult<OperateChannelTaskItem[]>;

/**
 * 实体表单类型：代表一个用于增删改查的临时对象
 */
export interface OperateChannelTaskFormData extends OperateChannelTaskItem {
  // 表单状态
  sort: number;
  status: number;
}

/**
 * 创建实体请求VO
 */
export interface CreateOperateChannelTaskRequestVO {
  id?: number;
  taskName?: string;
  channelName?: string;
  channelType?: string;
  sendMode?: string;
  timeout?: number;
  taskParam?: object;
  taskParamJson?: string;
  taskParamType?: string;
}

/**
 * 操作请求项
 */
export interface OperateRequestItem extends Entity {
  operateName: string;
  operateMode?: string;
  channelName?: string;
  channelType?: string;
  sendMode?: string;
  param: object;
  paramJson?: string;
  timeout: number;
}
