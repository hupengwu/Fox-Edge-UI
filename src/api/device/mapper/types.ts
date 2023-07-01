/**
 * 实体查询参数类型
 */
export interface DeviceMapperQueryParam extends PageQuery {
  deviceType?: string;
  objectName?: string;
  mapperName?: string;
  mapperMode?: number;
}

/**
 * 实体分页列表项
 */
export interface DeviceMapperItem extends Entity {
  deviceType: string;
  objectName: string;
  mapperName: string;
  mapperMode: number;
  createTime?: number;
  updateTime?: number;
}

/**
 * 实体列表类型
 */
export type DeviceMapperListResult = DeviceMapperItem[];

/**
 * 实体分页项类型
 */
export type DeviceMapperPageResult = PageResult<DeviceMapperItem[]>;

/**
 * 实体表单类型：代表一个用于增删改查的临时对象
 */
export interface DeviceMapperFormData extends DeviceMapperItem {
  // 表单状态
  sort: number;
  status: number;
}

/**
 * 创建实体请求VO
 */
export interface CreateDeviceMapperRequestVO {
  id?: number;
  deviceType?: string;
  objectName?: string;
  mapperName?: string;
  mapperMode?: string;
  disable?:boolean;
}

