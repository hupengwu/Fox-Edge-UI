import request from '@/utils/request';
import {AxiosPromise} from 'axios';
import {LoginData, TokenInfo, TokenResult, UserInfo, VerifyCode} from './types';

/**
 *
 * @param data {LoginForm}
 * @returns
 */
export function loginApi(data: LoginData): AxiosPromise<TokenResult> {
  return request({
    url: '/auth/login',
    method: 'get',
    params: data
  });
}

/**
 * 注销
 */
export function logoutApi() {
  return request({
    url: '/auth/logout',
    method: 'delete',
  });
}

/**
 * 获取图片验证码
 */
export function getCaptcha(): AxiosPromise<VerifyCode> {
  return request({
    url: '/captcha?t=' + new Date().getTime().toString(),
    method: 'get'
  });
}

/**
 * 获得token信息：它可以获得登录用户的loginId
 */
export function getTokenInfo(): AxiosPromise<TokenInfo> {
  return request({
    url: '/auth/tokenInfo',
    method: 'get'
  });
}

/**
 * 登录成功后获取用户信息（昵称、头像、权限集合和角色集合）
 */
export function getUserInfo(username: string): AxiosPromise<UserInfo> {
  return request({
    url: '/auth/userinfo',
    method: 'get',
    params: {username: username}
  });
}

/**
 * 获取路由列表
 */
export function listRoutes(username: string) {
  return request({
    url: '/auth/usermenu',
    method: 'get',
    params: {username: username}
  });
}
