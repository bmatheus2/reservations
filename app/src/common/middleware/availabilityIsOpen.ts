import { QueryBuilder } from "../queryBuilder";
import { FastifyRequest, FastifyReply } from 'fastify';

export default async function availabilityIsOpen(request: FastifyRequest, reply: FastifyReply): Promise<void> {
    const availabilityId = (request.params as { availability_id: string }).availability_id;
    if (!availabilityId) {
        reply.status(401).send({ error: 'Unauthorized' });
        return;
    }

    // Currently broken
    const requestAtExpired = new Date(Date.now() - 30 * 60 * 1000);
    const isOpen = await QueryBuilder('reservations').where('id', availabilityId).andWhere('requested_at', '>=', requestAtExpired).first();
    if (!isOpen) {
        reply.status(403).send({ error: 'Forbidden' });
        return;
    }
}