// jest.config.js
export const testEnvironment = 'jsdom';
export const transform = {
    '^.+\\.(js|jsx|ts|tsx)$': 'babel-jest',
};
export const setupFilesAfterEnv = ['<rootDir>/jest.setup.js'];
export const moduleNameMapper = {
    '\\.(css|scss|sass)$': 'identity-obj-proxy',
};
