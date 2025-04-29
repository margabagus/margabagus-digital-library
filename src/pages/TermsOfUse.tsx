
import React from "react";
import Layout from "@/components/layout/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText } from "lucide-react";

export default function TermsOfUse() {
  const lastUpdated = "April 25, 2024";
  
  return (
    <Layout>
      <div className="container py-12">
        <div className="max-w-3xl mx-auto">
          <Card>
            <CardHeader>
              <CardTitle className="text-3xl flex items-center gap-2">
                <FileText className="h-6 w-6" />
                Terms of Use
              </CardTitle>
              <p className="text-sm text-muted-foreground">Last updated: {lastUpdated}</p>
            </CardHeader>
            <CardContent className="prose dark:prose-invert max-w-none">
              <h2>Agreement to Terms</h2>
              <p>
                These Terms of Use constitute a legally binding agreement made between you and our company, concerning your access to and use of our website and online reading platform. By accessing or using our services, you agree to be bound by these Terms of Use. If you disagree with any part of the terms, you may not access the services.
              </p>
              
              <h2>Intellectual Property Rights</h2>
              <p>
                Unless otherwise indicated, the Website is our proprietary property and all source code, databases, functionality, software, website designs, audio, video, text, photographs, and graphics on the Website and their selection and arrangement ("Content") are owned or controlled by us or licensed to us, and are protected by copyright and trademark laws and various other intellectual property rights.
              </p>
              
              <p>
                The Content on our platform is provided to you AS IS for your personal use only. You may not reproduce, distribute, modify, create derivative works of, publicly display, publicly perform, republish, download, store or transmit any of the material on our Website, except as follows:
              </p>
              
              <ul>
                <li>Your device may temporarily store copies of such materials incidental to your accessing and viewing those materials.</li>
                <li>You may store files that are automatically cached by your Web browser for display enhancement purposes.</li>
                <li>If we provide social media features with certain content, you may take such actions as are enabled by such features.</li>
              </ul>
              
              <h2>User Accounts</h2>
              <p>
                When you create an account with us, you must provide information that is accurate, complete, and current at all times. Failure to do so constitutes a breach of the Terms, which may result in immediate termination of your account.
              </p>
              
              <p>
                You are responsible for safeguarding the password that you use to access the service and for any activities or actions under your password. You agree not to disclose your password to any third party. You must notify us immediately upon becoming aware of any breach of security or unauthorized use of your account.
              </p>
              
              <h2>Subscriptions and Payments</h2>
              <p>
                Some parts of the service are billed on a subscription basis. You will be billed in advance on a recurring schedule depending on the type of subscription plan you select. At the end of each billing period, your subscription will automatically renew unless you or we cancel it.
              </p>
              
              <p>
                You can cancel your subscription renewal either through your online account management page or by contacting our customer support team. A valid payment method, including a credit card, is required to process the payment for your subscription. You must provide accurate and complete billing information for all purchases made through the service.
              </p>
              
              <h2>Prohibited Activities</h2>
              <p>
                You may not access or use the Website for any purpose other than that for which we make the Website available. The Website may not be used in connection with any commercial endeavors except those that are specifically endorsed or approved by us.
              </p>
              
              <p>
                As a user of the Website, you agree not to:
              </p>
              
              <ul>
                <li>Systematically retrieve data or other content from the Website to create or compile, directly or indirectly, a collection, compilation, database, or directory without written permission from us.</li>
                <li>Make any unauthorized use of the services, including collecting usernames and/or email addresses of users by electronic or other means for the purpose of sending unsolicited email.</li>
                <li>Circumvent, disable, or otherwise interfere with security-related features of the Website.</li>
                <li>Engage in unauthorized framing of or linking to the Website.</li>
                <li>Trick, defraud, or mislead us and other users, especially in any attempt to learn sensitive account information such as user passwords.</li>
              </ul>
              
              <h2>Termination</h2>
              <p>
                We may terminate or suspend your account immediately, without prior notice or liability, for any reason whatsoever, including without limitation if you breach the Terms. Upon termination, your right to use the service will immediately cease. If you wish to terminate your account, you may simply discontinue using the service, or notify us at support@example.com.
              </p>
              
              <h2>Limitation of Liability</h2>
              <p>
                In no event shall we, our directors, employees, partners, agents, suppliers, or affiliates, be liable for any indirect, incidental, special, consequential or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from your access to or use of or inability to access or use the services.
              </p>
              
              <h2>Changes to Terms</h2>
              <p>
                We reserve the right, at our sole discretion, to modify or replace these Terms at any time. If a revision is material we will try to provide at least 30 days' notice prior to any new terms taking effect. What constitutes a material change will be determined at our sole discretion.
              </p>
              
              <h2>Contact Us</h2>
              <p>
                If you have any questions about these Terms, please contact us at:
              </p>
              
              <p>
                <strong>Email:</strong> legal@example.com<br />
                <strong>Phone:</strong> +1 (234) 567-890<br />
                <strong>Address:</strong> 123 Main Street, Anytown, AN 12345
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
}
