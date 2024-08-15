import startDb from "@/app/lib/db";
import CartModel from "@/app/models/cartModels";
import { NewCartRequest } from "@/app/types";
import { auth } from "@/auth";
import { isValidObjectId } from "mongoose";
import { NextResponse } from "next/server";
export const dynamic = "force-dynamic";

export const POST = async (req: Request) => {
  try {
    const session = await auth();
    const user = session?.user;
    if (!user)
      return NextResponse.json(
        { error: "unauthorized request!" },
        { status: 401 }
      );

    const { productId, quantity } = (await req.json()) as NewCartRequest;
    if (!isValidObjectId(productId) || isNaN(quantity))
      return NextResponse.json({ error: "Invalid request!" }, { status: 401 });
    await startDb();
    const cart = await CartModel.findOne({ userId: user.id });
    if (!cart) {
      // creating new cart if there is none
      await CartModel.create({
        userId: user.id,
        items: [{ productId, quantity }],
      });
      return NextResponse.json({ success: true });
    }

    // update quantity if item already exists

    const existingItem = cart.items.find(
      (item) => item.productId.toString() === productId
    );
    console.log(existingItem);
    if (existingItem) {
      existingItem.quantity += quantity;
      if (existingItem.quantity <= 0) {
        // Remove item if quantity becomes zero
        cart.items = cart.items.filter(
          (item) => item.productId.toString() !== productId
        );
      }
    } else {
      // add new item to the cart
      cart.items.push({ productId: productId as any, quantity });
    }
    await cart.save();
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error in POST /cart", error); // Improved logging
    return NextResponse.json(
      { error: (error as any).message },
      { status: 500 }
    );
  }
};
