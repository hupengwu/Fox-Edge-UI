/**
 * 登录用户信息
 */
export interface UserInfo {
  nickname: string;
  avatar: string;
  roles: string[];
  perms: string[];
}

/**
 * 实体查询参数类型
 */
export interface UserQueryParam extends PageQuery {
  username?: string;
  password?: string;
  userType?: string;
  role?: string;
  permission?: string;
  menu?: string;
}

/**
 * 实体分页列表项
 */
export interface UserItem extends Entity {
  username: string;
  password: string;
  userType: string;
  avatar: string;
  role: string;
  permission: string;
  menu: string;
  createTime?: number;
  updateTime?: number;
}

/**
 * 实体分页项类型
 */
export type UserPageResult = PageResult<UserItem[]>;

/**
 * 实体表单类型：代表一个用于增删改查的临时对象
 */
export interface UserFormData extends UserItem {
  // 表单状态
  sort: number;
  status: number;
}

/**
 * 创建实体请求VO
 */
export interface CreateUserRequestVO {
  id?: number;
  username: string;
  password: string;
  role: string;
  permission: string;
  menu: string;
}

/**
 * 创建实体请求VO
 */
export interface UpdatePasswordRequestVO {
  username: string;
  oldPassword: string;
  newPassword: string;
  newPasswordAgain?: string;
}
