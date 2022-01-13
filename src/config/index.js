const env = import.meta.env.MODE || 'production';
const EnvConfig = {
    development: {
        baseApi: '/api',
        // mockApi: 'https://www.fastmock.site/mock/47e14f20fa22e4e2f62621aca6bd9d01/api',
        mockApi: 'https://www.fastmock.site/mock/70e8756abab0dce464dde39c0e304042/api'
        // baseUrl: '/api',
        // mockUrl: 'https://www.fastmock.site/mock/70e8756abab0dce464dde39c0e304042/api',
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
    namespace: 'weather',
    env: 'development',
    mock: true,
    ...EnvConfig[env]
}