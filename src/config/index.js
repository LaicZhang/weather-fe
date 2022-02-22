const env = import.meta.env.MODE || 'production';
const EnvConfig = {
    development: {
        baseApi: '/api',
        mockApi:'https://www.fastmock.site/mock/c1c302e8baed9894c48c17e4738c092e/api'
    },
    production: {
        baseApi: '/api',
        mockApi: '/',
    },
    test: {
        baseApi: '/',
        mockApi: '/',
    }
};

export default{
    namespace: 'weather',
    env:"development",
    mock: false,
    ...EnvConfig[env]
}