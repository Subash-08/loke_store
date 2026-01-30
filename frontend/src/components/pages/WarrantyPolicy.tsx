import React from 'react';
import { Shield, Settings, AlertCircle, Clock, FileText } from 'lucide-react';

const WarrantyPolicy = () => {
  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Warranty Policy</h1>
          <p className="text-lg text-gray-600">Coverage for your Loke Store electronic toys & gadgets</p>
        </div>

        {/* Introduction */}
        <div className="mb-10">
          <p className="text-gray-700 leading-relaxed">
            At Loke Store, we want every playtime to be perfect! We stand behind the quality of our electronic toys and gadgets.
            This policy outlines the warranty terms for battery-operated and electronic items to ensure your satisfaction.
          </p>
        </div>

        {/* Content Sections */}
        <div className="space-y-10">
          {/* Standard Warranty Coverage */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">Standard Warranty Coverage</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-blue-50 rounded-xl p-6 border border-blue-100">
                <div className="flex items-center space-x-3 mb-4">
                  <Settings className="w-6 h-6 text-blue-600" />
                  <h3 className="text-lg font-semibold text-gray-900">Electronic Toys</h3>
                </div>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 mr-2 flex-shrink-0"></div>
                    <span className="text-gray-700">RC Cars & Drones: 3 Months</span>
                  </li>
                  <li className="flex items-start">
                    <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 mr-2 flex-shrink-0"></div>
                    <span className="text-gray-700">Electronic Learning Pads: 6 Months</span>
                  </li>
                  <li className="flex items-start">
                    <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 mr-2 flex-shrink-0"></div>
                    <span className="text-gray-700">Robotic Pets: 6 Months</span>
                  </li>
                </ul>
              </div>

              <div className="bg-green-50 rounded-xl p-6 border border-green-100">
                <div className="flex items-center space-x-3 mb-4">
                  <Settings className="w-6 h-6 text-green-600" />
                  <h3 className="text-lg font-semibold text-gray-900">Accessories</h3>
                </div>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <div className="w-1.5 h-1.5 bg-green-600 rounded-full mt-2 mr-2 flex-shrink-0"></div>
                    <span className="text-gray-700">Rechargeable Batteries: 1 Month</span>
                  </li>
                  <li className="flex items-start">
                    <div className="w-1.5 h-1.5 bg-green-600 rounded-full mt-2 mr=2 flex-shrink-0"></div>
                    <span className="text-gray-700">Controllers / Remotes: 1 Month</span>
                  </li>
                  <li className="flex items-start">
                    <div className="w-1.5 h-1.5 bg-green-600 rounded-full mt-2 mr-2 flex-shrink-0"></div>
                    <span className="text-gray-700">Chargers & Cables: 1 Month</span>
                  </li>
                </ul>
              </div>
            </div>
          </section>

          {/* What's Covered */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">What's Covered Under Warranty</h2>
            <div className="bg-gray-50 rounded-xl p-6">
              <ul className="space-y-3">
                <li className="flex items-start">
                  <div className="w-2 h-2 bg-green-600 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                  <span className="text-gray-700">Manufacturing defects in electronics and motors</span>
                </li>
                <li className="flex items-start">
                  <div className="w-2 h-2 bg-green-600 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                  <span className="text-gray-700">Failure of internal components under normal usage</span>
                </li>
                <li className="flex items-start">
                  <div className="w-2 h-2 bg-green-600 rounded-full mt=2 mr-3 flex-shrink-0"></div>
                  <span className="text-gray-700">Dead-on-arrival (DOA) items reported within 24 hours</span>
                </li>
              </ul>
            </div>
          </section>

          {/* What's Not Covered */}
          <section>
            <div className="flex items-start space-x-3 mb-4">
              <AlertCircle className="w-6 h-6 text-red-600 mt-1" />
              <div>
                <h2 className="text-2xl font-semibold text-gray-900">What's Not Covered</h2>
                <div className="mt-4 space-y-3">
                  <p className="text-gray-700">• Physical damage (broken parts) due to drops, crashes, or rough play</p>
                  <p className="text-gray-700">• Water damage (unless the toy is explicitly rated as waterproof)</p>
                  <p className="text-gray-700">• Normal wear and tear on wheels, paint, or stickers</p>
                  <p className="text-gray-700">• Battery leakage damage from old batteries</p>
                  <p className="text-gray-700">• Damage from using incorrect chargers</p>
                </div>
              </div>
            </div>
          </section>

          {/* Warranty Claim Process */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">Warranty Claim Process</h2>
            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                  <span className="font-semibold text-blue-600">1</span>
                </div>
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">Contact Support</h3>
                  <p className="text-gray-700">
                    Report the issue to our support team via phone or WhatsApp. Provide your invoice number.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                  <span className="font-semibold text-blue-600">2</span>
                </div>
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">Check-Up</h3>
                  <p className="text-gray-700">
                    Bring the item to our store or ship it to us. Our team will verify the defect.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                  <span className="font-semibold text-blue-600">3</span>
                </div>
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">Resolution</h3>
                  <ul className="list-disc pl-6 text-gray-700 space-y-1">
                    <li><strong>Repair:</strong> If possible, we fix the issue.</li>
                    <li><strong>Replacement:</strong> If repair is not possible, we replace the item.</li>
                    <li><strong>Time:</strong> We aim to resolve claims within 7 days.</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          {/* Important Notes */}
          <section className="bg-amber-50 rounded-xl p-6">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Important Notes</h2>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-amber-600 rounded-full mt-2 flex-shrink-0"></div>
                <p className="text-gray-700">
                  <strong>Non-Electronic Toys:</strong> Plush toys, puzzles, and blocks are generally not covered under warranty unless defective upon arrival.
                </p>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-amber-600 rounded-full mt-2 flex-shrink-0"></div>
                <p className="text-gray-700">
                  <strong>Proof of Purchase:</strong> Always keep your receipt!
                </p>
              </div>
            </div>
          </section>

          {/* Contact Support */}
          <section className="bg-gray-50 rounded-xl p-6 mt-12">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Warranty Support</h2>
            <div className="space-y-6">
              <div>
                <p className="text-gray-700 mb-3">
                  For warranty claims or inquiries, please contact our dedicated support team:
                </p>
                <div className="bg-white p-4 rounded-lg">
                  <p className="font-semibold text-gray-900">Loke Store Support</p>
                  <div className="mt-3 space-y-2">
                    <p className="text-gray-700">📞 Phone / WhatsApp: <strong>8825403712</strong></p>
                    <p className="text-gray-700">📧 Email: <strong>lokestore24@gmail.com</strong></p>
                  </div>
                  <p className="text-gray-700 mt-3">
                    <strong>Address:</strong> Loke Store, RBT Mall, Meyyanur Bypass Rd, opp. to iplanet,
                    Meyyanur, Salem, Tamil Nadu 636004
                  </p>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default WarrantyPolicy;