import React from "react";
import { RefreshCw, AlertCircle, Clock, CheckCircle } from "lucide-react";

const RefundReturnsPolicy = () => {
  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">

        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Refund & Returns Policy
          </h1>
        </div>

        {/* Introduction */}
        <div className="mb-10">
          <p className="text-gray-700 leading-relaxed">
            At Loke Store, customer satisfaction is our priority. If you are not
            completely satisfied with your purchase, you may request a return,
            exchange, or refund in accordance with the policy outlined below.
          </p>
        </div>

        {/* Content Sections */}
        <div className="space-y-10">

          {/* Return Eligibility */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              1. Return Eligibility
            </h2>
            <p className="text-gray-700 mb-4">
              You may request a return under the following conditions:
            </p>

            <ul className="list-disc pl-6 text-gray-700 space-y-2">
              <li>The product received is damaged, defective, or incorrect.</li>
              <li>The return request is made within 7 days of delivery.</li>
              <li>The product must be unused and returned in its original packaging.</li>
              <li>
                All accessories, tags, manuals, and invoice must be included
                with the returned item.
              </li>
            </ul>
          </section>

          {/* Non Returnable */}
          <section>
            <div className="flex items-start space-x-3 mb-4">
              <AlertCircle className="w-6 h-6 text-red-600 mt-1" />
              <div>
                <h2 className="text-2xl font-semibold text-gray-900">
                  2. Non-Returnable Items
                </h2>
                <p className="text-gray-700 mt-2">
                  The following items may not be eligible for return:
                </p>
              </div>
            </div>

            <ul className="list-disc pl-9 text-gray-700 space-y-2">
              <li>Products that have been used, damaged, or altered after delivery.</li>
              <li>Items returned without original packaging or missing parts.</li>
              <li>Hygiene-sensitive items such as opened baby products.</li>
              <li>Clearance, final-sale, or discounted promotional items.</li>
            </ul>
          </section>

          {/* Return Process */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              3. Return Process
            </h2>

            <p className="text-gray-700 mb-6">
              To initiate a return request, please follow the steps below:
            </p>

            <div className="space-y-6">

              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                  <span className="font-semibold text-blue-600">1</span>
                </div>
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">
                    Contact Customer Support
                  </h3>
                  <p className="text-gray-700">
                    Reach out to our support team with your order number and
                    details of the issue. Photos may be required for damaged
                    or incorrect items.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                  <span className="font-semibold text-blue-600">2</span>
                </div>
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">
                    Return Approval
                  </h3>
                  <p className="text-gray-700">
                    Once your request is reviewed and approved, instructions
                    will be provided for returning the product.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                  <span className="font-semibold text-blue-600">3</span>
                </div>
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">
                    Inspection & Resolution
                  </h3>
                  <ul className="list-disc pl-6 text-gray-700 space-y-1">
                    <li>Returned items will be inspected upon receipt.</li>
                    <li>
                      Approved refunds will be issued to the original payment
                      method.
                    </li>
                    <li>
                      If eligible, a replacement or exchange may be offered
                      depending on product availability.
                    </li>
                  </ul>
                </div>
              </div>

            </div>
          </section>

          {/* Refund Timeline */}
          <section>
            <div className="flex items-start space-x-3 mb-4">
              <Clock className="w-6 h-6 text-blue-600 mt-1" />
              <div>
                <h2 className="text-2xl font-semibold text-gray-900">
                  4. Refund Timelines
                </h2>
                <p className="text-gray-700 mt-2">
                  Once a return is approved and inspected, refunds are typically
                  processed within 5–7 business days. The time it takes for the
                  amount to reflect in your account depends on your bank or
                  payment provider.
                </p>
              </div>
            </div>
          </section>

          {/* Customer Support */}
          <section className="bg-blue-50 rounded-xl p-6 mt-8">
            <div className="flex items-start space-x-3 mb-4">
              <CheckCircle className="w-6 h-6 text-blue-600 mt-1" />
              <div>
                <h2 className="text-2xl font-semibold text-gray-900">
                  Customer Support
                </h2>
                <p className="text-gray-700 mt-2">
                  For any questions regarding returns or refunds, please contact
                  our support team.
                </p>
              </div>
            </div>

            <div className="bg-white p-4 rounded-lg">
              <p className="font-semibold text-gray-900">Loke Store</p>
              <p className="text-gray-700 mt-1">📞 Phone / WhatsApp: 8825403712</p>
              <p className="text-gray-700">📧 Email: lokestore24@gmail.com</p>
              <p className="text-gray-700 mt-2">
                Salem, Tamil Nadu, India
              </p>
            </div>
          </section>

        </div>
      </div>
    </div>
  );
};

export default RefundReturnsPolicy;