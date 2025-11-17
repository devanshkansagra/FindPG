import Enquiry from '../model/enquiry.model.js';
import Property from '../model/property.model.js';
import User from '../model/user.model.js';
import { sendEmail } from '../handlers/sendEmail.js';
import { ApiResponse } from '../handlers/ApiResponse.js';
import { publishNotification } from '../services/notificationPublisher.js';

export async function sendEnquiry(req, res) {
  const { fullName, userEmail, phone, message, propertyName, propertyType, budget, propertyId } =
    req.body;

  const { _id: userId } = req.user;
  try {
    const { agentId } = await Property.findById(propertyId).select('agentId');
    const { email, name } = await User.findById(agentId);

    const newEnquiry = Enquiry.create({
      agentId,
      fullName,
      email: userEmail,
      phone,
      message,
      propertyName,
      propertyType,
      budget,
    });

    const saveEnquiry = (await newEnquiry).save();
    if (saveEnquiry) {
      const payload = {
        recipientId: agentId,
        actorId: userId,
        title: 'New Enquiry alert',
        message: `You have got a new enquiry for ${propertyName} from ${fullName}`,
        delivered: true,
      };
      await publishNotification(payload);
      // const mailOptions = {
      //   from: process.env.GMAIL_USER,
      //   to: email,
      //   subject: 'New Enquiry Alert',
      //   html: `
      //         <html>
      //           <head>
      //             <meta charset="utf-8">
      //             <meta name="viewport" content="width=device-width">
      //           </head>
      //           <body style="font-family: Arial, sans-serif; background:#f6f6f6; margin:0; padding:20px;">
      //             <table width="100%" cellpadding="0" cellspacing="0" role="presentation">
      //               <tr>
      //                 <td align="center">
      //                   <table width="600" cellpadding="0" cellspacing="0" role="presentation" style="background:#ffffff; border-radius:8px; overflow:hidden;">
      //                     <tr>
      //                       <td style="padding:20px; text-align:left;">
      //                         <h2 style="margin:0 0 8px 0; font-size:20px;">New Tenant Enquiry</h2>
      //                         <p style="margin:0 0 16px 0; color:#333;">Hi ${name},</p>

      //                         <p style="margin:0 0 12px 0; color:#333;">
      //                           You've received a new enquiry from a prospective tenant. Details are below:
      //                         </p>

      //                         <table cellpadding="0" cellspacing="0" role="presentation" style="width:100%; margin:12px 0 18px 0;">
      //                           <tr>
      //                             <td style="padding:6px 0;"><strong>Tenant Name:</strong></td>
      //                             <td style="padding:6px 0;">${fullName}</td>
      //                           </tr>
      //                           <tr>
      //                             <td style="padding:6px 0;"><strong>Property:</strong></td>
      //                             <td style="padding:6px 0;">${propertyName}</td>
      //                           </tr>
      //                           <tr>
      //                             <td style="padding:6px 0;"><strong>Property Type:</strong></td>
      //                             <td style="padding:6px 0;">${propertyType}</td>
      //                           </tr>
      //                           <tr>
      //                             <td style="padding:6px 0;"><strong>Contact:</strong></td>
      //                             <td style="padding:6px 0;">${userEmail} · ${phone}</td>
      //                           </tr>
      //                           <tr>
      //                             <td style="padding:6px 0; vertical-align:top;"><strong>Message:</strong></td>
      //                             <td style="padding:6px 0;">${message}</td>
      //                           </tr>
      //                         </table>

      //                         <!-- CTA Button -->
      //                         <p style="text-align:left; margin:18px 0;">
      //                           <a href=${process.env.ORIGIN}
      //                             style="display:inline-block; text-decoration:none; padding:12px 20px; border-radius:6px; font-weight:600; border:1px solid #2563eb; background:#2563eb; color:#ffffff;"
      //                             target="_blank" rel="noopener noreferrer" aria-label="View enquiry on dashboard">
      //                             View Enquiry
      //                           </a>
      //                         </p>

      //                         <hr style="border:none; border-top:1px solid #eee; margin:20px 0;">
      //                         <p style="color:#999; font-size:12px; margin:0;">
      //                           Sent by FindPG · <a href="${process.env.ORIGIN}" style="color:#999; text-decoration:underline;">Visit site</a>
      //                         </p>
      //                       </td>
      //                     </tr>
      //                   </table>
      //                 </td>
      //               </tr>
      //             </table>
      //           </body>
      //         </html>
      //       `,
      // };

      // const response = await sendEmail(mailOptions);
      res.send(new ApiResponse({ statusCode: 200, message: 'Email Sent Successfully' }));
    }
  } catch (error) {
    console.log(error);
  }
}

export async function getEnquiries(req, res) {
  const { _id } = req.user;

  try {
    const enquiries = await Enquiry.find({ agentId: _id });
    res.status(200).send(
      new ApiResponse({
        statusCode: 200,
        message: 'Enquiries fetched successfully',
        data: enquiries,
      })
    );
  } catch (error) {
    console.log(error);
  }
}
