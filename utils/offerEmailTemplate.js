// const offerEmailTemplate = ({ name, link, expiresAt }) => {
//     return `
//     <div style="font-family: Arial; line-height:1.6">
//       <h2>Congratulations ${name} 🎉</h2>
//       <p>
//         We are pleased to inform you that your offer letter
//         has been generated successfully.
//       </p>

//       <p>
//         Please click the button below to view your offer letter:
//       </p>

//       <a
//         href="${link}"
//         style="
//           display:inline-block;
//           padding:10px 18px;
//           background:#4f46e5;
//           color:#fff;
//           text-decoration:none;
//           border-radius:6px;
//         "
//       >
//         View Offer Letter
//       </a>

//       <p style="margin-top:15px">
//         ⏰ This link will expire on:
//         <strong>${new Date(expiresAt).toLocaleString()}</strong>
//       </p>

//       <p>
//         If you have any questions, please contact us at
//         <strong>hr@quantumworks.in</strong>
//       </p>

//       <br/>
//       <p>
//         Regards,<br/>
//         <strong>Quantum Works HR Team</strong>
//       </p>
//     </div>
//   `;
// };

// module.exports = offerEmailTemplate;


const offerEmailTemplate = ({ name, link, expiresAt }) => {
  return `
  <!DOCTYPE html>
  <html>
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />

    <!-- ✅ Poppins Font -->
    <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap" rel="stylesheet" />
  <style>
  @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap');
</style>
    </head>

  <body style="margin:0; padding:0; background:#f3f4f6; font-family: 'Poppins', Arial, sans-serif;">
    
    <div style="max-width:650px; margin:30px auto; background:#ffffff; border:1px solid #e5e7eb; border-radius:14px; overflow:hidden;">

      <!-- ✅ Header -->
      <div style="text-align:center; padding:25px 20px; background:#007bc2;">
        <img 
          src="https://res.cloudinary.com/dprcylred/image/upload/v1769782004/QWPLW_dm7k6x.png"
          alt="Quantum Works Logo"
          style="max-width:150px; margin-bottom:10px;"
        />
        <h2 style="margin:0; color:#ffffff; font-size:20px; font-weight:600;">
          Quantum Works Private Limited
        </h2>
        <p style="margin:6px 0 0; color:#eaf6ff; font-size:13px;">
          HR Department | Offer Letter Notification
        </p>
      </div>

      <!-- ✅ Body -->
      <div style="padding:25px 22px; color:#111827; font-size:14px; line-height:1.8;">
        
        <h3 style="margin:0 0 10px; font-size:16px; font-weight:600;">
          Dear ${name},
        </h3>

        <p style="margin:0 0 12px;">
          Congratulations! 🎉 We are delighted to inform you that you have been selected for employment at 
          <strong>Quantum Works Private Limited</strong>.
        </p>

        <p style="margin:0 0 12px;">
          Your <strong>official offer letter</strong> has been generated successfully.  
          To review and download the document, please click the button below:
        </p>

        <!-- ✅ Button -->
        <div style="margin:20px 0; text-align:center;">
          <a
            href="${link}"
            style="
              display:inline-block;
              padding:12px 26px;
              background:#007bc2;
              color:#ffffff;
              text-decoration:none;
              border-radius:10px;
              font-size:14px;
              font-weight:600;
            "
          >
            View & Download Offer Letter
          </a>
        </div>

        <!-- ✅ Expiry Box -->
        <div style="margin-top:18px; padding:14px; background:#f0f9ff; border:1px solid #bae6fd; border-radius:10px;">
          <p style="margin:0; font-size:14px;">
            ⏰ <strong style="color:#007bc2;">Important:</strong>  
            This secure link is valid until  
            <strong>${new Date(expiresAt).toLocaleString()}</strong>.
          </p>
          <p style="margin:6px 0 0; font-size:13px; color:#374151;">
            Kindly review and download your offer letter before the link expires.
          </p>
        </div>

        <p style="margin-top:18px;">
          If you face any difficulty accessing the offer letter or require any clarification,  
          feel free to reach out to us at:  
          <strong style="color:#007bc2;">hr@quantumworks.in</strong>
        </p>

        <p style="margin-top:14px;">
          We look forward to welcoming you to Quantum Works and wish you a successful journey ahead with us.
        </p>

        <br/>

        <p style="margin:0;">
          Regards,<br/>
          <strong>HR Team</strong><br/>
          <span style="color:#007bc2; font-weight:600;">Quantum Works Private Limited</span>
        </p>
      </div>

      <!-- ✅ Footer -->
      <!--  // <div style="padding:15px 20px; background:#f9fafb; border-top:1px solid #e5e7eb; font-size:12px; color:#6b7280;">
      //   <p style="margin:0;">
      //     ⚠️ This is an automated email. Please do not reply to this message.
      //   </p>
      // </div>-->

    </div>

  </body>
  </html>
  `;
};

module.exports = offerEmailTemplate;
