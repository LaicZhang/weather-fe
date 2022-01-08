const env = import.meta.env.MODE || 'development';
const EnvConfig = {
    development: {
        baseApi: '/',
        mockApi: 'https://www.fastmock.site/mock/47e14f20fa22e4e2f62621aca6bd9d01/api',
    },
    production: {
        baseApi: '/',
        mockApi: '/',
    },
    test: {
        baseApi: '/',
        mockApi: '/',
    }
};

export default{
    env: 'development',
    mock: true,
    ...EnvConfig[env]
}