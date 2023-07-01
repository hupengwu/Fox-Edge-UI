/**
 * 实体查询参数类型
 */
export interface OperateMonitorTaskQueryParam extends PageQuery {
  templateName?: string;
  deviceType?: string;
}

/**
 * 实体分页列表项
 */
export interface OperateMonitorTaskItem extends Entity {
  templateName?: string;
  deviceType?: string;
  templateParam?: object;
  templateParamJson?: string;
  countDeviceType?: number;
  countDeviceBind?: number;
  deviceIds?: object;
  deviceIdsJson?: string;
  createTime?: number;
  updateTime?: number;
}

/**
 * 实体列表类型
 */
export type OperateMonitorTaskListResult = OperateMonitorTaskItem[];

/**
 * 实体分页项类型
 */
export type OperateMonitorTaskPageResult = PageResult<OperateMonitorTaskItem[]>;

/**
 * 实体表单类型：代表一个用于增删改查的临时对象
 */
export interface OperateMonitorTaskFormData extends OperateMonitorTaskItem {
  // 表单状态
  sort: number;
  status: number;
}

/**
 * 创建实体请求VO
 */
export interface CreateOperateMonitorTaskRequestVO {
  id?: number;
  templateName?: string;
  deviceType?: string;
  templateParam?: object;
  templateParamJson?: string;
  deviceIds?: object;
  deviceIdsJson?: string;
}

