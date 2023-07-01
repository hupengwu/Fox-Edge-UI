/**
 * 实体查询参数类型
 */
export interface DeviceTriggerQueryParam extends PageQuery {
  modelName?: string;
  methodName?: string;
  manufacturer?: string;
}

/**
 * 实体分页列表项
 */
export interface DeviceTriggerItem extends Entity {
  modelName: string;
  methodName: string;
  manufacturer: string;
  createTime?: number;
  updateTime?: number;
}

/**
 * 实体列表类型
 */
export type DeviceTriggerListResult = DeviceTriggerItem[];

/**
 * 实体分页项类型
 */
export type DeviceTriggerPageResult = PageResult<DeviceTriggerItem[]>;

/**
 * 实体表单类型：代表一个用于增删改查的临时对象
 */
export interface DeviceTriggerFormData extends DeviceTriggerItem {
  // 表单状态
  sort: number;
  status: number;
}

/**
 * 创建实体请求VO
 */
export interface CreateDeviceTriggerRequestVO {
  id?: number;
  modelName: string;
  methodName: string;
  manufacturer: string;
}

