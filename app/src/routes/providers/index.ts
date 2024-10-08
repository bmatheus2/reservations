import { FastifyPluginAsync } from "fastify";
import { AddAvailabilitiesPayload, ProvidersService } from './providers.service';
import isProvider from "../../common/middleware/isProvider";
import availabilityIsOpen from "../../common/middleware/availabilityIsOpen";

const example: FastifyPluginAsync = async (fastify): Promise<void> => {
    fastify.get('/:id', async function (request) {
        const { id } = request.params as { id: number };
        return `this is an example with id: ${id}`;
    });
    fastify.post('/:id', async function (request) {
        const { id } = request.params as { id: number };
        const data = request.body;
        // Process the data as needed
        return `Received data for id: ${id} - ${JSON.stringify(data)}`;
    });
    fastify.get('/:id/availabilities', async function (request) {
        const { id } = request.params as { id: number };
        return await ProvidersService.getAvailabilities(id);
    });
    fastify.post('/:id/availabilities', { preHandler: isProvider }, async function (request) {
        const { id } = request.params as { id: number };
        const data = request.body as AddAvailabilitiesPayload;
        // Process the data as needed
        const addAvailabilities = await ProvidersService.addAvailabilities(id, data);
        return addAvailabilities;
    });
    fastify.post('/:provider_id/availabilities/:availability_id/reserve', { preHandler: availabilityIsOpen }, async function (request) {
        const { availability_id } = request.params as { availability_id: number };
        const { client_id } = request.body as { client_id: number };
        return await ProvidersService.requestReservation(availability_id, client_id);
    });
}

export default example;
