import { getCartItems } from "@/app/lib/cartHelper";
import { auth } from "@/auth";
import { isValidObjectId } from "mongoose";
import { NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2024-06-20",
});

export const POST = async (req: Request) => {
  try {
    const session = await auth();
    if (!session?.user)
      return NextResponse.json(
        {
          error: "Unauthorized Request!",
        },
        { status: 401 }
      );
    const data = await req.json();
    const cartId = data.cartId as string;
    if (!isValidObjectId(cartId))
      return NextResponse.json(
        {
          error: "Invalid cart id!",
        },
        { status: 401 }
      );
    const cartItems = await getCartItems(session.user.id, cartId);
    if (!cartItems)
      return NextResponse.json(
        {
          error: "Cart Not Found!",
        },
        { status: 404 }
      );
    const line_items = cartItems.products.map((product) => {
      return {
        price_data: {
          currency: "USD",
          unit_amount: product.price * 100, // convert cents in to 1
          product_data: {
            name: product.title,
            images: [product.thumbnail],
          },
        },
        quantity: product.qty,
      };
    });
    const params: Stripe.Checkout.SessionCreateParams = {
      mode: "payment",
      payment_method_types: ["card"],
      line_items,
      success_url: process.env.PAYMENT_SUCCESS_URL!,
      cancel_url: process.env.PAYMENT_CANCEL_URL!,
      shipping_address_collection: { allowed_countries: ["AU", "TR", "US"] },
    };
    const checkoutSession = await stripe.checkout.sessions.create(params);
    return NextResponse.json({ url: checkoutSession.url });
  } catch (error) {
    return NextResponse.json(
      { error: "Something went wrong, could not process the checkout!" },
      { status: 500 }
    );
  }
};
