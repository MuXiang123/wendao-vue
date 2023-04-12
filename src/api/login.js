import request from '@/utils/request'

//新获取用户登录token v2
export function fetchUserLoginToken(params) {
    return request({
        url: '/inside/app/user/login/V2',
        method: 'post',
        data: params,
        baseURL: '//a1.easemob.com'
    })
}
//新获取短信验证码
export function fetchUserLoginSmsCode(phoneNumber) {
    return request({
        url: `/inside/app/sms/send/${phoneNumber}`,
        method: 'post',
        baseURL: '//a1.easemob.com'
    })
}
