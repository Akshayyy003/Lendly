const fastify = require('fastify')({ logger: false });
require('dotenv').config();
const fastifyCookie = require("@fastify/cookie");
const fastifySession = require("@fastify/session");
const lendOfferRoutes = require("./routes/lendOffers");

const connectDB = require('./db');

fastify.register(require('@fastify/cors'), {
  origin: 'http://localhost:3000',
  methods: ['GET', 'POST', 'DELETE', 'PUT', 'OPTIONS'],  // ✅ allow DELETE
  credentials: true,
});



// Register cookie plugin first
fastify.register(fastifyCookie);

// Then register session plugin
fastify.register(fastifySession, {
  secret: process.env.SESSION_SECRET,
  cookie: {
    secure: false, // true in production with HTTPS
    httpOnly: true,
    maxAge: 1000 * 60 * 60 * 24, // 1 day
  },
  saveUninitialized: false,
});

fastify.register(lendOfferRoutes);
fastify.register(require('@fastify/formbody'));
fastify.register(require('./routes/auth'));
fastify.register(require('./routes/login'));
fastify.register(require("./routes/storeRequest"));

connectDB();



const start = async () => {
  try {
    await fastify.listen({ port: process.env.PORT || 5000, host: '0.0.0.0' });
    // console.log(`🚀 Server running at http://localhost:${process.env.PORT || 5000}`);
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

start();
