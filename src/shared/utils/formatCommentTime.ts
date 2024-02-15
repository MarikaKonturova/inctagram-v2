export function formatCommentTime(postTime: string): string {
  const currentTime: Date = new Date()
  const timeDifference: number = currentTime.getTime() - new Date(postTime).getTime()

  function getTimeInterval(milliseconds: number, divisor: number, unit: string): string {
    return (
      Math.floor(milliseconds / divisor) +
      ' ' +
      unit +
      (Math.floor(milliseconds / divisor) === 1 ? '' : 's')
    )
  }

  if (timeDifference < 60 * 1000) {
    return 'less than a minute ago'
  } else if (timeDifference < 60 * 60 * 1000) {
    return getTimeInterval(timeDifference, 60 * 1000, 'minute') + ' ago'
  } else if (timeDifference < 24 * 60 * 60 * 1000) {
    return getTimeInterval(timeDifference, 60 * 60 * 1000, 'hour') + ' ago'
  } else if (timeDifference < 7 * 24 * 60 * 60 * 1000) {
    return getTimeInterval(timeDifference, 24 * 60 * 60 * 1000, 'day') + ' ago'
  } else if (timeDifference < 30 * 24 * 60 * 60 * 1000) {
    return getTimeInterval(timeDifference, 7 * 24 * 60 * 60 * 1000, 'week') + ' ago'
  } else if (timeDifference < 12 * 30 * 24 * 60 * 60 * 1000) {
    return getTimeInterval(timeDifference, 30 * 24 * 60 * 60 * 1000, 'month') + ' ago'
  } else {
    return getTimeInterval(timeDifference, 12 * 30 * 24 * 60 * 60 * 1000, 'year') + ' ago'
  }
}
