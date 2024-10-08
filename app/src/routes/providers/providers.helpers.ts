export function parseDateTime(date: string, hour: number): Date {
    const [year, month, day] = date.split('-').map(Number);
    const parsedDate = new Date(year, month - 1, day, hour);
    return parsedDate;
}

export function getIntervalsBetweenTimes(start: Date, end: Date, intervalMinutes: number): Date[] {
    const intervals = [];
    let current = new Date(start);
    while (current <= end) {
        intervals.push(new Date(current));
        current.setMinutes(current.getMinutes() + intervalMinutes);
    }
    return intervals;
}

export function toDateString(date: Date): string {
    return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
}