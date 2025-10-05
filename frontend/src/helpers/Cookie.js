class Cookie {
  static get(cookieName) {
    const match = document.cookie.match(new RegExp('(^| )' + cookieName + '=([^;]+)'));
    return match ? decodeURIComponent(match[2]) : null;
  }
}

export default Cookie;
