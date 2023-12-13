import { describe, expect, test } from 'bun:test';
import { getBirthdayByIDCard } from './IDCardUtil.ts';

describe('getBirthdayByIDCard', () => {
    test('should return empty string if idCard is not provided', () => {
        expect(getBirthdayByIDCard()).toBe('');
    });

    test('should return empty string if idCard length is not 18', () => {
        expect(getBirthdayByIDCard('1234567890')).toBe('');
    });

    test('should return the correct birthday for a valid idCard', () => {
        expect(getBirthdayByIDCard('110101199001011234')).toBe('1990-01-01');
    });
});


import { getSexByIDCard } from './IDCardUtil.ts';

describe('getSexByIDCard', () => {
    test('should return empty string if idCard is not provided', () => {
        expect(getSexByIDCard()).toBe('');
    });

    test('should return empty string if idCard length is not 18', () => {
        expect(getSexByIDCard('1234567890')).toBe('');
    });

    test('should return "男" for a valid idCard with odd number', () => {
        expect(getSexByIDCard('110101199001011234')).toBe('男');
    });

    test('should return "女" for a valid idCard with even number', () => {
        expect(getSexByIDCard('110101199001011225')).toBe('女');
    });
});

import { getAgeByDate } from './IDCardUtil.ts';

describe('getAgeByDate', () => {
    test('should return the correct age for a valid startDate and endDate', () => {
        expect(getAgeByDate('1990-01-01', '2022-01-01')).toBe(32);
        expect(getAgeByDate('1990-01-01', '2023-01-01')).toBe(33);
    });

    test('should handle leap years correctly', () => {
        expect(getAgeByDate('1992-02-29', '2022-02-28')).toBe(29);
        expect(getAgeByDate('1992-02-29', '2022-03-01')).toBe(30);
    });
});


import { getAgeByIDCard } from './IDCardUtil.ts';

describe('getAgeByIDCard', () => {
    test('should return 0 if idCard is not provided', () => {
        expect(getAgeByIDCard()).toBe(0);
    });

    test('should return the correct age for a valid idCard', () => {
        const currentYear = new Date().getFullYear();
        const ageToTest = 25; // 测试 25 岁的情况
        const birthYear = currentYear - ageToTest;
        const testID = `110101${birthYear}01011234`; // 构造测试用的身份证号
        expect(getAgeByIDCard(testID)).toBe(ageToTest);
    });
});
