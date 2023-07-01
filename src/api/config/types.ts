/**
 * 实体查询参数类型
 */
export interface ConfigQueryParam extends PageQuery {
  serviceName?: string;
  serviceType?: string;
  serviceId?: string;
  configName?: string;
  configValue?: string;
}

/**
 * 实体分页列表项
 */
export interface ConfigItem extends Entity{
  configName: string;
  serviceName: string;
  serviceType: string;
  remark: string;
  configValue: object;
  configValueJson: string;
  createTime?: number;
  updateTime?: number;
}

/**
 * 实体分页项类型
 */
export type ConfigPageResult = PageResult<ConfigItem[]>;

/**
 * 创建实体请求VO
 */
export interface CreateConfigRequestVO {
  id?: number;
  configName: string;
  serviceName: string;
  serviceType: string;
  remark: string;
  configValue: object;
}

