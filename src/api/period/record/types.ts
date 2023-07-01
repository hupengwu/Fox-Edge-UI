/**
 * 实体查询参数类型
 */
export interface PeriodRecordQueryParam extends PageQuery {
  objectName?: string;
  taskName?: string;
  deviceName?: string;
  recordBatch?: string;
}

/**
 * 实体分页列表项
 */
export interface PeriodRecordItem extends Entity {
  objectName: string;
  objectValue: PeriodRecordValue;
  taskName: string;
  deviceType: string;
  recordBatch: string;
  createTime: number;
  updateTime: number;
}

/**
 * 实体分页列表项
 */
export interface PeriodRecordValue extends Entity {
  time: number;
  value: string;
}

/**
 * 实体列表类型
 */
export type PeriodRecordListResult = PeriodRecordItem[];

/**
 * 实体分页项类型
 */
export type PeriodRecordPageResult = PageResult<PeriodRecordItem[]>;

/**
 * 实体表单类型：代表一个用于增删改查的临时对象
 */
export interface PeriodRecordFormData extends PeriodRecordItem {
  // 表单状态
  sort: number;
  status: number;
}

