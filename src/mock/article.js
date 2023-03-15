import { MockMethod } from 'vite-plugin-mock'
import Mock from 'mockjs';
// 搜索便签
export default [
    {
        url: '/article/getById',
        method: 'get',
        Response: (opt) => {
            console.log(opt)
            return {
                code: 200,
                message: 'success',
                data: {
                    id: '1',
                    title: '@string(5, 20)',
                    picture: '@image',
                    createUser: '@increment',
                    createUserName: '@cname',
                    articleCountDTO: {
                        level: '@natural(0,5)',
                        isFollow: '@boolean(0, 9 , true)'
                    },
                    createTime: '@date(yyyy-MM-dd)',
                    pv: '@natural(0, 100000)',
                    titleMap: 'image',
                    markdown: '@cparagraph(10, 1000)'
                }
            }
        }
    }
]
