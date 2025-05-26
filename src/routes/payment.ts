import express from "express";
import Stripe from "stripe";

const router = express.Router();
const stripe = new Stripe(process.env.STRIPE_SECRET as string, {
  apiVersion: "2025-04-30.basil",
});
router.post("/create-payment-intent", async (req, res) => {
  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: "Premium",
            },
            unit_amount: 120,
          },
          quantity: 1,
        },
      ],
      success_url: `http://localhost:5000/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `http://localhost:5000/cancel`,
    });

    res.status(200).json({ url: session.url });
  } catch (error: any) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
});

export default router;
