const express = require("express");
const cors = require("cors");
const app = express();
// This is your test secret API key.

const stripe = require("stripe")('sk_test_51NpFpLLZjQyOSBIdjInUrAdCieSFTfHYRawnNO0JlEWGPCUHpeKpaHJrGE2NwgQrAInzDkgcpuOVvt9HUNsESgwC00Ef88nW1T');

app.use(express.static("public"));
app.options('*', cors()) // include before other routes
app.use(cors());


app.use(express.json());

const calculateOrderAmount = (items) => {
  // Replace this constant with a calculation of the order's amount
  // Calculate the order total on the server to prevent
  // people from directly manipulating the amount on the client
  let total = 0
  items.forEach(element => {
    total += element.qty
  });
  
  return parseInt(500 * total)
  // return 1400
};

app.post("/orders/order", async (req, res) => {
  const { items } = req.body;

  // Create a PaymentIntent with the order amount and currency
  const paymentIntent = await stripe.paymentIntents.create({
    amount: calculateOrderAmount(items),
    currency: "eur",
    // In the latest version of the API, specifying the `automatic_payment_methods` parameter is optional because Stripe enables its functionality by default.
    automatic_payment_methods: {
      enabled: true,
    },
  });
  res.statusCode=200
  res.send();
});
//https://codingpr.com/stripe-vue-blog/
app.post("/create-payment-intent", async (req, res) => {
  const { cart } = req.body;

  console.log(cart)

  // Create a PaymentIntent with the order amount and currency
  const paymentIntent = await stripe.paymentIntents.create({
    amount: calculateOrderAmount(cart),
    currency: "eur",
    // In the latest version of the API, specifying the `automatic_payment_methods` parameter is optional because Stripe enables its functionality by default.
    automatic_payment_methods: {
      enabled: true,
    },
  });
  res.statusCode=201
  res.send({
    clientSecret: paymentIntent.client_secret,
    totalAmountInCents: paymentIntent.amount
  });
});


app.listen(4242, () => console.log("Node server listening on port 4242!"));
