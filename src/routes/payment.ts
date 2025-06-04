import express, { Request, Response, RequestHandler } from "express";
import Stripe from "stripe";
import Route from "../core/interface/routes.interface";
import authMiddleware from "../core/middleware/auth.middleware";

class PaymentRoute implements Route {
  public path = "/api/payment";
  public router = express.Router();
  private stripe: Stripe;

  constructor() {
    this.stripe = new Stripe(process.env.STRIPE_SECRET as string, {
      apiVersion: "2025-04-30.basil",
    });
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post(
      `${this.path}/create-payment-intent`,
      this.createPaymentIntent as RequestHandler
    );
  }

  private createPaymentIntent = async (
    req: Request,
    res: Response
  ): Promise<void> => {
    try {
      const { amount } = req.body;

      if (!amount || typeof amount !== "number" || amount <= 0) {
        res.status(400).json({
          error: "Amount must be a positive number",
        });
        return;
      }

      const paymentIntent = await this.stripe.paymentIntents.create({
        amount: Math.round(amount * 100),
        currency: "usd",
        automatic_payment_methods: { enabled: true },
      });

      if (!paymentIntent.client_secret) {
        throw new Error("Failed to create payment intent");
      }

      res.status(200).json({ clientSecret: paymentIntent.client_secret });
    } catch (error) {
      console.error("Stripe error:", error);
      res.status(500).json({
        error:
          error instanceof Error
            ? error.message
            : "An unexpected error occurred",
      });
    }
  };
}

export default PaymentRoute;
