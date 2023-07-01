/**
 * 实体查询参数类型
 */
export interface ParamTemplateQueryParam extends PageQuery {
  templateType?: string;
  templateName?: string;
}

/**
 * 实体分页列表项
 */
export interface ParamTemplateItem extends Entity {
  templateType?: string;
  templateName?: string;
  templateParam?: object;
  templateParamJson?: string;
  createTime?: number;
  updateTime?: number;
}

/**
 * 实体列表类型
 */
export type ParamTemplateListResult = ParamTemplateItem[];

/**
 * 实体分页项类型
 */
export type ParamTemplatePageResult = PageResult<ParamTemplateItem[]>;

/**
 * 实体表单类型：代表一个用于增删改查的临时对象
 */
export interface ParamTemplateFormData extends ParamTemplateItem {
  // 表单状态
  sort: number;
  status: number;
}

/**
 * 创建实体请求VO
 */
export interface CreateParamTemplateRequestVO {
  id?: number;
  templateType?: string;
  templateName?: string;
  templateParam?: object;
  templateParamJson?: string;
}

