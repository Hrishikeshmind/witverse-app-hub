
import React from 'react';
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const ReviewPolicy = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 container mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold mb-6">App Review Policy</h1>
        <p className="text-gray-600 dark:text-gray-300 mb-8">
          Learn about our app review process and policies.
        </p>
        
        <div className="prose prose-lg max-w-3xl dark:prose-invert">
          <section className="mb-10">
            <h2>Review Guidelines</h2>
            <p>
              At WITVerse Store, we review every app submitted to ensure it provides value to our campus community and meets our standards for quality, security, and content. Here are the key aspects we evaluate:
            </p>
            <ul>
              <li><strong>Functionality:</strong> The app must work as described and be free of major bugs or crashes.</li>
              <li><strong>Design:</strong> The app should follow good design practices and provide a consistent user experience.</li>
              <li><strong>Security:</strong> The app must handle user data securely and implement proper authentication where needed.</li>
              <li><strong>Content:</strong> All content must be appropriate for the academic environment and comply with university policies.</li>
              <li><strong>Value:</strong> The app should provide clear value to WIT students, faculty, or staff.</li>
            </ul>
          </section>
          
          <section className="mb-10">
            <h2>Review Process</h2>
            <p>
              Our review process typically consists of the following steps:
            </p>
            <ol>
              <li>
                <strong>Initial Screening:</strong> Automated checks for basic requirements and security vulnerabilities.
              </li>
              <li>
                <strong>Technical Review:</strong> Our team tests the app's functionality, performance, stability, and compliance with technical requirements.
              </li>
              <li>
                <strong>Content Review:</strong> We evaluate the app's content, description, screenshots, and other metadata.
              </li>
              <li>
                <strong>Final Decision:</strong> Based on the reviews, the app is either approved, rejected with feedback, or returned with requests for changes.
              </li>
            </ol>
          </section>
          
          <section className="mb-10">
            <h2>Common Rejection Reasons</h2>
            <p>
              To help you avoid rejection, here are common issues that may lead to rejection:
            </p>
            <ul>
              <li>Crashes or bugs that significantly impact usability</li>
              <li>Incomplete information or features</li>
              <li>Misleading descriptions or functionality</li>
              <li>Poor user interface or experience design</li>
              <li>Inappropriate content or violations of university policies</li>
              <li>Security vulnerabilities or privacy concerns</li>
              <li>Duplicate functionality without significant improvement over existing apps</li>
            </ul>
          </section>
          
          <section>
            <h2>Appeal Process</h2>
            <p>
              If your app is rejected and you believe the decision was incorrect, you can appeal by:
            </p>
            <ol>
              <li>Reviewing the rejection feedback carefully</li>
              <li>Addressing the issues mentioned in the feedback</li>
              <li>Submitting an appeal through the Developer Portal with details about how you've resolved the issues</li>
            </ol>
            <p>
              Our team will review your appeal and reconsider your app based on the changes you've made.
            </p>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ReviewPolicy;
