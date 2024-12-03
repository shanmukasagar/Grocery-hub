import { CloseFullscreen } from '@mui/icons-material';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY); // Secret key from environment variables

export async function POST(req) {
  try {
    const { amount } = await req.json();
    // Create a Checkout Session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'inr',
            product_data: {
              name: 'GroceryStoreItems',
            },
            unit_amount: amount * 100, // Amount in cents ($20)
          },
          quantity: 1, // Quantity of the product
        },
      ],
      mode: 'payment',
      success_url: `${process.env.HOST_URL}/payments/success`, // Success page URL
      cancel_url: `${process.env.HOST_URL}/payments/failure`, // Cancel page URL
    });

    return new Response(JSON.stringify({ sessionId: session.id }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    console.error(error);
    return new Response(
      JSON.stringify({ error: 'Failed to create session' }),
      {
        status: 500,
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
  }
}
