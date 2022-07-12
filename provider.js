// 别忘了加async
async function scheduleHtmlProvider() {
    async function getData(url = '') {
        const response = await fetch(url, {
            method: 'GET',
            credentials: 'same-origin',
            headers: {
                'Content-Type': 'application/json'
            },
        })
        return response.json()
    }
    await loadTool('AIScheduleTools')
    await AIScheduleAlert("来自eucaly的适配")
    const baseUrl = 'https://my.vpn.ccibe.edu.cn/api/manager/synchronize/synchronizestudent/curriculumNew'
    var res = await getData(baseUrl)
    var calendarId = res['data']['calendar']['id']
    var allWeek = res['data']['calendar']['allWeek']
    var kbList = []
    // 循环所有周
    var arr3 = new Array()
    var i = 0
    while (i <= allWeek) {
        arr3.push(i)
        i++
    }
    let asyncFuns = []
    arr3.forEach((i) => {
        var week = i + 1
        var url = baseUrl + '?calendarId=' + calendarId + '&week=' + week
        asyncFuns.push(getData(url).then(res => {
            kbList.push(res['data'])
        }))
    })
    await Promise.all(asyncFuns).then(() => {
        console.log(kbList)
    })
    return JSON.stringify(kbList)
}
