const COOKIE_NAME = 'laydin_meter_cookie';

export function isAuthenticated () {
  return _getCookie(COOKIE_NAME)
}

export function setLoginObj (info) {
  if(info)
  {
    _setCookie(COOKIE_NAME, JSON.stringify(info));
  }
  else{
    _setCookie(COOKIE_NAME, '');
  }
}

export function getLoginObj(){
  try{

    const str = _getCookie(COOKIE_NAME);
    if(str && str.length > 0)
    {
      return JSON.parse(str);
    }
  }
  catch(e)
  {
    return undefined;
  }
}

export function getToken(){
  const obj = getLoginObj();
  if(obj)
  {
    return obj.Mac;
  }
  return '';
}

function _getCookie (name) {
  let start, end;
  if (document.cookie.length > 0) {
    start = document.cookie.indexOf(name + '=')
    if (start !== -1) {
      start = start + name.length + 1
      end = document.cookie.indexOf(';', start)
      if (end === -1) {
        end = document.cookie.length
      }
      return unescape(document.cookie.substring(start, end))
    }
  }
  return ''
}

function _setCookie (name, value, expire) {
  let date = new Date()
  date.setDate(date.getDate() + expire)
  document.cookie = name + '=' + escape(value) + '; path=/' +
    (expire ? ';expires=' + date.toGMTString() : '')
}