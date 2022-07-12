/**
 * 时间配置函数，此为入口函数，不要改动函数名
 */
async function scheduleTimer({
  providerRes,
  parserRes
} = {}) {
  async function getData(url = '') {
    const response = await fetch(url, {
      method: 'GET',
      mode: 'cors',
      cache: 'no-cache',
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json'
      },
      redirect: 'follow',
      referrerPolicy: 'no-referrer',
    })
    return response.json()
  }
  url = 'https://my.vpn.ccibe.edu.cn/api/manager/synchronize/synchronizeschedule/studentSchedule'
  let result = { sections: [] }
  result.totalWeek = JSON.parse(providerRes).length
  let date = new Date(JSON.parse(providerRes)[0]['calendar']['startTime'])
  result.startSemester = date.getTime().toString(),
    result.startWithSunday = false, // 是否是周日为起始日，该选项为true时，会开启显示周末选项
    result.showWeekend = true, // 是否显示周末
    result.forenoon = 4, // 上午课程节数
    result.afternoon = 4, // 下午课程节数
    result.night = 4, // 晚间课程节数
    await getData(url).then(res => {
      let sectionList = [4, 5, 6, 7, 9, 10, 11, 12, 14, 15, 16, 17]
      for (let i = 1; i <= 12; i++) {
        let section = {}
        section.section = i
        timeRange = res['data'][sectionList[i - 1]]['timeStr'].split('-')
        section.startTime = timeRange[0]
        section.endTime = timeRange[1]
        result.sections.push(section)
      }
    })
  return result
}