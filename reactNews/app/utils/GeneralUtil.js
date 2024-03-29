import guid from 'rc-util/es/guid';

export const generateUuid = (sign = '') => {
  return sign ? sign + '_' + guid() : guid();
};

export const sessionUuid = () => {
  /**
   * http://www.ietf.org/rfc/rfc4122.txt
   */
  const s = [];
  const hexDigits = '0123456789abcdef';
  for (let i = 0; i < 32; i++) {
    s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
  }
  s[12] = '4';  // bits 12-15 of the time_hi_and_version field to 0010
  s[16] = hexDigits.substr((s[16] & 0x3) | 0x8, 1);  // bits 6-7 of the clock_seq_hi_and_reserved to 01

  return s.join('');
};