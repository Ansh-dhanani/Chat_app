export function createEmailTemplate(name,clientUrl){
    return`
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Welcome to Chat App</title>
        <!--[if mso]>
        <noscript>
            <xml>
                <o:OfficeDocumentSettings>
                    <o:PixelsPerInch>96</o:PixelsPerInch>
                </o:OfficeDocumentSettings>
            </xml>
        </noscript>
        <![endif]-->
        <style>
            /* Reset styles */
            * {
                margin: 0;
                padding: 0;
                box-sizing: border-box;
            }
            
            body, table, td, p, a, li, blockquote {
                -webkit-text-size-adjust: 100%;
                -ms-text-size-adjust: 100%;
            }
            
            table, td {
                mso-table-lspace: 0pt;
                mso-table-rspace: 0pt;
            }
            
            img {
                -ms-interpolation-mode: bicubic;
                border: 0;
                height: auto;
                line-height: 100%;
                outline: none;
                text-decoration: none;
            }
            
            /* Main styles */
            body {
                font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Arial, sans-serif !important;
                background-color: #0a0a0a !important;
                margin: 0 !important;
                padding: 0 !important;
                width: 100% !important;
                min-width: 100% !important;
                color: #ffffff !important;
            }
            
            .email-container {
                max-width: 600px;
                margin: 0 auto;
                background-color: #141414;
                border: 1px solid #222222;
                border-radius: 16px;
                overflow: hidden;
            }
            
            .header-table {
                width: 100%;
                background-color: #141414;
                border-bottom: 1px solid #222222;
            }
            
            .content-table {
                width: 100%;
                background-color: #141414;
            }
            
            .footer-table {
                width: 100%;
                background-color: #000000;
                border-top: 1px solid #222222;
            }
            
            .logo-cell {
                text-align: center;
                padding: 40px 20px 20px 20px;
            }
            
            .logo-box {
                width: 60px;
                height: 60px;
                background-color: #2a2a2a;
                border: 1px solid #333333;
                border-radius: 12px;
                margin: 0 auto;
                text-align: center;
                vertical-align: middle;
                line-height: 60px;
                font-size: 24px;
                color: #ffffff;
            }
            
            .header-text {
                text-align: center;
                padding: 0 20px 40px 20px;
            }
            
            .header-title {
                font-size: 18px;
                font-weight: 500;
                color: rgba(255, 255, 255, 0.6) !important;
                letter-spacing: 2px;
                text-transform: uppercase;
                margin: 0 0 8px 0;
                line-height: 1.2;
            }
            
            .header-subtitle {
                font-size: 14px;
                color: rgba(255, 255, 255, 0.4) !important;
                font-weight: 400;
                letter-spacing: 1px;
                margin: 0;
                line-height: 1.2;
            }
            
            .content-cell {
                padding: 40px 30px;
            }
            
            .welcome-title {
                font-size: 42px;
                font-weight: 600;
                color: #ffffff !important;
                text-align: center;
                margin: 0 0 16px 0;
                letter-spacing: -1px;
                line-height: 1.1;
            }
            
            .greeting-text {
                font-size: 20px;
                color: rgba(255, 255, 255, 0.7) !important;
                text-align: center;
                margin: 0 0 30px 0;
                font-weight: 400;
                line-height: 1.4;
            }
            
            .greeting-name {
                color: #ffffff !important;
                font-weight: 600;
            }
            
            .description-text {
                font-size: 17px;
                color: rgba(255, 255, 255, 0.5) !important;
                line-height: 1.6;
                margin: 0 0 40px 0;
                text-align: center;
                font-weight: 400;
            }
            
            .feature-table {
                width: 100%;
                margin: 30px 0;
            }
            
            .feature-row {
                background-color: #1a1a1a;
                border: 1px solid #222222;
                border-radius: 12px;
            }
            
            .feature-cell {
                padding: 25px;
            }
            
            .feature-icon-cell {
                width: 70px;
                vertical-align: top;
                padding-right: 20px;
            }
            
            .feature-icon-box {
                width: 50px;
                height: 50px;
                background-color: #000000;
                border: 1px solid #222222;
                border-radius: 10px;
                text-align: center;
                vertical-align: middle;
                line-height: 50px;
                font-size: 18px;
                color: #ffffff;
            }
            
            .feature-content-cell {
                vertical-align: top;
            }
            
            .feature-title {
                font-size: 18px;
                font-weight: 600;
                color: #ffffff !important;
                margin: 0 0 8px 0;
                line-height: 1.2;
            }
            
            .feature-description {
                font-size: 15px;
                color: rgba(255, 255, 255, 0.5) !important;
                line-height: 1.5;
                margin: 0;
                font-weight: 400;
            }
            
            .cta-table {
                width: 100%;
                margin: 40px 0 0 0;
                background-color: #1a1a1a;
                border: 1px solid #222222;
                border-radius: 12px;
            }
            
            .cta-cell {
                padding: 35px 25px;
                text-align: center;
            }
            
            .cta-button {
                display: inline-block;
                background-color: #ffffff !important;
                color: #000000 !important;
                text-decoration: none;
                padding: 16px 40px;
                border-radius: 10px;
                font-size: 17px;
                font-weight: 600;
                border: none;
                text-align: center;
            }
            
            .cta-text {
                margin: 18px 0 0 0;
                font-size: 14px;
                color: rgba(255, 255, 255, 0.4) !important;
                font-weight: 400;
                line-height: 1.4;
            }
            
            .footer-cell {
                padding: 35px 30px;
                text-align: center;
            }
            
            .footer-title {
                color: rgba(255, 255, 255, 0.9) !important;
                font-size: 16px;
                margin: 0 0 8px 0;
                font-weight: 500;
                line-height: 1.3;
            }
            
            .footer-subtitle {
                color: rgba(255, 255, 255, 0.4) !important;
                font-size: 14px;
                font-weight: 400;
                margin: 0 0 25px 0;
                line-height: 1.3;
            }
            
            .footer-links {
                margin: 25px 0;
                padding-top: 25px;
                border-top: 1px solid #222222;
            }
            
            .footer-link {
                color: rgba(255, 255, 255, 0.6) !important;
                text-decoration: none;
                font-size: 14px;
                font-weight: 500;
                margin: 0 15px;
                line-height: 1.4;
            }
            
            .copyright-text {
                margin: 25px 0 0 0;
                padding-top: 25px;
                border-top: 1px solid #222222;
                font-size: 12px;
                color: rgba(255, 255, 255, 0.3) !important;
                font-weight: 400;
                line-height: 1.3;
            }
            
            /* Mobile styles */
            @media only screen and (max-width: 600px) {
                .email-container {
                    width: 100% !important;
                    max-width: 100% !important;
                }
                
                .content-cell {
                    padding: 30px 20px !important;
                }
                
                .welcome-title {
                    font-size: 32px !important;
                }
                
                .greeting-text {
                    font-size: 18px !important;
                }
                
                .description-text {
                    font-size: 16px !important;
                }
                
                .feature-cell {
                    padding: 20px !important;
                }
                
                .feature-icon-cell {
                    width: 60px !important;
                    padding-right: 15px !important;
                }
                
                .feature-icon-box {
                    width: 45px !important;
                    height: 45px !important;
                    line-height: 45px !important;
                    font-size: 16px !important;
                }
                
                .feature-title {
                    font-size: 16px !important;
                }
                
                .feature-description {
                    font-size: 14px !important;
                }
                
                .cta-cell {
                    padding: 25px 20px !important;
                }
                
                .cta-button {
                    padding: 14px 30px !important;
                    font-size: 16px !important;
                }
                
                .footer-cell {
                    padding: 25px 20px !important;
                }
                
                .footer-link {
                    display: block !important;
                    margin: 8px 0 !important;
                }
            }
        </style>
    </head>
    <body>
        <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="background-color: #0a0a0a; margin: 0; padding: 20px 0;">
            <tr>
                <td align="center">
                    <table role="presentation" class="email-container" cellspacing="0" cellpadding="0" border="0">
                        <!-- Header -->
                        <tr>
                            <td>
                                <table role="presentation" class="header-table" cellspacing="0" cellpadding="0" border="0">
                                    <tr>
                                        <td class="logo-cell">
                                            <div class="logo-box">
                                                💬
                                            </div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td class="header-text">
                                            <h1 class="header-title">Chat App</h1>
                                            <p class="header-subtitle">Connect • Chat • Share</p>
                                        </td>
                                    </tr>
                                </table>
                            </td>
                        </tr>
                        
                        <!-- Content -->
                        <tr>
                            <td>
                                <table role="presentation" class="content-table" cellspacing="0" cellpadding="0" border="0">
                                    <tr>
                                        <td class="content-cell">
                                            <h2 class="welcome-title">Welcome aboard!</h2>
                                            <p class="greeting-text">Hi <span class="greeting-name">${name}</span>, we're excited to have you here.</p>
                                            <p class="description-text">You've successfully joined our community of users who value seamless communication. Get ready to experience modern messaging with clean design and powerful features.</p>
                                            
                                            <!-- Features -->
                                            <table role="presentation" class="feature-table" cellspacing="0" cellpadding="0" border="0">
                                                <tr>
                                                    <td>
                                                        <table role="presentation" class="feature-row" cellspacing="0" cellpadding="0" border="0" style="width: 100%; margin-bottom: 15px;">
                                                            <tr>
                                                                <td class="feature-cell">
                                                                    <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                                                                        <tr>
                                                                            <td class="feature-icon-cell">
                                                                                <div class="feature-icon-box">⚡</div>
                                                                            </td>
                                                                            <td class="feature-content-cell">
                                                                                <h3 class="feature-title">Instant Messaging</h3>
                                                                                <p class="feature-description">Real-time conversations with lightning-fast message delivery and read receipts.</p>
                                                                            </td>
                                                                        </tr>
                                                                    </table>
                                                                </td>
                                                            </tr>
                                                        </table>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>
                                                        <table role="presentation" class="feature-row" cellspacing="0" cellpadding="0" border="0" style="width: 100%; margin-bottom: 15px;">
                                                            <tr>
                                                                <td class="feature-cell">
                                                                    <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                                                                        <tr>
                                                                            <td class="feature-icon-cell">
                                                                                <div class="feature-icon-box">🔒</div>
                                                                            </td>
                                                                            <td class="feature-content-cell">
                                                                                <h3 class="feature-title">Privacy First</h3>
                                                                                <p class="feature-description">End-to-end encryption ensures your conversations remain private and secure.</p>
                                                                            </td>
                                                                        </tr>
                                                                    </table>
                                                                </td>
                                                            </tr>
                                                        </table>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>
                                                        <table role="presentation" class="feature-row" cellspacing="0" cellpadding="0" border="0" style="width: 100%;">
                                                            <tr>
                                                                <td class="feature-cell">
                                                                    <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                                                                        <tr>
                                                                            <td class="feature-icon-cell">
                                                                                <div class="feature-icon-box">✨</div>
                                                                            </td>
                                                                            <td class="feature-content-cell">
                                                                                <h3 class="feature-title">Clean Experience</h3>
                                                                                <p class="feature-description">Minimalist interface focused on what matters most - your conversations.</p>
                                                                            </td>
                                                                        </tr>
                                                                    </table>
                                                                </td>
                                                            </tr>
                                                        </table>
                                                    </td>
                                                </tr>
                                            </table>
                                            
                                            <!-- CTA -->
                                            <table role="presentation" class="cta-table" cellspacing="0" cellpadding="0" border="0">
                                                <tr>
                                                    <td class="cta-cell">
                                                        <a href="${clientUrl}" class="cta-button">Start Chatting</a>
                                                        <p class="cta-text">Ready to connect? Click above to access your dashboard.</p>
                                                    </td>
                                                </tr>
                                            </table>
                                        </td>
                                    </tr>
                                </table>
                            </td>
                        </tr>
                        
                        <!-- Footer -->
                        <tr>
                            <td>
                                <table role="presentation" class="footer-table" cellspacing="0" cellpadding="0" border="0">
                                    <tr>
                                        <td class="footer-cell">
                                            <p class="footer-title">Thanks for choosing Chat App</p>
                                            <p class="footer-subtitle">Questions? Our support team is here to help.</p>
                                            
                                            <div class="footer-links">
                                                <a href="#" class="footer-link">Privacy Policy</a>
                                                <a href="#" class="footer-link">Terms of Service</a>
                                                <a href="#" class="footer-link">Support</a>
                                                <a href="#" class="footer-link">Help Center</a>
                                            </div>
                                            
                                            <p class="copyright-text">© 2025 Chat App. All rights reserved.</p>
                                        </td>
                                    </tr>
                                </table>
                            </td>
                        </tr>
                    </table>
                </td>
            </tr>
        </table>
    </body>
    </html>
    `
}