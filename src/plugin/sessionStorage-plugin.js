// 设置数据
export function setItem(key, data) {
  let stringData = JSON.stringify(data)
  sessionStorage.setItem(key, stringData)
}
// 获取数据
export function getItem(key) {
  let jsonData = JSON.parse(sessionStorage.getItem(key))
  return jsonData
}
