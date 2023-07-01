/**
 * 实体查询参数类型
 */
export interface OperateManualTaskQueryParam extends PageQuery {
  taskName?: string;
  deviceName?: string;
  deviceType?: string;
}

/**
 * 实体分页列表项
 */
export interface OperateManualTaskItem extends Entity {
  taskName: string;
  deviceName: string;
  deviceType: string;
  taskParam: object;
  taskParamJson?: string;
  rspdParamJson?: string;
  createTime: number;
  updateTime: number;
}

/**
 * 实体列表类型
 */
export type OperateManualTaskListResult = OperateManualTaskItem[];

/**
 * 实体分页项类型
 */
export type OperateManualTaskPageResult = PageResult<OperateManualTaskItem[]>;

/**
 * 实体表单类型：代表一个用于增删改查的临时对象
 */
export interface OperateManualTaskFormData extends OperateManualTaskItem {
  // 表单状态
  sort: number;
  status: number;
}

/**
 * 创建实体请求VO
 */
export interface CreateOperateManualTaskRequestVO {
  id?: number;
  taskName?: string;
  deviceName?: string;
  deviceType?: string;
  taskParam?: object;
  taskParamJson?: string;
  requestItem?: OperateRequestItem;
}

/**
 * 操作请求项
 */
export interface OperateRequestItem extends Entity {
  operateName: string;
  operateMode: string;
  deviceName: string;
  deviceType: string;
  param: object;
  paramJson?: string;
  timeout: number;
}
