import {
  ChangelogDateGroupedDto,
  ChangelogItemDto,
} from '../changelogs/dtos/get-changelog.dto'

export function groupByDate(
  data: ChangelogItemDto[],
): ChangelogDateGroupedDto[] {
  const grouped = data.reduce(
    (acc: { [key: string]: ChangelogDateGroupedDto }, item) => {
      const date = new Date(item.date).toLocaleString('ko-KR', {
        timeZone: 'Asia/Seoul',
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
      })
      if (!acc[date]) {
        acc[date] = { date, changes: [] }
      }

      acc[date].changes.push(item)
      return acc
    },
    {},
  )
  return Object.values(grouped).sort((a, b) => {
    return new Date(b.date).getTime() - new Date(a.date).getTime()
  })
}
