
import React from 'react';
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const Guidelines = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 container mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold mb-6">Developer Guidelines</h1>
        <p className="text-gray-600 dark:text-gray-300 mb-8">
          Important guidelines for developers submitting apps to WITVerse Store.
        </p>
        
        <div className="prose prose-lg max-w-3xl dark:prose-invert">
          <section className="mb-10">
            <h2>App Submission Requirements</h2>
            <p>
              To ensure quality and security, all apps submitted to WITVerse Store must meet the following requirements:
            </p>
            <ul>
              <li>All apps must be developed by WIT students, faculty, or staff.</li>
              <li>Apps must provide value to the WIT community.</li>
              <li>Apps must be original work or have proper licensing for any third-party components.</li>
              <li>Apps must be thoroughly tested and free of major bugs and crashes.</li>
              <li>Apps must clearly state their privacy policies and data usage practices.</li>
            </ul>
          </section>
          
          <section className="mb-10">
            <h2>App Presentation</h2>
            <p>
              When submitting your app, please provide the following:
            </p>
            <ul>
              <li>A clear and descriptive app name</li>
              <li>A comprehensive description explaining what your app does</li>
              <li>At least 3 high-quality screenshots showing key features</li>
              <li>A high-resolution app icon (512x512 PNG)</li>
              <li>Relevant category and tags for discoverability</li>
            </ul>
          </section>
          
          <section className="mb-10">
            <h2>Review Process</h2>
            <p>
              Once submitted, your app will go through our review process:
            </p>
            <ol>
              <li>Initial submission and automatic checks</li>
              <li>Technical review for functionality and security</li>
              <li>Content review for compliance with policies</li>
              <li>Final approval or feedback for improvements</li>
            </ol>
            <p>
              The review process typically takes 3-5 business days. You'll be notified via email about the status of your submission.
            </p>
          </section>
          
          <section>
            <h2>App Updates</h2>
            <p>
              When submitting updates to existing apps:
            </p>
            <ul>
              <li>Clearly describe the changes in your update</li>
              <li>Update version numbers according to semantic versioning (major.minor.patch)</li>
              <li>Submit through the Developer Portal</li>
              <li>Note that updates also undergo review, though usually more expedited</li>
            </ul>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Guidelines;
