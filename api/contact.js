// Cloudflare Pages Function — /api/contact
// Sends form submissions to james@ven.com.au via Twilio SendGrid
//
// SETUP:
// 1. Sign up at https://sendgrid.com
// 2. Create a Single Sender or verify your domain
// 3. Create an API key (Settings > API Keys > Create API Key)
// 4. Add environment variable in Cloudflare Pages:
//    Settings > Environment variables > Add:
//    SENDGRID_API_KEY = your_api_key_here

export async function onRequestPost(context) {
  const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
  };

  try {
    const data = await context.request.json();

    // Basic validation
    if (!data.email || !data.first_name) {
      return new Response(JSON.stringify({ error: 'Name and email are required' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json', ...corsHeaders },
      });
    }

    // Build plain text email
    const emailBody = [
      'New enquiry from yourconnection.com.au',
      '',
      'Name: ' + data.first_name + ' ' + (data.last_name || ''),
      'Email: ' + data.email,
      'Phone: ' + (data.phone || 'Not provided'),
      'Service: ' + (data.service || 'Not specified'),
      '',
      'Message:',
      data.message || 'No message provided',
      '',
      '---',
      'Sent from the Your Connection website contact form.'
    ].join('\n');

    // Build HTML email
    const htmlBody = '<div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;">'
      + '<div style="background:#1A8A7D;padding:24px;border-radius:12px 12px 0 0;">'
      + '<h2 style="color:white;margin:0;font-size:20px;">New Website Enquiry</h2>'
      + '<p style="color:rgba(255,255,255,0.8);margin:4px 0 0;font-size:14px;">yourconnection.com.au</p>'
      + '</div>'
      + '<div style="background:#f9f9f9;padding:24px;border:1px solid #eee;border-top:none;border-radius:0 0 12px 12px;">'
      + '<table style="width:100%;border-collapse:collapse;">'
      + '<tr><td style="padding:8px 12px;font-weight:bold;color:#555;width:100px;">Name</td>'
      + '<td style="padding:8px 12px;">' + data.first_name + ' ' + (data.last_name || '') + '</td></tr>'
      + '<tr style="background:white;"><td style="padding:8px 12px;font-weight:bold;color:#555;">Email</td>'
      + '<td style="padding:8px 12px;"><a href="mailto:' + data.email + '">' + data.email + '</a></td></tr>'
      + '<tr><td style="padding:8px 12px;font-weight:bold;color:#555;">Phone</td>'
      + '<td style="padding:8px 12px;">' + (data.phone || 'Not provided') + '</td></tr>'
      + '<tr style="background:white;"><td style="padding:8px 12px;font-weight:bold;color:#555;">Service</td>'
      + '<td style="padding:8px 12px;"><span style="background:#E8F5F3;color:#1A8A7D;padding:2px 10px;border-radius:100px;font-size:13px;font-weight:600;">' + (data.service || 'Not specified') + '</span></td></tr>'
      + '</table>'
      + '<div style="margin-top:16px;padding:16px;background:white;border-radius:8px;border:1px solid #eee;">'
      + '<p style="font-weight:bold;color:#555;margin:0 0 8px;font-size:14px;">Message</p>'
      + '<p style="color:#333;margin:0;white-space:pre-wrap;">' + (data.message || 'No message provided') + '</p>'
      + '</div></div></div>';

    // Send via SendGrid API
    const mailResponse = await fetch('https://api.sendgrid.com/v3/mail/send', {
      method: 'POST',
      headers: {
        'Authorization': 'Bearer ' + context.env.SENDGRID_API_KEY,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        personalizations: [{
          to: [{ email: 'james@ven.com.au', name: 'James - Ven Agency' }]
        }],
        from: {
          email: 'noreply@yourconnection.com.au',
          name: 'Your Connection Website'
        },
        reply_to: {
          email: data.email,
          name: (data.first_name + ' ' + (data.last_name || '')).trim()
        },
        subject: 'Website Enquiry: ' + (data.service || 'General') + ' - ' + data.first_name + ' ' + (data.last_name || ''),
        content: [
          { type: 'text/plain', value: emailBody },
          { type: 'text/html', value: htmlBody }
        ]
      })
    });

    // SendGrid returns 202 on success
    if (mailResponse.status === 202 || mailResponse.status === 200) {
      return new Response(JSON.stringify({ success: true }), {
        status: 200,
        headers: { 'Content-Type': 'application/json', ...corsHeaders },
      });
    } else {
      const errorText = await mailResponse.text();
      console.error('SendGrid error:', mailResponse.status, errorText);
      return new Response(JSON.stringify({ error: 'Failed to send email' }), {
        status: 500,
        headers: { 'Content-Type': 'application/json', ...corsHeaders },
      });
    }
  } catch (err) {
    console.error('Contact form error:', err);
    return new Response(JSON.stringify({ error: 'Server error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json', ...corsHeaders },
    });
  }
}

// Handle CORS preflight
export async function onRequestOptions() {
  return new Response(null, {
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  });
}
