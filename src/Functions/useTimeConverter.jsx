
export const TimeConverter = (publishTime) => {
    const publishDate = new Date(publishTime);
    const currentTime = new Date();
    const timeDifference = currentTime - publishDate;

    const seconds = Math.floor(timeDifference / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    const months = Math.floor(days / 30);
    const years = Math.floor(months / 12);

    // Initialize an empty string to store the time elapsed information
    let timeElapsedString = '';

    // Display only two values
    if (years > 0) {
        timeElapsedString += years + ' year' + (years > 1 ? 's' : '');
    } else if (months > 0) {
        timeElapsedString += months + ' month' + (months > 1 ? 's' : '');
    } else if (days > 0) {
        timeElapsedString += days + ' day' + (days > 1 ? 's' : '');
    } else if (hours > 0) {
        timeElapsedString += hours + ' hour' + (hours > 1 ? 's' : '');
    } else if (minutes > 0) {
        timeElapsedString += minutes + ' minute' + (minutes > 1 ? 's' : '');
    } else {
        timeElapsedString += seconds + ' second' + (seconds > 1 ? 's' : '');
    }

    return timeElapsedString + ' ago';

}