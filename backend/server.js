const fastify = require('fastify')({ logger: true });
require('dotenv').config();
const fastifyCookie = require("@fastify/cookie");
const fastifySession = require("@fastify/session");

const connectDB = require('./db'); 

fastify.register(require('@fastify/cors'), {
  origin: ['http://localhost:3000'], // Next.js default port
});

fastify.register(fastifyCookie);
fastify.register(fastifySession, {
  secret: process.env.SESSION_SECRET, // use .env in production
  cookie: {
    secure: false, // set to true if using HTTPS
    httpOnly: true,
    maxAge: 1000 * 60 * 60 * 24, // 1 day
  },
  saveUninitialized: false,
});

fastify.register(require('@fastify/formbody'));
fastify.register(require('./routes/auth'));
fastify.register(require('./routes/login'));

connectDB();



const start = async () => {
  try {
    await fastify.listen({ port: process.env.PORT || 5000, host: '0.0.0.0' });
    console.log(`🚀 Server running at http://localhost:${process.env.PORT || 5000}`);
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

start();
