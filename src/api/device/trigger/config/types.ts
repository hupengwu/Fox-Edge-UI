/**
 * 实体查询参数类型
 */
export interface TriggerConfigQueryParam extends PageQuery {
  deviceType?: string;
  triggerMethodName?: string;
  triggerModelName?: string;
  objectRange?: string;
  queueDeep?: number;
  triggerConfigName?: string;
  deviceName?: string;
}

/**
 * 实体分页列表项
 */
export interface TriggerConfigItem extends Entity{
  deviceType: string;
  triggerMethodName: string;
  triggerModelName: string;
  objectRange: string;
  queueDeep: number;
  triggerConfigName: string;
  deviceName: string;
  params: object;
  paramsJson: string;
  objectList: object;
  objectListJson: string;
  createTime?: number;
  updateTime?: number;
}

/**
 * 实体列表类型
 */
export type TriggerConfigListResult = TriggerConfigItem[];

/**
 * 实体分页项类型
 */
export type TriggerConfigPageResult = PageResult<TriggerConfigItem[]>;

/**
 * 实体表单类型：代表一个用于增删改查的临时对象
 */
export interface TriggerConfigFormData extends TriggerConfigItem {
  // 表单状态
  sort: number;
  status: number;
}

/**
 * 创建实体请求VO
 */
export interface CreateTriggerConfigRequestVO {
  id?: number;
  deviceType: string;
  triggerMethodName: string;
  triggerModelName: string;
  objectRange: string;
  queueDeep: number;
  triggerConfigName: string;
  deviceName: string;
  params: object;
  paramsJson: string;
  objectList: object;
  objectListJson: string;
}

