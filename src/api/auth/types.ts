/**
 * 登录数据类型
 */
export interface LoginData {
  username: string;
  password: string;
  /**
   * 验证码Code
   */
  //verifyCode: string;
  /**
   * 验证码Code服务端缓存key(UUID)
   */
  // verifyCodeKey: string;
}

/**
 * Token响应类型
 */
export interface TokenResult {
  accessToken: string;
  refreshToken: string;
  expires: number;
}

/**
 * 验证码类型
 */
export interface VerifyCode {
  verifyCodeImg: string;
  verifyCodeKey: string;
}

/**
 * 登录后的token信息
 */
export interface TokenInfo {
  tokenName: string;
  tokenValue: string;
  loginId: string;
  loginType: string;
  isLogin: boolean;
}

/**
 * 登录用户信息
 */
export interface UserInfo {
  nickname: string;
  avatar: string;
  roles: string[];
  perms: string[];
}
