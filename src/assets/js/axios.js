import axios from 'axios'
import { Base64 } from 'js-base64'

// const url = "./api"

//import Paginate from 'vuejs-paginate'
// const protocol = location.protocol;
// const slashes = protocol.concat("//");
// const host = slashes.concat(window.location.hostname);
const url = "http://eip.sltung.com.tw/EIP/gows.php"

axios.defaults.timeout = 5000
axios.defaults.baseURL = "./api"
axios.defaults.headers.post["Content-Type"] = "multipart/form-data"

console.log(axios.defaults)

axios.interceptors.response.use(
    response => {
        return response
    },
    err => {
        if (err && err.response) {
        switch (err.response.status) {
            case 401:
                console.log("token失效");
                break;
            case 404:
                console.log("找不到該頁面");
                alert("找不到該頁面")
                break;
            case 500:
                console.log("伺服器出錯");
                alert("伺服器出錯")
                break;
            case 503:
                console.log("服務失效");
                alert("服務失效")
                break;
            default:
                console.log(`連接錯誤${err.response.status}`);
                alert(`連接錯誤${err.response.status}`);
        }
        }
    }
)

export function post(tag, param = {}, flag = true) {
    let conf = {
        params: {
            wtag: tag
        }
    }
    let formdata = new FormData()
    formdata.append('var', Base64.encode(JSON.stringify(param)))
    return new Promise((resolve, reject) => {
        axios.post(url, formdata, conf).then(
            response => {
                //console.log(response)
                let res = JSON.parse(Base64.decode(response.data));
                if (flag)
                {
                    if (res.sts == '000000')
                    {
                        resolve(res.val)
                    }
                }
                else
                {
                    resolve(res)
                }
            },
            err => {
                reject(err);
            }
        );
    });
}

export const callGows = (tag, param, flag) => post(tag, param, flag)





