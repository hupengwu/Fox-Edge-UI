/**
 * 实体查询参数类型
 */
export interface DeviceValueQueryParam extends PageQuery {
  deviceType?: string;
  deviceName?: string;
  objectName?: string;
  objectTime?: number;
}

/**
 * 实体分页列表项
 */
export interface DeviceValueItem extends Entity {
  deviceName: string;
  deviceType: string;
  objectName: string;
  objectValue: object;
  objectTime: number;
  createTime?: number;
  updateTime?: number;
}

/**
 * 实体列表类型
 */
export type DeviceValueListResult = DeviceValueItem[];

/**
 * 实体分页项类型
 */
export type DeviceValuePageResult = PageResult<DeviceValueItem[]>;

/**
 * 实体表单类型：代表一个用于增删改查的临时对象
 */
export interface DeviceValueFormData extends DeviceValueItem {
  // 表单状态
  sort: number;
  status: number;
}

/**
 * 创建实体请求VO
 */
export interface CreateDeviceValueRequestVO {
  id?: number;
  deviceName?: string;
  deviceType?: string;
  configType?: string;
  configParam?: object;
  objectNames?: object[];
}

