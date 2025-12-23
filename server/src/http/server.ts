import fastifyCors from "@fastify/cors";
import fastifySwagger from "@fastify/swagger";
import scalarUI from '@scalar/fastify-api-reference';
import { fastify } from "fastify";
import {
  hasZodFastifySchemaValidationErrors,
  jsonSchemaTransform,
  serializerCompiler,
  validatorCompiler,
  ZodTypeProvider
} from "fastify-type-provider-zod";
import { ZodError } from "zod";

import { env } from "@/env";
import { createLinkRoute } from "@/http/routes/create-link.route";
import { deleteLinkRoute } from "@/http/routes/delete-link.route";
import { exportLinksRoute } from "@/http/routes/export-links.route";
import { getLinkByIdRoute } from "@/http/routes/get-link-by-id.route";
import { getLinkBySlugRoute } from "@/http/routes/get-link-by-slug.route";
import { getLinksRoute } from "@/http/routes/get-links.route";
import { incrementLinkAccessCountRoute } from "@/http/routes/increment-link-access-count.route";

const app = fastify({
  logger: {
    transport: {
      target: 'pino-pretty',
      options: {
        colorize: true,
        translateTime: 'yyyy-mm-dd HH:MM:ss',
        ignore: 'pid,hostname',
      },
    },
  },
});

app.setValidatorCompiler(validatorCompiler);
app.setSerializerCompiler(serializerCompiler);

app.setErrorHandler((error, request, reply) => {

  request.log.error(error);

  if (hasZodFastifySchemaValidationErrors(error)) {

    return reply.status(400).send({
      message: 'Erro de validação.',
      issues: error.validation.map(issue => ({
        path: issue.instancePath,
        message: issue.message,
      })),
    })
  }

  if (error instanceof ZodError) {
    return reply.status(400).send({
      error: "VALIDATION_ERROR",
      message: "Erro de validação.",
      issues: error.issues.map(issue => ({
        path: issue.path.join("."),
        message: issue.message,
      })),
    });
  }

  return reply.status(500).send({ message: 'Internal server error.' })
});


app.withTypeProvider<ZodTypeProvider>();

app.register(fastifyCors, {
  origin: '*',
  methods: ['GET', 'POST', 'DELETE'],

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

app.register(createLinkRoute);
app.register(getLinksRoute);
app.register(getLinkByIdRoute);
app.register(getLinkBySlugRoute);
app.register(incrementLinkAccessCountRoute);
app.register(deleteLinkRoute);
app.register(exportLinksRoute);

app.listen({ port: env.PORT, host: '0.0.0.0' }, (err, address) => {
  if (err) {
    console.error(err)
    process.exit(1)
  }

  console.log("HTTP server running!")
  console.log("Address: ", address)
});