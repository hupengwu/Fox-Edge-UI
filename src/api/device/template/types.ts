/**
 * 实体查询参数类型
 */
export interface DeviceTemplateQueryParam extends PageQuery {
  fileName?: string;
  load?: boolean;
}

/**
 * 实体分页列表项
 */
export interface DeviceTemplateItem extends Entity {
  modelName: string;
  version: string;
  component: string;
  fileNames?: string[];
  fileName?: string;
  createTime?: number;
  updateTime?: number;
}


/**
 * 实体列表类型
 */
export type DeviceTemplateListResult = DeviceTemplateItem[];

/**
 * 实体分页项类型
 */
export type DeviceTemplatePageResult = PageResult<DeviceTemplateItem[]>;

/**
 * 实体表单类型：代表一个用于增删改查的临时对象
 */
export interface DeviceTemplateFormData extends DeviceTemplateItem {
  // 表单状态
  sort: number;
  status: number;
}

/**
 * 创建实体请求VO
 */
export interface CreateDeviceTemplateRequestVO {
  modelName?: string;
  fileName?: string;
  version?: string;
  pathName?: string;
  component?: string;
  list?: object;
}

