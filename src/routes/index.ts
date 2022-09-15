import type { Fastify } from '@/types/Fastify.js';

export default async function (app: Fastify): Promise<void> {
	app.get(
		'/foo/:id',
		{
			schema: {
				querystring: {
					type: 'object',
					properties: {
						bar: { type: 'number' }
					},
					required: ['bar']
				},
				params: {
					type: 'object',
					properties: {
						id: { type: 'number' }
					},
					required: ['id']
				}
			} as const
		},
		async (request, reply) => {
			const { bar } = request.query;
			const { id } = request.params;
			return 'hello world';
		}
	);
}
