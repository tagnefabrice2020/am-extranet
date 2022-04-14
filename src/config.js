export const API_URL = 'http://admission.fobanginstitutes.org/public/api/v1';

export const getISOStringWithoutSecsAndMillisecs = (date) => {
    const dateAndTime = new Date(date).toISOString().split('T')
    const time = dateAndTime[1].split(':')
     
    return dateAndTime[0]+'T'+time[0]+':'+time[1]
}