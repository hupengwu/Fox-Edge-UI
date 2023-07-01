/**
 * 实体分页列表项
 */
export interface ProcessStatusItem extends Entity {
  rss: string;
  pathName: string;
  men?: string;
  cpu?: string;
  pid?: string;
  command?: string;
  user?: string;
  vsz?: string;
  fileName?: string;
  appShell?: string;
  appName?: string;
  appLoad?: boolean;
  appType?: string;
  appPort?: number;
  time?: string;
  stime?: string;
}

/**
 * 实体列表类型
 */
export type ProcessStatusListResult = ProcessStatusItem[];

/**
 * 实体分页项类型
 */
export type ProcessStatusPageResult = PageResult<ProcessStatusItem[]>;

/**
 * 实体表单类型：代表一个用于增删改查的临时对象
 */
export interface ProcessStatusFormData extends ProcessStatusItem {
  // 表单状态
  sort: number;
  status: number;
}

