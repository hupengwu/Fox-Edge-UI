/**
 * 实体查询参数类型
 */
export interface PeriodTaskQueryParam extends PageQuery {
  taskName?: string;
  deviceType?: string;
}

/**
 * 实体分页列表项
 */
export interface PeriodTaskItem extends Entity {
  taskName?: string;
  deviceType?: string;
  taskParam?: object;
  taskParamJson?: string;
  countDeviceType?: number;
  countDeviceBind?: number;
  countObjectBind?: number;
  selectDevice?: boolean;
  deviceIds?: object;
  deviceIdsJson?: string;
  objectIds?: object;
  objectIdsJson?: string;
  createTime?: number;
  updateTime?: number;
}

/**
 * 简单对象
 */
export interface ObjectItem {
  objectId?: string;
}

/**
 * 实体列表类型
 */
export type PeriodTaskListResult = PeriodTaskItem[];

/**
 * 实体分页项类型
 */
export type PeriodTaskPageResult = PageResult<PeriodTaskItem[]>;

/**
 * 实体表单类型：代表一个用于增删改查的临时对象
 */
export interface PeriodTaskFormData extends PeriodTaskItem {
  // 表单状态
  sort: number;
  status: number;
}

/**
 * 创建实体请求VO
 */
export interface CreatePeriodTaskRequestVO {
  id?: number;
  taskName?: string;
  deviceType?: string;
  taskParam?: object;
  taskParamJson?: string;
  selectDevice?: boolean;
  deviceIds?: object;
  deviceIdsJson?: string;
  objectIds?: object;
  objectIdsJson?: string;
}


