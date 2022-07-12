function scheduleHtmlParser(html) {
  var chnNumChar = {
    零: 0,
    一: 1,
    二: 2,
    三: 3,
    四: 4,
    五: 5,
    六: 6,
    七: 7,
    八: 8,
    九: 9
  }
  let result = []
  kbList = JSON.parse(html)
  kbList.forEach(week => {
    let calendar = week['calendar']
    week['wdkb'].forEach(course => {
      let re = { sections: [], weeks: [] }
      re.weeks.push(calendar['nowWeek'])
      re.day = chnNumChar[course.xqj]
      re.name = course.kcmc
      re.position = course.xqmc+''+course.jxdd
      re.teacher = ''
      rangeList = course.jc.split('-')
      if (rangeList.length == 1) {
        re.sections.push(rangeList[0])
      } else {
        for (let i = Number(rangeList[0]); i <= Number(rangeList[1]); i++) {
          re.sections.push(i)
        }
      }
      result.push(re)
    })
  })
  return result
}