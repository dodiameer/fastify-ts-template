import { NowRequestHandler } from "fastify-now";
import { Type, Static } from "@sinclair/typebox";

const GetQuerystring = Type.Object({
  page: Type.Integer({ minimum: 1, default: 1 }),
});

type GetQuerystring = Static<typeof GetQuerystring>;

export const GET: NowRequestHandler<{ Querystring: GetQuerystring }> = async (
  request,
  reply
) => {
  return {
    customers: await request.prisma.customers.findMany({
      take: 10,
      skip: (request.query.page - 1) * 10,
    }),
  };
};

GET.opts = {
  schema: {
    querystring: GetQuerystring,
  },
};
