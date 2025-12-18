import fastifyCors from "@fastify/cors";
import fastifySwagger from "@fastify/swagger";
import scalarUI from '@scalar/fastify-api-reference';
import { fastify } from "fastify";
import { jsonSchemaTransform, serializerCompiler, validatorCompiler, ZodTypeProvider } from "fastify-type-provider-zod";

import { env } from "@/env";
import { createLinkRoute } from "@/http/routes/create-link.route";
import { deleteLinkRoute } from "./routes/delete-link.route";
import { getLinkByIdRoute } from "./routes/get-link-by-id.route";
import { getLinkBySlugRoute } from "./routes/get-link-by-slug.route";
import { getLinksRoute } from "./routes/get-links.route";
import { redirectShortenedUrlRoute } from "./routes/redirect-shortned-url.route";

const app = fastify();

app.setValidatorCompiler(validatorCompiler);
app.setSerializerCompiler(serializerCompiler);

app.withTypeProvider<ZodTypeProvider>();

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

app.register(createLinkRoute);
app.register(getLinksRoute);
app.register(getLinkByIdRoute);
app.register(getLinkBySlugRoute);
app.register(deleteLinkRoute);
app.register(redirectShortenedUrlRoute);

app.listen({ port: env.PORT }, (err, address) => {
  if (err) {
    console.error(err)
    process.exit(1)
  }

  console.log("HTTP server running!")
  console.log("Address: ", address)
});