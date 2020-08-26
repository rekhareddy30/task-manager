const sgMail = require("@sendgrid/mail")

const sendGridAPIKey = process.env.SENDGRID_API_KEY

sgMail.setApiKey(sendGridAPIKey)

const sendWelcomeEmail = (email, name) => {
    sgMail.send({
        to:email,
        from : 'rekhareddy30@gmail.com',
        subject:'Thanks for Joinig Us',
        text:`Welcome to the app, ${name}. Let me know how you get along with the app.`
    })
}

const sendCancelEmail = (email, name) => {
    sgMail.send({
        to:email,
        from:'rekhareddy30@gmail.com',
        subject:'Feeback for better service.',
        text:`Hi ${name}, We are requesting you to provide the reason for cancellation. This would be helpful to us to imporove the performance.`
    })
}
module.exports = {
    sendWelcomeEmail,
    sendCancelEmail
}
