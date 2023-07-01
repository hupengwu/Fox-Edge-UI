import {defineStore} from 'pinia';

import {getToken, setToken, removeToken} from '@/utils/auth';
import {loginApi, logoutApi, getTokenInfo, getUserInfo} from '@/api/auth';
import {resetRouter} from '@/router';
import {store} from '@/store';
import {LoginData, TokenInfo, UserInfo} from '@/api/auth/types';
import {ref} from 'vue';


export const useUserStore = defineStore('user', () => {
  // state
  const token = ref<string>(getToken() || '');
  const username = ref<string>('');
  const nickname = ref<string>('');
  const avatar = ref<string>('');
  const roles = ref<Array<string>>([]); // 用户角色编码集合 → 判断路由权限
  const perms = ref<Array<string>>([]); // 用户权限编码集合 → 判断按钮权限

  // actions

  // 登录
  function login(loginData: LoginData) {
    return new Promise<void>((resolve, reject) => {
      loginApi(loginData)
        .then(response => {
          const {accessToken} = response.data;
          token.value = accessToken;
          setToken(accessToken);
          resolve();
        })
        .catch(error => {
          reject(error);
        });
    });
  }

  /**
   * 根据Token获得当前登录的用户，并保存在页面缓存当中
   */
  function getLoginId() {
    return new Promise<TokenInfo>((resolve, reject) => {
      getTokenInfo().then((response) => {
        const data = response.data;
        username.value = data.loginId;
        resolve(data);
      }).catch((error) => {
        reject(error);
      });
    });
  }

  // 获取信息(用户昵称、头像、角色集合、权限集合)
  function getInfo() {
    return new Promise<UserInfo>((resolve, reject) => {
      getUserInfo(username.value)
        .then(({data}) => {
          if (!data) {
            return reject('Verification failed, please Login again.');
          }
          if (!data.roles || data.roles.length <= 0) {
            reject('getUserInfo: roles must be a non-null array!');
          }
          nickname.value = data.nickname;
          avatar.value = 'src/assets/avatar/avatar.gif';
          roles.value = data.roles;
          perms.value = data.perms;
          resolve(data);
        })
        .catch(error => {
          reject(error);
        });
    });
  }


  // 注销
  function logout() {
    return new Promise<void>((resolve, reject) => {
      logoutApi()
        .then(() => {
          resetRouter();
          resetToken();
          resolve();
        })
        .catch(error => {
          reject(error);
        });
    });
  }

  // 重置
  function resetToken() {
    removeToken();
    token.value = '';
    nickname.value = '';
    avatar.value = '';
    roles.value = [];
    perms.value = [];
  }

  return {
    token,
    nickname,
    avatar,
    roles,
    perms,
    login,
    getLoginId,
    getInfo,
    logout,
    resetToken
  };
});

// 非setup
export function useUserStoreHook() {
  return useUserStore(store);
}
