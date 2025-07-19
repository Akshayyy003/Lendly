const Request = require("../models/Request");

const LendOffer = require("../models/LendOffer");

module.exports = async function (fastify, opts) {
  fastify.post("/api/requests", async (req, reply) => {

    if (!req.session?.user) {
      return reply.status(401).send({ error: "Not authenticated" });
    }

    const { itemDescription, category, dateNeeded, timeNeeded, duration, city, area, notes } = req.body;

    // Basic validation
    if (!itemDescription || !category || !dateNeeded || !timeNeeded || !duration || !city || !area) {
      return reply.status(400).send({ error: "All required fields must be filled" });
    }

    try {
      const newRequest = new Request({
        userId: req.session.user.id,
        itemDescription,
        category,
        dateNeeded,
        timeNeeded,
        duration,
        city,
        area,
        notes,
      });

      await newRequest.save();

      return reply.code(201).send({
        message: "Request posted successfully",
        request: newRequest,
      });
    } catch (error) {
      req.log.error(error);
      return reply.status(500).send({ error: "Server error" });
    }
  });


  fastify.get("/api/requests", async (req, reply) => {
    try {
      const loggedInUserId = req.session.user?.id;

      // ✅ Fetch all requests excluding user's own
      let requests = await Request.find(
        loggedInUserId ? { userId: { $ne: loggedInUserId } } : {}
      )
        .sort({ createdAt: -1 })
        .populate("userId", "firstName");

      if (loggedInUserId) {
        const requestIds = requests.map((r) => r._id);

        // ✅ Find all offers where current user (lender) has lent to these requests
        const existingOffers = await LendOffer.find({
          lenderId: loggedInUserId,
          requestId: { $in: requestIds },
        }).select("requestId");

        const lentRequestIds = existingOffers.map((offer) =>
          offer.requestId.toString()
        );

        // ✅ Filter out requests that the user has already lent items to
        requests = requests.filter(
          (r) => !lentRequestIds.includes(r._id.toString())
        );
      }

      const cities = [...new Set(requests.map((r) => r.city))];
      const categories = [...new Set(requests.map((r) => r.category))];

      const formattedRequests = requests.map((r) => ({
        _id: r._id,
        itemDescription: r.itemDescription,
        category: r.category,
        dateNeeded: r.dateNeeded,
        timeNeeded: r.timeNeeded,
        duration: r.duration,
        city: r.city,
        area: r.area,
        notes: r.notes,
        createdAt: r.createdAt,
        createdBy: r.userId?.firstName || "Unknown User",
        createdById: r.userId?._id,
      }));

      return reply.send({
        requests: formattedRequests,
        cities,
        categories,
      });
    } catch (error) {
      console.error(error);
      return reply.status(500).send({ error: "Server error" });
    }
  });



  // Get user's own requests
  fastify.get("/api/my-requests", async (req, reply) => {
    console.log("Fetching my requests...");
    try {
      const loggedInUserId = req.session.user?.id;
      if (!loggedInUserId) {
        return reply.status(401).send({ error: "Not authenticated" });
      }

      const myRequests = await Request.find({ userId: loggedInUserId })
        .sort({ createdAt: -1 });

      return reply.send({ requests: myRequests });
    } catch (error) {
      req.log.error(error);
      return reply.status(500).send({ error: "Server error" });
    }
  });






};
