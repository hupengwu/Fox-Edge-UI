/**
 * 实体查询参数类型
 */
export interface DeviceRecordQueryParam extends PageQuery {
  deviceName?: string;
  deviceType?: string;
  recordName?: string;
}

/**
 * 实体分页列表项
 */
export interface DeviceRecordItem extends Entity {
  deviceName: string;
  deviceType: string;
  recordName: string;
  recordData: object;
  recordDataJson: string;
  createTime?: number;
  updateTime?: number;
}

/**
 * 实体列表类型
 */
export type DeviceRecordListResult = DeviceRecordItem[];

/**
 * 实体分页项类型
 */
export type DeviceRecordPageResult = PageResult<DeviceRecordItem[]>;

/**
 * 实体表单类型：代表一个用于增删改查的临时对象
 */
export interface DeviceRecordFormData extends DeviceRecordItem {
  // 表单状态
  sort: number;
  status: number;
}

/**
 * 创建实体请求VO
 */
export interface CreateDeviceRecordRequestVO {
  id?: number;
  deviceName: string;
  deviceType: string;
  recordName: string;
  recordData: object;
  recordDataJson: string;
}

