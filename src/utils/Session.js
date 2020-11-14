const LOGIN_SESSION = 'laydin_meter_session';
const { sessionStorage } = window;

export function isAuthenticated() {
  return getLoginVertificate();
}

export function getToken() {
  const obj = getLoginVertificate();
  if (obj) {
    return obj.Mac;
  }
  return '';
}

export function getProduct() {
  const obj = getLoginVertificate();
  if (obj) {
    return obj.Devtp;
  }
  return 0;
}

/**
 * 获取登录凭证
 */
export function getLoginVertificate() {
  let str = sessionStorage.getItem(LOGIN_SESSION);
  if (!str || str.length === 0) {
    return false;
  }
  try {
    return JSON.parse(str);
  }
  catch (e) {
    return false;
  }
}

/**
 * 设置登录凭证
 * @param {*} obj 
 */
export function setLoginVertificate(obj) {
  sessionStorage.setItem(LOGIN_SESSION, JSON.stringify(obj))
}

/**
 * 登出
 */
export function logout() {
  sessionStorage.setItem(LOGIN_SESSION, '');
}
