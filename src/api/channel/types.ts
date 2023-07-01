/**
 * 实体查询参数类型
 */
export interface ChannelQueryParam extends PageQuery {
  channelType?: string;
  channelName?: string;
  channelParam?: string;
}

/**
 * 实体分页列表项
 */
export interface ChannelItem extends Entity{
  channelName: string;
  channelType: string;
  channelParam: object;
  channelParamJson: string;
  createTime?: number;
  updateTime?: number;
}

/**
 * 实体列表类型
 */
export type ChannelListResult = ChannelItem[];

/**
 * 实体分页项类型
 */
export type ChannelPageResult = PageResult<ChannelItem[]>;

/**
 * 实体表单类型：代表一个用于增删改查的临时对象
 */
export interface ChannelFormData extends ChannelItem {
  // 表单状态
  sort: number;
  status: number;
}

/**
 * 创建实体请求VO
 */
export interface CreateChannelRequestVO {
  id?: number;
  channelName: string;
  channelType: string;
  channelParam: object;
}

