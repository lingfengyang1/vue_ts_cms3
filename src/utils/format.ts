import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
dayjs.extend(utc)

function formatUTC(timeString: string, format: string = 'YYYY/MM/DD HH:mm:ss') {
  return dayjs.utc(timeString).utcOffset(8).format(format)
}

export { formatUTC }
