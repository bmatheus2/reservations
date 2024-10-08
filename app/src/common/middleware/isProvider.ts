import { QueryBuilder } from "../queryBuilder";
import { FastifyRequest, FastifyReply } from 'fastify';

export default async function isProvider(request: FastifyRequest, reply: FastifyReply): Promise<void> {
    const userId = (request.params as { id: string }).id;
    if (!userId) {
        reply.status(401).send({ error: 'Unauthorized' });
        return;
    }

    const provider = await QueryBuilder('users').where('id', userId).andWhere('user_type', 'provider').first();
    if (!provider) {
        reply.status(403).send({ error: 'Forbidden' });
        return;
    }
}