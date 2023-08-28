/**
 * 根据身份证号获取年龄。
 * @param idCard 身份证号
 */
export function getAgeByIDCard(idCard?: string) {
  if (!idCard) return 0;
  const birthYear = idCard.substring(6, 10);
  const birthMonth = idCard.substring(10, 12);
  const birthDay = idCard.substring(12, 14);
  const d = new Date();
  const nowYear = d.getFullYear();
  const nowMonth = d.getMonth() + 1;
  const nowDay = d.getDate();
  let age = nowYear - Number(birthYear);
  if (
    nowMonth < Number(birthMonth) ||
    (nowMonth === Number(birthMonth) && nowDay < Number(birthDay))
  ) {
    age--;
  }
  return age;
}

/**
 * 根据身份证号获取性别。
 * @param idCard 身份证号
 * @returns
 */
export function getSexByIDCard(idCard?: string) {
  if (!idCard || idCard.length !== 18) return '';

  return Number(idCard.substring(16, 17)) % 2 === 0 ? '女' : '男';
}

/**
 * 根据身份证号获取生日。`1990-01-01`
 * @param idCard 身份证号
 */
export function getBirthdayByIDCard(idCard?: string) {
  if (!idCard || idCard.length !== 18) return '';

  const birthYear = idCard.substring(6, 10);
  const birthMonth = idCard.substring(10, 12);
  const birthDay = idCard.substring(12, 14);
  return `${birthYear}-${birthMonth}-${birthDay}`;
}
