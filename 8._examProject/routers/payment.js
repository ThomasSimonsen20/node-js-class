import dotenv from "dotenv"
dotenv.config()

import * as productRepo from "../database/repository/product.js"

import express from "express"
const router = express()

import Stripe from "stripe"
const stripe = new Stripe(process.env.STRIPE_PRIVATE_KEY)

import * as createPages from "../util/render.js"
const successPage = createPages.createPageWithoutHeader("payment/successPage/success.html")
const cancelPage = createPages.createPageWithoutHeader("payment/cancelPage/cancel.html")

let products

async function getProduct() {
  const [result] = await productRepo.getProduct()
  products = {id: result.idproduct, priceInCents: result.priceInCents, name: result.name}
} 

router.post("/create-checkout-session", async (req,res) => {
  await getProduct()
    try {
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ["card"],
            mode: "payment",
            line_items: req.body.items.map(item => {
              return {
                  price_data: {
                      currency: "dkk",
                      product_data: {
                          name: products.name
                      },
                      unit_amount: products.priceInCents
                  },
                  quantity: item.quantity
              }
          }),
            success_url: `${process.env.SERVER_URL}/successful-payment?session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: `${process.env.SERVER_URL}/cancel-payment`,
        })
        res.json({ url: session.url})
    } catch (e) {
        res.status(500).json({ error: e.message })
    }
})

router.get("/successful-payment", async (req, res) => {
    try {
        await stripe.checkout.sessions.retrieve(req.query.session_id);
        res.send(successPage)
    } catch (error) {
        res.redirect("/")
    }
})

router.get("/cancel-payment", async (req, res) => {
    if(!req.session.loggedIn) {
        res.redirect("/")
    } else {
        res.send(cancelPage)
    }

})


export default router