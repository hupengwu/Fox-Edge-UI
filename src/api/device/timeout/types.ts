/**
 * 实体查询参数类型
 */
export interface DeviceTimeOutQueryParam extends PageQuery {
  deviceType?: string;
  deviceName?: string;
  commFailedCount?: number;
  commFailedTime?: number;
  commSuccessTime?: number;
}

/**
 * 实体分页列表项
 */
export interface DeviceTimeOutItem extends Entity {
  deviceName: string;
  deviceType: string;
  commFailedCount: number;
  commFailedTime: number;
  commSuccessTime: number;
  request: object;
  requestJson: string;
  createTime?: number;
  updateTime?: number;
}

/**
 * 实体列表类型
 */
export type DeviceTimeOutListResult = DeviceTimeOutItem[];

/**
 * 实体分页项类型
 */
export type DeviceTimeOutPageResult = PageResult<DeviceTimeOutItem[]>;

/**
 * 实体表单类型：代表一个用于增删改查的临时对象
 */
export interface DeviceTimeOutFormData extends DeviceTimeOutItem {
  // 表单状态
  sort: number;
  status: number;
}

/**
 * 创建实体请求VO
 */
export interface CreateDeviceTimeOutRequestVO {
  id?: number;
  deviceName: string;
  deviceType: string;
  commFailedCount: number;
  commFailedTime: number;
  commSuccessTime: number;
}

