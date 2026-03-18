import React from "react";
import { AlertCircle, CreditCard, Package, Shield, FileText } from "lucide-react";

const TermsConditions = () => {
  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">

        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Terms & Conditions
          </h1>
        </div>

        {/* Introduction */}
        <div className="mb-10 bg-blue-50 rounded-xl p-6">
          <div className="flex items-start space-x-3">
            <AlertCircle className="w-6 h-6 text-blue-600 mt-1 flex-shrink-0" />
            <div>
              <p className="text-gray-700 leading-relaxed">
                Welcome to Loke Store. These Terms and Conditions govern your
                access to and use of our website and services. By using this
                website, placing an order, or interacting with our services, you
                agree to comply with these Terms.
              </p>
              <p className="text-gray-700 font-medium mt-3">
                If you do not agree with these Terms, please do not use this
                website.
              </p>
            </div>
          </div>
        </div>

        {/* Sections */}
        <div className="space-y-10">

          {/* General Terms */}
          <section>
            <div className="flex items-start space-x-3 mb-4">
              <FileText className="w-6 h-6 text-blue-600 mt-1" />
              <div>
                <h2 className="text-2xl font-semibold text-gray-900">
                  1. General Terms
                </h2>
                <ul className="list-disc pl-6 text-gray-700 space-y-3 mt-3">
                  <li>
                    The information provided on this website is for general
                    informational purposes only and may change without prior
                    notice.
                  </li>
                  <li>
                    Loke Store reserves the right to update, modify, or remove
                    any part of the website or services at any time.
                  </li>
                  <li>
                    Continued use of the website indicates acceptance of the
                    updated terms.
                  </li>
                </ul>
              </div>
            </div>
          </section>

          {/* Products */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              2. Products and Availability
            </h2>
            <ul className="list-disc pl-6 text-gray-700 space-y-3">
              <li>All products listed on this website are subject to availability.</li>
              <li>
                We make every effort to display product images and descriptions
                accurately; however, colors, packaging, or design may slightly
                vary.
              </li>
              <li>
                Loke Store reserves the right to discontinue products or limit
                product quantities at any time.
              </li>
            </ul>
          </section>

          {/* Orders and Payments */}
          <section>
            <div className="flex items-start space-x-3 mb-4">
              <CreditCard className="w-6 h-6 text-blue-600 mt-1" />
              <div>
                <h2 className="text-2xl font-semibold text-gray-900">
                  3. Orders and Payments
                </h2>
                <ul className="list-disc pl-6 text-gray-700 space-y-3 mt-3">
                  <li>
                    Placing an order does not guarantee acceptance. Orders may
                    be canceled if products are unavailable or if payment
                    authorization fails.
                  </li>
                  <li>
                    Payments are processed through secure payment gateways.
                  </li>
                  <li>
                    By completing a purchase, you confirm that you are
                    authorized to use the selected payment method.
                  </li>
                  <li>
                    Prices are listed in Indian Rupees (INR) and may change
                    without prior notice.
                  </li>
                </ul>
              </div>
            </div>
          </section>

          {/* Shipping */}
          <section>
            <div className="flex items-start space-x-3 mb-4">
              <Package className="w-6 h-6 text-blue-600 mt-1" />
              <div>
                <h2 className="text-2xl font-semibold text-gray-900">
                  4. Shipping and Delivery
                </h2>
                <ul className="list-disc pl-6 text-gray-700 space-y-3 mt-3">
                  <li>
                    Delivery timelines provided at checkout are estimates and
                    may vary depending on courier services or external factors.
                  </li>
                  <li>
                    Shipping charges and delivery options will be displayed
                    during checkout.
                  </li>
                  <li>
                    Customers are responsible for providing accurate shipping
                    details. Incorrect information may result in delivery
                    delays.
                  </li>
                </ul>
              </div>
            </div>
          </section>

          {/* Returns */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              5. Returns and Refunds
            </h2>
            <ul className="list-disc pl-6 text-gray-700 space-y-3">
              <li>
                Returns are accepted only for damaged or defective items.
              </li>
              <li>
                Customers must report any issue within 48 hours of receiving
                the product.
              </li>
              <li>
                Approved refunds will be processed after product inspection.
              </li>
              <li>
                Certain items such as opened hygiene products or customized
                items may not be eligible for return.
              </li>
            </ul>
          </section>

          {/* Privacy */}
          <section>
            <div className="flex items-start space-x-3 mb-4">
              <Shield className="w-6 h-6 text-blue-600 mt-1" />
              <div>
                <h2 className="text-2xl font-semibold text-gray-900">
                  6. Privacy Policy
                </h2>
                <p className="text-gray-700 mt-3">
                  By using our website, you agree to the collection and use of
                  information in accordance with our privacy practices. Personal
                  data collected during purchases is used only for order
                  processing and service improvements.
                </p>
                <p className="text-gray-700 mt-2 font-medium">
                  Please review our{" "}
                  <a
                    href="/privacy-policy"
                    className="text-blue-600 hover:underline"
                  >
                    Privacy Policy
                  </a>{" "}
                  for full details.
                </p>
              </div>
            </div>
          </section>

          {/* Intellectual Property */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              7. Intellectual Property
            </h2>
            <p className="text-gray-700">
              All website content including text, images, graphics, branding,
              and layout is the property of Loke Store and is protected by
              applicable intellectual property laws. Unauthorized reproduction
              or distribution of any material is prohibited.
            </p>
          </section>

          {/* Governing Law */}
          <section className="bg-amber-50 rounded-xl p-6">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              8. Governing Law
            </h2>
            <p className="text-gray-700">
              These Terms and Conditions are governed by the laws of India. Any
              disputes arising from the use of this website shall be subject to
              the jurisdiction of the courts located in Tamil Nadu.
            </p>
          </section>

        </div>
      </div>
    </div>
  );
};

export default TermsConditions;