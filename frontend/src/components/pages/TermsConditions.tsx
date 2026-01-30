import React from 'react';
import { FileText, AlertCircle, CreditCard, Package, Shield, Building } from 'lucide-react';

const TermsConditions = () => {
  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Terms & Conditions</h1>
        </div>

        {/* Introduction */}
        <div className="mb-10 bg-blue-50 rounded-xl p-6">
          <div className="flex items-start space-x-3">
            <AlertCircle className="w-6 h-6 text-blue-600 mt-1 flex-shrink-0" />
            <div>
              <p className="text-gray-700 leading-relaxed">
                Welcome to Loke Store. These Terms and Conditions ("Terms") govern your access
                to and use of our website, products, and services. By engaging with our platform or
                initiating any transaction, you agree to comply with and be legally bound by the following terms.
              </p>
              <p className="text-gray-700 font-medium mt-3">
                If you do not agree to these Terms, please refrain from using our website or services.
              </p>
            </div>
          </div>
        </div>

        {/* Content Sections */}
        <div className="space-y-10">
          {/* Section 1 */}
          <section>
            <div className="flex items-start space-x-3 mb-4">
              <Building className="w-6 h-6 text-blue-600 mt-1" />
              <div>
                <h2 className="text-2xl font-semibold text-gray-900">1. Company Overview</h2>
                <p className="text-gray-700 mt-3">
                  Loke Store, headquartered in Salem, Tamil Nadu, is a premier provider of high-quality toys,
                  educational games, gift sets, and kids' accessories.
                  We serve families, schools, and gift shoppers with a focus on safety and fun.
                </p>
              </div>
            </div>
          </section>

          {/* Section 2 */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">2. Product Listings and Pricing</h2>
            <ul className="list-disc pl-6 text-gray-700 space-y-3">
              <li>All product prices are listed in Indian Rupees (INR) and are inclusive or exclusive of applicable taxes, as indicated.</li>
              <li>While we strive for accuracy in product descriptions, age suitability, and pricing, errors may occasionally occur. Loke Store reserves the right to correct such inaccuracies without prior notice.</li>
              <li>Product visuals on the website are for illustrative purposes only; actual colors and packaging may vary slightly.</li>
            </ul>
          </section>

          {/* Section 3 */}
          <section>
            <div className="flex items-start space-x-3 mb-4">
              <CreditCard className="w-6 h-6 text-blue-600 mt-1" />
              <div>
                <h2 className="text-2xl font-semibold text-gray-900">3. Orders and Payments</h2>
                <ul className="list-disc pl-6 text-gray-700 space-y-3 mt-3">
                  <li>Orders are confirmed only upon full payment or as per pre-approved billing terms agreed in writing.</li>
                  <li>We accept payment via bank transfers, UPI, and authorized digital wallets.</li>
                  <li>Custom gift bundles, bulk party orders, or special requests may require advance payment.</li>
                  <li>All orders are subject to availability and acceptance by Loke Store.</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Section 4 */}
          <section>
            <div className="flex items-start space-x-3 mb-4">
              <Package className="w-6 h-6 text-blue-600 mt-1" />
              <div>
                <h2 className="text-2xl font-semibold text-gray-900">4. Delivery and Shipping</h2>
                <ul className="list-disc pl-6 text-gray-700 space-y-3 mt-3">
                  <li>Estimated delivery timelines are provided at the time of order confirmation and are subject to logistical conditions and product availability.</li>
                  <li>Loke Store shall not be held responsible for delays caused by third-party courier services, supplier issues, or circumstances beyond our control.</li>
                  <li>Responsibility for goods transfers to the customer upon dispatch unless otherwise agreed in writing.</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Section 5 - Enhanced with warranty details */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">5. Returns and Refunds</h2>
            <ul className="list-disc pl-6 text-gray-700 space-y-3">
              <li>Products sold by Loke Store are covered under our customer satisfaction guarantee.</li>
              <li>Return requests must be initiated within 3 working days of delivery in cases of manufacturing defects or transit damage, with adequate proof.</li>
              <li>Returns are not accepted for items that handled roughly, water-damaged (unless waterproof), or missing original packaging.</li>
              <li>Hygiene-sensitive products (e.g., teethers, plush toys) may have restricted return policies if opened.</li>
              <li>For detailed return eligibility, please refer to the individual product page or contact our support team.</li>
            </ul>
          </section>

          {/* Section 6 - Privacy Policy Reference */}
          <section>
            <div className="flex items-start space-x-3 mb-4">
              <Shield className="w-6 h-6 text-blue-600 mt-1" />
              <div>
                <h2 className="text-2xl font-semibold text-gray-900">6. Privacy and Data Protection</h2>
                <p className="text-gray-700 mt-3">
                  Loke Store is committed to protecting your personal information. Any data collected
                  during transactions is used solely for operational purposes and
                  will not be disclosed to third parties without your explicit consent, except where legally required.
                </p>
                <p className="text-gray-700 mt-2 font-medium">
                  Please refer to our <a href="/privacy-policy" className="text-blue-600 hover:underline">Privacy Policy</a> for complete details.
                </p>
              </div>
            </div>
          </section>

          {/* Section 7 - Intellectual Property */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">7. Intellectual Property</h2>
            <p className="text-gray-700">
              All website content including text, graphics, branding elements, logos, and multimedia
              is the sole property of Loke Store and is protected under applicable intellectual
              property laws. Unauthorized use, reproduction, or redistribution is strictly prohibited.
            </p>
          </section>

          {/* Section 8 - Amendments */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">8. Amendments</h2>
            <p className="text-gray-700">
              Loke Store reserves the right to update or revise these Terms at any time.
              Changes will be posted on this page with the updated effective date. Continued use
              of the website or services constitutes acceptance of the modified Terms.
            </p>
          </section>

          {/* Section 9 - Additional Important Points */}
          <section className="bg-amber-50 rounded-xl p-6 mt-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Important Additional Terms</h2>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-amber-600 rounded-full mt-2 flex-shrink-0"></div>
                <p className="text-gray-700">
                  <strong>Gift Wrapping:</strong> Additional charges may apply for premium gift wrapping
                  and personalization services. These will be shown at checkout.
                </p>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-amber-600 rounded-full mt-2 flex-shrink-0"></div>
                <p className="text-gray-700">
                  <strong>Product Safety:</strong> All toys meet standard safety regulations. Parents are advised to adhere to age recommendations.
                </p>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-amber-600 rounded-full mt-2 flex-shrink-0"></div>
                <p className="text-gray-700">
                  <strong>Governing Law:</strong> These Terms shall be governed by and construed in accordance
                  with the laws of India, and any disputes shall be subject to the exclusive jurisdiction
                  of courts in Salem, Tamil Nadu.
                </p>
              </div>
            </div>
          </section>

          {/* Contact Information */}
          <section className="bg-gray-50 rounded-xl p-6 mt-12">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Contact Information</h2>
            <div className="space-y-4">
              <div>
                <p className="font-semibold text-gray-900">Loke Store</p>
                <p className="text-gray-700 mt-1">
                  Loke Store, RBT Mall, Meyyanur Bypass Rd, opp. to iplanet,
                  Meyyanur, Salem, Tamil Nadu 636004
                </p>
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-white p-3 rounded-lg">
                  <p className="text-sm text-gray-600">Phone / WhatsApp</p>
                  <p className="font-medium">8825403712</p>
                </div>
                <div className="bg-white p-3 rounded-lg">
                  <p className="text-sm text-gray-600">Email</p>
                  <p className="font-medium">lokestore24@gmail.com</p>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default TermsConditions;