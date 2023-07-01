/**
 * 实体查询参数类型
 */
export interface DeviceDecoderQueryParam extends PageQuery {
  fileName?: string;
  load?: boolean;
}

/**
 * 实体分页列表项
 */
export interface DeviceDecoderItem extends Entity {
  fileName: string;
  load: boolean;
  conflictFileName?: string[];
  conflictStatus?: boolean;
  createTime?: number;
  updateTime?: number;
}

/**
 * 实体列表类型
 */
export type DeviceDecoderListResult = DeviceDecoderItem[];

/**
 * 实体分页项类型
 */
export type DeviceDecoderPageResult = PageResult<DeviceDecoderItem[]>;

/**
 * 实体表单类型：代表一个用于增删改查的临时对象
 */
export interface DeviceDecoderFormData extends DeviceDecoderItem {
  // 表单状态
  sort: number;
  status: number;
}

/**
 * 创建实体请求VO
 */
export interface CreateDeviceDecoderRequestVO {
  fileName: string;
  load: boolean;
}

