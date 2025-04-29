
import React from "react";
import Layout from "@/components/layout/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Shield } from "lucide-react";

export default function PrivacyPolicy() {
  const lastUpdated = "April 25, 2024";
  
  return (
    <Layout>
      <div className="container py-12">
        <div className="max-w-3xl mx-auto">
          <Card>
            <CardHeader>
              <CardTitle className="text-3xl flex items-center gap-2">
                <Shield className="h-6 w-6" />
                Privacy Policy
              </CardTitle>
              <p className="text-sm text-muted-foreground">Last updated: {lastUpdated}</p>
            </CardHeader>
            <CardContent className="prose dark:prose-invert max-w-none">
              <h2>Introduction</h2>
              <p>
                This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website or use our online reading platform. Please read this privacy policy carefully. If you do not agree with the terms of this privacy policy, please do not access the site.
              </p>
              
              <h2>Collection of Your Information</h2>
              <p>
                We may collect information about you in a variety of ways. The information we may collect via the Website includes:
              </p>
              
              <h3>Personal Data</h3>
              <p>
                Personally identifiable information, such as your name, email address, and telephone number, that you voluntarily give to us when you register with the Website or when you choose to participate in various activities related to the Website. You are under no obligation to provide us with personal information of any kind, however your refusal to do so may prevent you from using certain features of the Website.
              </p>
              
              <h3>Derivative Data</h3>
              <p>
                Information our servers automatically collect when you access the Website, such as your IP address, your browser type, your operating system, your access times, and the pages you have viewed directly before and after accessing the Website.
              </p>
              
              <h3>Financial Data</h3>
              <p>
                Financial information, such as data related to your payment method (e.g. valid credit card number, card brand, expiration date) that we may collect when you purchase a subscription. We store only very limited, if any, financial information that we collect. Otherwise, all financial information is stored by our payment processor.
              </p>
              
              <h2>Use of Your Information</h2>
              <p>
                Having accurate information about you permits us to provide you with a smooth, efficient, and customized experience. We may use your information:
              </p>
              
              <ul>
                <li>To create and manage your account</li>
                <li>To email you regarding your account or subscription</li>
                <li>To provide personalized reading recommendations</li>
                <li>To track your reading progress and preferences</li>
                <li>To improve our website and your user experience</li>
                <li>To send you marketing communications if you have opted in to receive them</li>
              </ul>
              
              <h2>Disclosure of Your Information</h2>
              <p>
                We may share information we have collected about you in certain situations. Your information may be disclosed as follows:
              </p>
              
              <h3>By Law or to Protect Rights</h3>
              <p>
                If we believe the release of information about you is necessary to respond to legal process, to investigate or remedy potential violations of our policies, or to protect the rights, property, and safety of others, we may share your information as permitted or required by any applicable law, rule, or regulation.
              </p>
              
              <h3>Third-Party Service Providers</h3>
              <p>
                We may share your information with third parties that perform services for us or on our behalf, including payment processing, data analysis, email delivery, hosting services, customer service, and marketing assistance.
              </p>
              
              <h2>Security of Your Information</h2>
              <p>
                We use administrative, technical, and physical security measures to help protect your personal information. While we have taken reasonable steps to secure the personal information you provide to us, please be aware that despite our efforts, no security measures are perfect or impenetrable, and no method of data transmission can be guaranteed against any interception or other type of misuse.
              </p>
              
              <h2>Contact Us</h2>
              <p>
                If you have questions or comments about this Privacy Policy, please contact us at:
              </p>
              
              <p>
                <strong>Email:</strong> privacy@example.com<br />
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
