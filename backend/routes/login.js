const bcrypt = require("bcryptjs");
const User = require("../models/User");

module.exports = async function (fastify, opts) {
  fastify.post("/api/login", async (req, reply) => {
    const { email, password } = req.body;

    if (!email || !password) {
      return reply.status(400).send({ error: "All fields are required." });
    }

    try {
      const user = await User.findOne({ email });
      if (!user) {
        return reply.status(404).send({ error: "User not found" });
      }

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return reply.status(401).send({ error: "Invalid credentials" });
      }

      req.session.user = {
        id: user._id,
        email: user.email,
        firstName: user.firstName,
      };

      return reply.send({ message: "Login successful", user: req.session.user });
    } catch (err) {
      req.log.error(err);
      return reply.status(500).send({ error: "Server error" });
    }
  });


  
  fastify.post("/api/logout", async (req, reply) => {
    req.session.destroy();
    reply.send({ message: "Logged out" });
  });

  
};
