import { useTranslation } from 'next-i18next'

export function formatCommentTime(postTime: string): string {
  const currentTime: Date = new Date()
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { t } = useTranslation('post')
  const timeDifference: number = currentTime.getTime() - new Date(postTime).getTime()

  function getTimeInterval(milliseconds: number, divisor: number, unit: string): string {
    return (
      Math.floor(milliseconds / divisor) +
      ' ' +
      unit +
      (Math.floor(milliseconds / divisor) === 1 ? '' : t('ending'))
    )
  }

  if (timeDifference < 60 * 1000) {
    return t('lessThanAMinuteAgo')
  } else if (timeDifference < 60 * 60 * 1000) {
    return getTimeInterval(timeDifference, 60 * 1000, t('minute')) + t('ago')
  } else if (timeDifference < 24 * 60 * 60 * 1000) {
    return getTimeInterval(timeDifference, 60 * 60 * 1000, t('hour')) + t('ago')
  } else if (timeDifference < 7 * 24 * 60 * 60 * 1000) {
    return getTimeInterval(timeDifference, 24 * 60 * 60 * 1000, t('day')) + t('ago')
  } else if (timeDifference < 30 * 24 * 60 * 60 * 1000) {
    return getTimeInterval(timeDifference, 7 * 24 * 60 * 60 * 1000, t('week')) + t('ago')
  } else if (timeDifference < 12 * 30 * 24 * 60 * 60 * 1000) {
    return getTimeInterval(timeDifference, 30 * 24 * 60 * 60 * 1000, t('month')) + t('ago')
  } else {
    return getTimeInterval(timeDifference, 12 * 30 * 24 * 60 * 60 * 1000, t('year')) + t('ago')
  }
}
