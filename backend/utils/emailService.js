const nodemailer = require('nodemailer');

const getEmailHTML = (templateName, data) => {
  const styles = {
    body: `font-family: Arial, sans-serif; line-height: 1.6; color: #333333; background-color: #f4f4f4; margin: 0; padding: 0;`,
    container: `max-width: 600px; margin: 20px auto; background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 0 15px rgba(0,0,0,0.1);`,
    header: `background-color: #4A5568; /* Indigo-700 */ color: #ffffff; padding: 25px; text-align: center; border-bottom: 4px solid #6366F1; /* Indigo-500 */`,
    headerH1: `margin: 0; font-size: 28px;`,
    content: `padding: 25px 30px;`,
    contentP: `margin-bottom: 15px; font-size: 16px;`,
    contentH3: `color: #2D3748; /* Gray-800 */ margin-top: 25px; margin-bottom: 10px; border-bottom: 1px solid #E2E8F0; padding-bottom: 5px;`,
    orderItem: `margin-bottom: 10px; padding-bottom: 10px; border-bottom: 1px dashed #CBD5E0; display: flex; align-items: center;`,
    itemImage: `width: 64px; height: 64px; object-fit: cover; border-radius: 4px; margin-right: 15px;`,
    itemDetails: `font-size: 14px;`,
    total: `font-size: 18px; font-weight: bold; margin-top: 20px; text-align: right; color: #4A5568;`,
    footer: `background-color: #E2E8F0; /* Gray-200 */ color: #4A5568; text-align: center; padding: 20px; font-size: 13px; border-top: 1px solid #CBD5E0;`,
    button: `display: inline-block; background-color: #6366F1; color: #ffffff; padding: 12px 25px; text-decoration: none; border-radius: 5px; font-weight: bold; margin-top: 15px;`,
    alertSuccess: `color: #38A169; /* Green-600 */ font-weight: bold;`,
    alertFailure: `color: #E53E3E; /* Red-600 */ font-weight: bold;`
  };

  let htmlContent = `<body style="${styles.body}"><div style="${styles.container}">`;
  htmlContent += `<div style="${styles.header}"><h1 style="${styles.headerH1}">DemoShop</h1></div>`;
  htmlContent += `<div style="${styles.content}">`;

  if (templateName === 'orderConfirmation' && data) {
    htmlContent += `<p style="${styles.contentP}">Dear ${data.customerName || 'Valued Customer'},</p>`;
    htmlContent += `<p style="${styles.contentP}"><span style="${styles.alertSuccess}">Thank you for your order!</span> Your order <strong style="color: #6366F1;">#${data.orderNumber}</strong> has been successfully placed and is now being processed.</p>`;
    htmlContent += `<h3 style="${styles.contentH3}">Order Summary:</h3>`;
    data.items.forEach(item => {
      htmlContent += `<div style="${styles.orderItem}">
                        <img src="${item.image}" alt="${item.name}" style="${styles.itemImage}" />
                        <div style="${styles.itemDetails}">
                          <strong>${item.name}</strong> (${item.variant || ''})<br/>
                          Quantity: ${item.quantity}<br/>
                          Price: $${item.price}
                        </div>
                      </div>`;
    });
    htmlContent += `<p style="${styles.total}">Order Total: $${data.orderTotal}</p>`;
    htmlContent += `<p style="${styles.contentP}">We will notify you once your order ships. You can view your order details by logging into your account.</p>`;
  } else if (templateName === 'orderFailure' && data) {
    htmlContent += `<p style="${styles.contentP}">Dear ${data.customerName || 'Valued Customer'},</p>`;
    htmlContent += `<p style="${styles.contentP}"><span style="${styles.alertFailure}">We're sorry, but we encountered an issue processing your recent order attempt (Ref: ${data.orderNumberRef || 'N/A'}).</span></p>`;
    htmlContent += `<p style="${styles.contentP}"><strong>Reason:</strong> ${data.reason || 'Unknown reason.'}</p>`;
    htmlContent += `<p style="${styles.contentP}">${data.retryInstruction || 'Please check your payment details and try again.'}</p>`;
    htmlContent += `<a href="http://localhost:3000" style="${styles.button}">Return to Shop</a>`;
  } else {
    htmlContent += `<p style="${styles.contentP}">${data.message || 'Notification from DemoShop.'}</p>`;
  }

  htmlContent += `</div><div style="${styles.footer}"><p>&copy; ${new Date().getFullYear()} DemoShop. All rights reserved.</p></div>`;
  htmlContent += `</div></body>`;
  return htmlContent;
};


const sendEmail = async (options) => {
  const transporter = nodemailer.createTransport({
    host: process.env.MAILTRAP_HOST,
    port: process.env.MAILTRAP_PORT,
    auth: {
      user: process.env.MAILTRAP_USER,
      pass: process.env.MAILTRAP_PASS,
    },
  });

  const htmlBody = getEmailHTML(options.template, options.data);

  const mailOptions = {
    from: 'DemoShop <no-reply@salespark.com>',
    to: options.to,
    subject: options.subject,
    html: htmlBody, 
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent: ' + info.response);
    return info;
  } catch (error) {
    console.error('Error sending email: ', error);
    throw error;
  }
};

module.exports = sendEmail;