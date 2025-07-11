const user = require('../models/User');
const bcrypt = require('bcrypt');


module.exports = async function registerUser(fastify, options) {

    fastify.post('/api/signup', async (request, reply) => {
        const { name, email, city, number, password } = request.body;

        if ( !name || !email || !city || !number || !password) {
            return reply.status(400).send({ error: 'All fields are required' });
        }

        try {
            const existingUser = await user.findOne({ email });
            if (existingUser) {
                return reply.status(400).send({ error: 'Email already exists' });
            }

            const hashedPassword = await bcrypt.hash(password, 10);
            const newUser = new user({
                name,
                email,
                city,
                number,
                password: hashedPassword
            });

            await newUser.save();
            return reply.code(201).send({
                message: 'User created successfully',
                user: {
                    id: newUser._id,
                    name: newUser.name,
                    email: newUser.email,
                },
            });
        } catch (error) {
            console.error('Error registering user:', error);
            reply.status(500).send({ error: 'Internal server error' });
        }

    });
}