import { QueryBuilder } from "../../common/queryBuilder";
import { parseDateTime, getIntervalsBetweenTimes, toDateString } from "./providers.helpers";

export type AddAvailabilitiesPayload = {
    timeslots: {
        date: string;
        start_hour: number;
        end_hour: number;
    }[]
};



export const ProvidersService =  {
    async addAvailabilities(providerId: number, data: AddAvailabilitiesPayload): Promise<any> {
        const parsedTimeSlots = data.timeslots.map(({date, start_hour, end_hour}) => {
            const startDateTime = parseDateTime(date, start_hour);
            const endDateTime = parseDateTime(date, end_hour);
            return getIntervalsBetweenTimes(startDateTime, endDateTime, 15);
        }).flat();

        const insertData = [];
        for (let i = 0; i < parsedTimeSlots.length-1; i++) {
            const startTime = parsedTimeSlots[i];
            const endTime = parsedTimeSlots[i + 1];
            insertData.push({
                provider_id: providerId,
                availability_date: toDateString(parsedTimeSlots[0]),
                start_time: startTime,
                end_time: endTime,
                status: 'open'
           });
        }

        return await QueryBuilder('availabilities').insert(insertData);
    },

    async getAvailabilities(providerId: number): Promise<any> {
        return QueryBuilder('availabilities').where('provider_id', providerId).andWhere('status', 'open').select('*');
    },

    async requestReservation(availabilityId: number, clientId: number): Promise<any> {
        const insertRequest = {
            availability_id: availabilityId,
            client_id: clientId,
            requested_at: new Date(),
            status: 'requested'
        }
        return QueryBuilder('availabilities').insert(insertRequest);
    }
}