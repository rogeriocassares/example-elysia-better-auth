import { Elysia } from "elysia";
import { z } from "zod";
import { openapi } from '@elysiajs/openapi'
import { betterAuthPlugin, OpenAPI } from "./http/plugins/better-auth";


const app = new Elysia()
  .use(openapi({
    documentation: {
      components: await OpenAPI.components,
      paths: await OpenAPI.getPaths()
    },
    mapJsonSchema: {
      zod: z.toJSONSchema
    }
  }))
  .use(betterAuthPlugin)
  .get("/", () => "Hello Elysia")
  .get('/user/:id', ({ params, user }) => {
    const userId = params.id;

    const authenticatedUserName = user.name;

    console.log(`Authenticated user: ${authenticatedUserName}`);

    return { id: userId, name: "ROgerio Cassares" };
  },
    {
      auth: true,
      detail: {
        summary: "Get User by ID",
        tags: ["users"],
      },

      params: z.object({
        id: z.string()
      }),
      response: {
        200: z.object({
          id: z.string(),
          name: z.string(),
        }),
      }
    })
  .listen(3333);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);


// echo '{"name":"R","email":"cassares.rogerio@gmail.com","password":"12345678"}' |  \
//   http POST http://localhost:3333/auth/api/sign-up/email \
//  Content-Type:application/json

// echo '{"name":"Roger","email":"cassares.rogerio@gmail.io","password":"12345678"}' | http --session=bun_auth POST http://localhost:3333/auth/sign-up/email Content-Type:application/json