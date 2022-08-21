export const API_URL = 'http://195.15.218.172'

export const getISOStringWithoutSecsAndMillisecs = (date) => {
    const dateAndTime = new Date(date).toISOString().split('T')
    const time = dateAndTime[1].split(':')
     
    return dateAndTime[0]+'T'+time[0]+':'+time[1]
}
