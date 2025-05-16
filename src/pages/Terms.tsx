
import React from 'react';
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const Terms = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 container mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold mb-6">Terms of Service</h1>
        <p className="text-gray-600 dark:text-gray-300 mb-8">
          Last updated: May 16, 2025
        </p>
        
        <div className="prose prose-lg max-w-3xl dark:prose-invert">
          <section className="mb-10">
            <h2>Acceptance of Terms</h2>
            <p>
              By accessing or using the WITVerse Store, you agree to be bound by these Terms of Service. If you disagree with any part of these terms, you may not access the platform.
            </p>
          </section>
          
          <section className="mb-10">
            <h2>Eligibility</h2>
            <p>
              The WITVerse Store is intended for use by students, faculty, and staff of Walchand Institute of Technology. By using the platform, you represent and warrant that you are a current member of the WIT community.
            </p>
          </section>
          
          <section className="mb-10">
            <h2>User Accounts</h2>
            <p>
              When you create an account, you must provide accurate and complete information. You are responsible for safeguarding your account credentials and for all activities that occur under your account.
            </p>
            <p>
              You agree to notify us immediately of any unauthorized access to or use of your account or password. We cannot and will not be liable for any loss or damage arising from your failure to protect your login information.
            </p>
          </section>
          
          <section className="mb-10">
            <h2>Content and Conduct</h2>
            <p>
              You are responsible for all content you upload, post, or otherwise make available through the platform. You agree not to use the platform to:
            </p>
            <ul>
              <li>Violate any laws, rules, or regulations</li>
              <li>Infringe upon intellectual property rights of others</li>
              <li>Transmit harmful code or malware</li>
              <li>Harass, abuse, or harm another person</li>
              <li>Upload false or misleading content</li>
              <li>Interfere with or disrupt the platform or servers</li>
              <li>Collect user data without permission</li>
            </ul>
          </section>
          
          <section className="mb-10">
            <h2>Intellectual Property</h2>
            <p>
              The platform and its original content, features, and functionality are owned by Walchand Institute of Technology and are protected by international copyright, trademark, patent, trade secret, and other intellectual property laws.
            </p>
          </section>
          
          <section className="mb-10">
            <h2>App Downloads and Usage</h2>
            <p>
              By downloading apps from WITVerse Store, you agree to use them in accordance with their individual terms and conditions. We are not responsible for third-party apps' functionality, reliability, or data practices.
            </p>
          </section>
          
          <section className="mb-10">
            <h2>Termination</h2>
            <p>
              We may terminate or suspend your account and access to the platform immediately, without prior notice or liability, for any breach of these Terms or other conduct we deem inappropriate.
            </p>
          </section>
          
          <section>
            <h2>Changes to Terms</h2>
            <p>
              We reserve the right to modify or replace these Terms at any time. We will provide notice of significant changes through the platform or via email.
            </p>
            <p>
              Your continued use of the platform after any changes constitutes your acceptance of the new Terms.
            </p>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Terms;
