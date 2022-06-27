import { Base64 } from 'js-base64'
import axios from 'axios'

axios.defaults.timeout = 12000
let path = 'http://10.6.51.133'
// let path = "http://eip.sltung.com.tw";
var gows = {
  callWS: async function (tag, param) {
    let wsParam = new FormData()
    wsParam.append('var', Base64.encode(JSON.stringify(param)))
    // console.log("base64", Base64.encode(JSON.stringify(param)));
    return new Promise((resolve, reject) => {
      axios.post(path + '/EIP/gows.php?wtag=' + tag, wsParam)
        .then(
          result => {
            // http://eip.sltung.com.tw/
            // 10.6.51.133
            let rt = JSON.parse(Base64.decode(result.data))
            try {
              console.log(rt)
              resolve(rt)
            } catch (e) {
              console.log(e)
            }
          }
        )
        .catch(err => {
          reject(err)
        })
      // err => {
      //     reject(err);
      // }
    })
  },
  callWSOffical: async function (tag, param) {
    let wsParam = new FormData()
    wsParam.append('var', Base64.encode(JSON.stringify(param)))
    return new Promise((resolve, reject) => {
      axios.post('https://dmzeip443.sltung.com.tw/EIP/gows.php?wtag=' + tag, wsParam)
        .then(
          result => {
            // http://eip.sltung.com.tw/
            // 10.6.51.133
            let rt = JSON.parse(Base64.decode(result.data))
            try {
              resolve(rt)
            } catch (e) {
              console.log(e)
            }
          }),
      err => {
        reject(err)
      }
    })
  },
  callWSWithFile: async function (tag, param, fileParam) {
    let wsParam = new FormData()
    wsParam.append('var', Base64.encode(JSON.stringify(param)))
    wsParam.append('file', fileParam, fileParam.name)
    return new Promise((resolve, reject) => {
      axios.post(path + '/EIP/gows.php?wtag=' + tag, wsParam)
        .then(
          result => {
            let rt = JSON.parse(Base64.decode(result.data))
            try {
              resolve(rt)
            } catch (e) {
              console.log(e)
            }
          }
        )
        .catch(err => {
          reject(err)
        })
    })
  }
}
export default gows = gows
