/**
 * 实体查询参数类型
 */
export interface DeviceQueryParam extends PageQuery {
  deviceName?: string;
  deviceType?: string;
  channelType?: string;
  channelName?: string;
}

/**
 * 实体分页列表项
 */
export interface DeviceItem extends Entity {
  deviceName: string;
  deviceType: string;
  channelName: string;
  channelType: string;
  deviceParam?: object;
  deviceParamJson?: string;
  commFailedCount?: number;
  commFailedTime?: number;
  commSuccessTime?: number;
  createTime?: number;
  updateTime?: number;
}

/**
 * 实体分页项类型
 */
export type DevicePageResult = PageResult<DeviceItem[]>;

/**
 * 实体表单类型：代表一个用于增删改查的临时对象
 */
export interface DeviceFormData extends DeviceItem {
  // 表单状态
  sort: number;
  status: number;
}

/**
 * 创建实体请求VO
 */
export interface CreateDeviceRequestVO {
  id?: number;
  deviceType: string;
  channelName: string;
  channelType: string;
  deviceName: string;
  deviceParam?: object;
  deviceParamJson?: string;
  commFailedCount?: number;
  commFailedTime?: number;
  commSuccessTime?: number;
}

