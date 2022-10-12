export const API_URL = 'http://195.15.218.172'

export const getISOStringWithoutSecsAndMillisecs = (date) => {
    const dateAndTime = new Date(date).toISOString().split('T')
     
    return dateAndTime[0]
}
