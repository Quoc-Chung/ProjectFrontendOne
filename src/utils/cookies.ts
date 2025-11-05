// Utility functions for cookie management
export const setCookie = (name: string, value: string, days: number = 7) => {
  if (typeof window !== 'undefined') {
    const expires = new Date();
    expires.setTime(expires.getTime() + (days * 24 * 60 * 60 * 1000));
    // Encode value để đảm bảo JSON và special characters được handle đúng
    const encodedValue = encodeURIComponent(value);
    // Sử dụng SameSite=Lax là tốt nhất cho same-site requests
    const cookieString = `${name}=${encodedValue};expires=${expires.toUTCString()};path=/;SameSite=Lax`;
    document.cookie = cookieString;
    console.log('Cookie set:', name, 'length:', value.length);
    
    // Verify cookie was set
    setTimeout(() => {
      const verify = getCookie(name);
      if (verify) {
        console.log('Cookie verified:', name, 'exists');
      } else {
        console.warn('Cookie verification failed:', name, 'not found');
      }
    }, 50);
  }
};

export const getCookie = (name: string): string | null => {
  if (typeof window !== 'undefined') {
    const nameEQ = name + "=";
    const ca = document.cookie.split(';');
    for (let i = 0; i < ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) === ' ') c = c.substring(1, c.length);
      if (c.indexOf(nameEQ) === 0) {
        const value = c.substring(nameEQ.length, c.length);
        // Decode value nếu đã được encode
        try {
          return decodeURIComponent(value);
        } catch {
          return value;
        }
      }
    }
  }
  return null;
};

export const deleteCookie = (name: string) => {
  if (typeof window !== 'undefined') {
    document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/;`;
  }
};

// Hàm khôi phục user state từ token trong cookie
export const getUserFromToken = () => {
  if (typeof window === 'undefined') return null;
  
  try {
    const token = getCookie('token');
    if (!token) return null;

    // Decode JWT token để lấy thông tin user
    const parts = token.split('.');
    if (parts.length !== 3) return null;

    const payload = JSON.parse(atob(parts[1]));
    
    return {
      token,
      user: payload,
      roleNames: payload.roleNames || [],
      isLogin: true
    };
  } catch (error) {
    console.error('Error parsing token:', error);
    return null;
  }
};
