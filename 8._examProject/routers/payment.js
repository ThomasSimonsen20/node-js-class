import dotenv from "dotenv"
dotenv.config()

import express, { application } from "express"
const router = express()

import Stripe from "stripe"
const stripe = new Stripe(process.env.STRIPE_PRIVATE_KEY)

const storeItems = new Map([
    [1, { priceInCents: 10000, name: "Learn React Today" }],
    [2, { priceInCents: 20000, name: "Learn CSS Today" }],
  ])



router.post("/create-checkout-session", async (req,res) => {
    try {
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ["card"],
            mode: "payment",
            line_items: req.body.items.map(item => {
                const storeItem = storeItems.get(item.id)
                return {
                    price_data: {
                        currency: "usd",
                        product_data: {
                            name: storeItem.name
                        },
                        unit_amount: storeItem.priceInCents
                    },
                    quantity: item.quantity
                }
            }),
            success_url: `${process.env.SERVER_URL}/watched-movies`,
            cancel_url: `${process.env.SERVER_URL}/create-account`,
        })
        res.json({ url: session.url})
    } catch (e) {
        res.status(500).json({ error: e.message })
    }
}) 


/*
router.post("/create-checkout-session", async (req, res) => {
    try {
      const session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        mode: "payment",
        line_items: req.body.items.map(item => {
          const storeItem = storeItems.get(item.id)
          return {
            price_data: {
              currency: "usd",
              product_data: {
                name: storeItem.name,
              },
              unit_amount: storeItem.priceInCents,
            },
            quantity: item.quantity,
          }
        }),
        success_url: `${process.env.SERVER_URL}/watched-movies`,
        cancel_url: `${process.env.SERVER_URL}/create-account`,
      })
      res.json({ url: session.url })
    } catch (e) {
      res.status(500).json({ error: e.message })
    }
  })*/


export default router