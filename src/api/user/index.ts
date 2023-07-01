import request from '@/utils/request';
import {AxiosPromise} from 'axios';
import {
  UserInfo,
  UserPageResult,
  UserQueryParam,
  UserFormData,
  CreateUserRequestVO,
  UpdatePasswordRequestVO
} from './types';

/**
 * 登录成功后获取用户信息（昵称、头像、权限集合和角色集合）
 */
export function getUserInfo(username: string): AxiosPromise<UserInfo> {
  return request({
    url: '/kernel/manager/user/userinfo',
    method: 'get',
    params: {username: username}
  });
}


/**
 * 获取实体分页列表
 *
 * @taskParam queryParams
 */
export function listUserEntityPages(queryParams: UserQueryParam): AxiosPromise<UserPageResult> {
  return request({
    url: '/kernel/manager/user/page',
    method: 'post',
    data: {
      username: queryParams.username,
      role: queryParams.role,
      permission: queryParams.permission,
      menu: queryParams.menu,
      pageNum: queryParams.pageNum,
      pageSize: queryParams.pageSize
    },
  });
}

/**
 * 登录成功后获取用户信息（昵称、头像、权限集合和角色集合）
 */
export function getUserEntity(username: string): AxiosPromise<UserFormData> {
  return request({
    url: '/kernel/manager/user/entity',
    method: 'get',
    params: {username: username}
  });
}

/**
 * 添加实体
 *
 * @taskParam data
 */
export function createUserEntity(data: CreateUserRequestVO) {
  return request({
    url: '/kernel/manager/user/entity',
    method: 'post',
    data: data,
  });
}

/**
 * 修改实体
 *
 * @taskParam data
 */
export function updateUserEntity(data: CreateUserRequestVO) {
  return request({
    url: '/kernel/manager/user/entity',
    method: 'put',
    data: data,
  });
}

/**
 * 修改实体
 *
 * @taskParam data
 */
export function updateUserPassword(data: UpdatePasswordRequestVO) {
  return request({
    url: '/kernel/manager/user/password',
    method: 'put',
    data: data,
  });
}

/**
 * 删除实体列表
 *
 * @taskParam ids
 */
export function deleteUserEntity(ids: string) {
  return request({
    url: '/kernel/manager/user/entities',
    method: 'delete',
    params: {ids: ids},
  });
}
