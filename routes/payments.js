// routes/payments
const stripe = require("stripe")(process.env.MY_STRIPE_TOKEN);

module.exports = function (app) {
    app.post("/api/charge", charge);
};

function charge(req, res) {
    // Set your secret key: remember to change this to your live secret key in production
    // See your keys here: https://dashboard.stripe.com/account/apikeys


    // Token is created using Checkout or Elements!
    // Get the payment token ID submitted by the form:
    const token = req.body.stripeToken; // Using Express
    if (!token) {
        return res
            .status(400)
            .json({
                success: false,
                message: "Token missing from request"
            });
    }

    const charge = stripe.charges.create({
        amount: 999,
        currency: "usd",
        description: "Example charge",
        source: token
    });

    // TODO save charge in DB

    return res.json({
        success: true,
        message: "Successfully charged card. Thank you for your custom"
    });
}


