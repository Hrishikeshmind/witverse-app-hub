
import React from 'react';
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const Help = () => {
  const faqs = [
    {
      question: "How do I download an app?",
      answer: "Click on an app to view its details, then click the 'Download' button. You need to be logged in to download apps."
    },
    {
      question: "How can I upload my app to WITVerse Store?",
      answer: "Go to the 'Upload App' page and follow the instructions. You'll need to provide app details, screenshots, and the app package."
    },
    {
      question: "Is there a review process for submitted apps?",
      answer: "Yes, all apps are reviewed by our team to ensure they meet quality and security standards before being published."
    },
    {
      question: "How do I report a problem with an app?",
      answer: "On the app details page, scroll to the bottom and click on 'Report an Issue' to submit your concern."
    },
    {
      question: "Can I update my published app?",
      answer: "Yes, developers can submit updates through the Developer Portal. Updates will go through a review process before being published."
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 container mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold mb-6">Help Center</h1>
        <p className="text-gray-600 dark:text-gray-300 mb-8">
          Find answers to commonly asked questions and get support.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-2">
            <h2 className="text-2xl font-semibold mb-4">Frequently Asked Questions</h2>
            <Accordion type="single" collapsible className="w-full">
              {faqs.map((faq, index) => (
                <AccordionItem key={index} value={`item-${index}`}>
                  <AccordionTrigger className="text-left">{faq.question}</AccordionTrigger>
                  <AccordionContent>{faq.answer}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
          
          <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-xl">
            <h2 className="text-xl font-semibold mb-4">Contact Support</h2>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              Need further assistance? Contact our support team.
            </p>
            <div className="space-y-4">
              <div>
                <h3 className="font-medium text-gray-700 dark:text-gray-200">Email</h3>
                <p className="text-gray-600 dark:text-gray-300">support@witverse.edu.in</p>
              </div>
              <div>
                <h3 className="font-medium text-gray-700 dark:text-gray-200">Office Hours</h3>
                <p className="text-gray-600 dark:text-gray-300">Monday - Friday: 9:00 AM - 5:00 PM</p>
              </div>
              <div>
                <h3 className="font-medium text-gray-700 dark:text-gray-200">Location</h3>
                <p className="text-gray-600 dark:text-gray-300">IT Department, Main Building, WIT Campus</p>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Help;
