/**
 * 实体查询参数类型
 */
export interface ConsoleQueryParam extends PageQuery {
  serviceType?: string;
  serviceName?: string;
  level?: string;
  createTime?: number;
}

/**
 * 实体分页列表项
 */
export interface ConsoleItem extends Entity {
  serviceType: string;
  serviceName: string;
  level: string;
  createTime: number;
  value: string;
  shortValue?: string;
}

/**
 * 实体列表类型
 */
export type ConsoleListResult = ConsoleItem[];

/**
 * 实体分页项类型
 */
export type ConsolePageResult = PageResult<ConsoleItem[]>;

/**
 * 实体表单类型：代表一个用于增删改查的临时对象
 */
export interface ConsoleFormData extends ConsoleItem {
  // 表单状态
  sort: number;
  status: number;
}

/**
 * 创建实体请求VO
 */
export interface CreateConsoleRequestVO {
  serviceType?: string;
  serviceName?: string;
  level?: string;
  createTime?: number;
  value?: string;
}

