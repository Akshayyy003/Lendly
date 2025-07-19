const LendOffer = require("../models/LendOffer");
const Request = require("../models/Request"); // Request model
const nodemailer = require("nodemailer");

// Send email function
async function sendEmail(to, subject, text) {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: `"Lendly" <${process.env.EMAIL_USER}>`,
      to,
      subject,
      text,
    });
  } catch (error) {
    console.error("Error sending email:", error);
  }
}

async function lendOfferRoutes(fastify, options) {
  // CREATE offer
  fastify.post("/api/lend-offers", async (request, reply) => {
    try {
      const {
        lenderId,
        borrowerId,
        requestId,
        itemName,
        hourlyRate,
        deposit,
        phone,
        email,
        availabilityDate,
        availabilityTime,
        notes,
      } = request.body;

      const newOffer = new LendOffer({
        lenderId,
        borrowerId,
        requestId,
        itemName,
        hourlyRate,
        deposit,
        phone,
        email,
        availabilityDate,
        availabilityTime,
        notes,
      });

      await newOffer.save();
      return reply.code(201).send({ message: "Offer created successfully", offer: newOffer });
    } catch (error) {
      request.log.error(error);
      return reply.code(500).send({ error: "Failed to create offer" });
    }
  });

  // GET offers for a request
  fastify.get("/api/requests/:requestId/offers", async (req, reply) => {
    try {
      const { requestId } = req.params;
      const offers = await LendOffer.find({ requestId })
        .populate("lenderId", "firstName lastName email phone");

      return reply.send({ offers });
    } catch (error) {
      req.log.error(error);
      return reply.status(500).send({ error: "Server error" });
    }
  });

  // DELETE offer (Reject)
  fastify.delete("/api/lend-offers/:id", async (req, reply) => {
    try {
      const { id } = req.params;
      const offer = await LendOffer.findById(id);

      if (!offer) {
        return reply.status(404).send({ message: "Offer not found" });
      }

      // Send rejection email
      await sendEmail(
        offer.email,
        "Your Offer was Rejected",
        `Hi, your offer for ${offer.itemName} has been rejected.`
      );

      await offer.deleteOne();
      return reply.send({ message: "Offer deleted and email sent." });
    } catch (error) {
      console.error("Error deleting offer:", error);
      return reply.status(500).send({ message: "Server error" });
    }
  });

  // ACCEPT offer (delete request + send email)
  fastify.post("/api/lend-offers/:id/accept", async (req, reply) => {
    try {
      const { id } = req.params;
      const offer = await LendOffer.findById(id);

      if (!offer) {
        return reply.status(404).send({ message: "Offer not found" });
      }

      // Remove the related request
      await Request.findByIdAndDelete(offer.requestId);

      // Send acceptance email with contact info
      const emailContent = `
      Hi,

      Your offer for ${offer.itemName} has been accepted!

      Here are your contact details for coordination:
      - Contact Number: ${offer.phone || "Not provided"}
      - Email: ${offer.email}

      Please get in touch to proceed further.

      Thank you!
    `;

      await sendEmail(
        offer.email,
        "Your Offer was Accepted",
        emailContent
      );

      // Optionally, remove all other offers for the same request
      await LendOffer.deleteMany({ requestId: offer.requestId });

      return reply.send({ message: "Offer accepted, request deleted, email sent." });
    } catch (error) {
      console.error("Error accepting offer:", error);
      return reply.status(500).send({ message: "Server error" });
    }
  });

  fastify.get("/api/my-offers", async (req, reply) => {
  try {

    if (!req.session || !req.session.user) {
      return reply.status(401).send({ message: "Not authenticated" });
    }

    const userId = req.session.user.id; // Get user ID from session
    console.log("Fetching offers for user:", userId);
    const offers = await LendOffer.find({ lenderId: userId }).sort({ createdAt: -1 });

    return reply.send(offers);
  } catch (error) {
    console.error("Error fetching offers:", error);
    return reply.status(500).send({ message: "Server error" });
  }
});

fastify.delete("/api/my/lend-offers/:id", async (req, reply) => {
    try {
      const offerId = req.params.id;

      // Check authentication (optional)
      if (!req.session || !req.session.user) {
        return reply.status(401).send({ message: "Not authenticated" });
      }

      const userId = req.session.user.id;

      // Find the offer and ensure it's owned by the user
      const offer = await LendOffer.findOne({ _id: offerId, lenderId: userId });
      if (!offer) {
        return reply.status(404).send({ message: "Offer not found" });
      }

      await LendOffer.findByIdAndDelete(offerId);

      return reply.send({ message: "Offer deleted successfully" });
    } catch (error) {
      console.error("Error deleting offer:", error);
      return reply.status(500).send({ message: "Server error while deleting offer" });
    }
  });

}



module.exports = lendOfferRoutes;
