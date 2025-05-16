
import React from 'react';
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const Privacy = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 container mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold mb-6">Privacy Policy</h1>
        <p className="text-gray-600 dark:text-gray-300 mb-8">
          Last updated: May 16, 2025
        </p>
        
        <div className="prose prose-lg max-w-3xl dark:prose-invert">
          <section className="mb-10">
            <h2>Introduction</h2>
            <p>
              WITVerse Store ("we", "our", or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our platform.
            </p>
            <p>
              Please read this Privacy Policy carefully. By accessing or using the WITVerse Store, you agree to the collection and use of information in accordance with this policy.
            </p>
          </section>
          
          <section className="mb-10">
            <h2>Information We Collect</h2>
            <p>
              We collect several types of information from and about users of our platform, including:
            </p>
            <ul>
              <li>
                <strong>Personal Data:</strong> Name, email address, mobile number, and department or role within the institution.
              </li>
              <li>
                <strong>Profile Data:</strong> Your username, password, preferences, feedback, and survey responses.
              </li>
              <li>
                <strong>Usage Data:</strong> Information about how you use our platform, including apps downloaded, search queries, and time spent.
              </li>
              <li>
                <strong>Device Information:</strong> Device type, operating system, browser type, IP address, and other technical data.
              </li>
            </ul>
          </section>
          
          <section className="mb-10">
            <h2>How We Use Your Information</h2>
            <p>
              We use the information we collect for various purposes, including:
            </p>
            <ul>
              <li>Providing and maintaining our platform</li>
              <li>Notifying you about changes to our service</li>
              <li>Allowing participation in interactive features</li>
              <li>Providing customer support</li>
              <li>Gathering analysis to improve our service</li>
              <li>Monitoring usage of our platform</li>
              <li>Detecting and preventing technical issues</li>
            </ul>
          </section>
          
          <section className="mb-10">
            <h2>Data Security</h2>
            <p>
              We implement appropriate technical and organizational measures to protect the security of your personal information. However, please be aware that no method of transmission over the Internet or method of electronic storage is 100% secure.
            </p>
          </section>
          
          <section>
            <h2>Your Rights</h2>
            <p>
              You have the right to:
            </p>
            <ul>
              <li>Access the personal information we hold about you</li>
              <li>Request correction of inaccurate data</li>
              <li>Request deletion of your data under certain circumstances</li>
              <li>Object to our processing of your data</li>
              <li>Request restriction of processing</li>
              <li>Data portability</li>
              <li>Withdraw consent at any time where we rely on consent to process your data</li>
            </ul>
            <p>
              To exercise any of these rights, please contact us at privacy@witverse.edu.in.
            </p>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Privacy;
