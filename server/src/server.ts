import fastifyCors from "@fastify/cors";
import fastifySwagger from "@fastify/swagger";
import scalarUI from '@scalar/fastify-api-reference';
import { fastify } from "fastify";
import { jsonSchemaTransform, serializerCompiler, validatorCompiler } from "fastify-type-provider-zod";
import { env } from "./env.ts";

const app = fastify();

app.setValidatorCompiler(validatorCompiler);
app.setSerializerCompiler(serializerCompiler);

app.register(fastifyCors, {
  origin: '*',
});

app.register(fastifySwagger, {
  openapi: {
    info: {
      title: 'Brev.ly',
      version: '1.0.0'
    },
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT'
        }
      }
    }
  },

  transform: jsonSchemaTransform,
});

app.register(scalarUI, {
  routePrefix: '/docs',
  configuration: {
    theme: 'purple'
  }
});

app.listen({ port: env.PORT }, (_, address) => {
  console.log("HTTP server running!")
  console.log("Address: ", address)
});