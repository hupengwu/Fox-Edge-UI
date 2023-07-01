/**
 * 实体查询参数类型
 */
export interface OperateRecordQueryParam extends PageQuery {
  deviceName?: string;
  deviceType?: string;
  recordName?: string;
  clientModel?: string;
  operateUuid?: string;
}

/**
 * 实体分页列表项
 */
export interface OperateRecordItem extends Entity {
  deviceName?: string;
  deviceType?: string;
  recordName?: string;
  clientModel?: string;
  operateUuid?: string;
  recordParam?: object;
  recordParamJson?: string;
  recordData?: object;
  recordDataJson?: string;
  createTime?: number;
  updateTime?: number;
}

/**
 * 实体列表类型
 */
export type OperateRecordListResult = OperateRecordItem[];

/**
 * 实体分页项类型
 */
export type OperateRecordPageResult = PageResult<OperateRecordItem[]>;

/**
 * 实体表单类型：代表一个用于增删改查的临时对象
 */
export interface OperateRecordFormData extends OperateRecordItem {
  // 表单状态
  sort: number;
  status: number;
}

/**
 * 创建实体请求VO
 */
export interface CreateOperateRecordRequestVO {
  id?: number;
  deviceName?: string;
  deviceType?: string;
  recordName?: string;
  clientModel?: string;
  operateUuid?: string;
  recordParam?: object;
  recordParamJson?: string;
  recordData?: object;
  recordDataJson?: string;
}

