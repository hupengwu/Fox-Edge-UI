/**
 * 实体查询参数类型
 */
export interface DeviceHistoryQueryParam extends PageQuery {
  objectId?: number;
  paramValue?: string;
  deviceName?: string;
  deviceType?: string;
  objectName?: string;
}

/**
 * 实体分页列表项
 */
export interface DeviceHistoryItem extends Entity {
  deviceName: string;
  objectName: string;
  paramValue: string;
  createTime?: number;
  updateTime?: number;
}

/**
 * 实体列表类型
 */
export type DeviceHistoryListResult = DeviceHistoryItem[];

/**
 * 实体分页项类型
 */
export type DeviceHistoryPageResult = PageResult<DeviceHistoryItem[]>;

/**
 * 实体表单类型：代表一个用于增删改查的临时对象
 */
export interface DeviceHistoryFormData extends DeviceHistoryItem {
  // 表单状态
  sort: number;
  status: number;
}

/**
 * 创建实体请求VO
 */
export interface CreateDeviceHistoryRequestVO {
  id?: number;
  objectId: number;
  paramValue: string;
}

