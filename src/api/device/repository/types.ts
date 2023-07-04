/**
 * 实体查询参数类型
 */
export interface RepositoryQueryParam extends PageQuery {
  source?: string;
  modelType?: string;
  modelName?: string;
  component?: string;
  status?: number;
  load?: boolean;
}

/**
 * 子版本
 */
export interface RepositoryVerItem {
  version?: string;
  stage?: string;
  component?: string;
  pathName?: string;
  description?: string;
  modelType?: string;
  modelName?: string;
  fileSize?: number;
  createTime?: number;
  updateTime?: number;
}

/**
 * 实体分页列表项
 */
export interface RepositoryItem extends Entity {
  modelType: string;
  modelName: string;
  fileName: string;
  version: string;
  pathName: string;
  dependence: string[];
  dependenceText?: string;
  versions?: RepositoryVerItem[];
  status: string;
  createTime?: number;
  updateTime?: number;
  lastVersion?: RepositoryVerItem;
}

/**
 * 实体分页项类型
 */
export type RepositoryPageResult = PageResult<RepositoryItem[]>;

/**
 * 创建实体请求VO
 */
export interface CreateRepositoryRequestVO {
  modelType?: string;
  modelName?: string;
  fileName?: string;
  version?: string;
  stage?: string;
  pathName?: string;
  component?: string;
  list?: object;
  lastVersion?: RepositoryVerItem;
}

