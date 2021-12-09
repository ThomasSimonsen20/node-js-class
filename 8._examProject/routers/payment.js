import dotenv from "dotenv"
dotenv.config()

import connection from "../database/conectMysql.js"

import express, { application } from "express"
const router = express()

import Stripe from "stripe"
const stripe = new Stripe(process.env.STRIPE_PRIVATE_KEY)


let products


 async function getProduct() {
  const [rows, columns] = await connection.execute("SELECT * FROM product")
  products = {id: rows[0].idproduct, priceInCents: rows[0].priceInCents, name: rows[0].name}
  //console.log(products.priceInCents)
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
            success_url: `${process.env.SERVER_URL}/successful-payment`,
            cancel_url: `${process.env.SERVER_URL}/create-account`,
        })
        res.json({ url: session.url})
    } catch (e) {
        res.status(500).json({ error: e.message })
    }
})  


export default router