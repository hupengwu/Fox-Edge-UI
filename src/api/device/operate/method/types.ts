/**
 * 实体查询参数类型
 */
export interface DeviceOperateQueryParam extends PageQuery {
  deviceType?: string;
  operateName?: string;
  operateMode?: string;
  manufacturer?: string;
  dataType?: string;
  polling?: boolean;
  timeout?: number;
}

/**
 * 实体分页列表项
 */
export interface DeviceOperateItem extends Entity {
  deviceType: string;
  operateName: string;
  operateMode: string;
  manufacturer: string;
  dataType: string;
  polling: boolean;
  timeout: number;
  createTime?: number;
  updateTime?: number;
}

/**
 * 实体列表类型
 */
export type DeviceOperateListResult = DeviceOperateItem[];

/**
 * 实体分页项类型
 */
export type DeviceOperatePageResult = PageResult<DeviceOperateItem[]>;

/**
 * 实体表单类型：代表一个用于增删改查的临时对象
 */
export interface DeviceOperateFormData extends DeviceOperateItem {
  // 表单状态
  sort: number;
  status: number;
}

/**
 * 创建实体请求VO
 */
export interface CreateDeviceOperateRequestVO {
  id?: number;
  deviceType: string;
  operateName: string;
  operateMode: string;
  manufacturer: string;
  dataType: string;
  polling: boolean;
  pollingTxt: string;
  timeout: number;
}

