/**
 * 实体查询参数类型
 */
export interface TriggerValueQueryParam extends PageQuery {
  deviceType?: string;
  deviceName?: string;
  triggerConfigName?: string;
  objectName?: string;
}

/**
 * 实体分页列表项
 */
export interface TriggerValueItem extends Entity {
  deviceName: string;
  deviceType: string;
  triggerConfigName: string;
  objectName: string;
  objectValue: object;
  objectTime: number;
  createTime?: number;
  updateTime?: number;
}

/**
 * 实体列表类型
 */
export type TriggerValueListResult = TriggerValueItem[];

/**
 * 实体分页项类型
 */
export type TriggerValuePageResult = PageResult<TriggerValueItem[]>;

/**
 * 实体表单类型：代表一个用于增删改查的临时对象
 */
export interface TriggerValueFormData extends TriggerValueItem {
  // 表单状态
  sort: number;
  status: number;
}

/**
 * 创建实体请求VO
 */
export interface CreateTriggerValueRequestVO {
  id?: number;
  deviceName: string;
  deviceType: string;
  configType: string;
  configParam: object;
}

