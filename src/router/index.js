import { createRouter, createWebHashHistory } from 'vue-router'
import ProjectList from '../components/ProjectList.vue'
import axios from 'axios'

const clientId =
  '6741371790a54679ed76dccb94b1a49bd8817c5b2db12a6603080612b4315c65'
const clientSecret =
  '3f147403036c399d1973eb9ab3044095be1481f22684a0dfd42f2f8522d5746b'
const routes = [
  {
    path: '/',
    name: 'ProjectList',
    component: ProjectList,
    beforeEnter: (to, from) => {
      return true
      /*
      if (to.query.token) {
        return true
      } else {
        const obj = {}
        const reg = /([^?&=]+)=([^?&=]+)/g
        let res = reg.exec(window.location.search)
        while (res) {
          // eslint-disable-next-line prefer-destructuring
          obj[res[1]] = res[2]
          res = reg.exec(window.location.search)
        }
        if (!obj.code) {
          window.location.href =
            'https://gitee.com/oauth/authorize?client_id=' +
            `${clientId}` +
            `&redirect_uri=${window.location.origin}${window.location.pathname}&response_type=code`
          return false
        } else {
          axios
            .post(
              'https://gitee.com/oauth/token?grant_type=authorization_code' +
                `&code=${obj.code}&` +
                `client_id=${clientId}&` +
                `redirect_uri=${window.location.origin}${window.location.pathname}&` +
                `client_secret=${clientSecret}`
            )
            .then((response) => {
              console.log(response)
              next({
                path: '/',
                query: {
                  token: response.data.access_token,
                },
              })
            })
        }
      }
      */
    },
  },
]
const router = createRouter({
  history: createWebHashHistory(),
  routes,
})

export default router
