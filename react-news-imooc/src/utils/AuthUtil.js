export const isLogin = () => {
  const token = sessionStorage.getItem('token');
  return !!token;
};
