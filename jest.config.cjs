module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'jsdom',
    testEnvironmentOptions: {
        url: 'http://localhost:8080',
    },
    moduleNameMapper: {
        '\\.(css)$': '<rootDir>/node_modules/identity-obj-proxy',
    },
}
