/* eslint-disable react/no-unescaped-entities */

import Link from "next/link"

export default function TermsConditions() {
  return (
    <div className="py-16 xl:py-36 px-4 sm:px-6 lg:px-8 bg-white overflow-hidden">
      <div>
        <div className="relative px-4 sm:px-6 lg:px-8">
          <div className="text-lg max-w-prose mx-auto">
            <h1>
              <span className="block text-base text-center text-emerald-600 font-semibold tracking-wide uppercase">
                Introducing
              </span>
              <span className="mt-2 block text-3xl text-center leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
                TERMS AND CONDITIONS
              </span>
            </h1>
            <p className="mt-8 text-xl text-gray-500 leading-8">
              Welcome to Avocado Growth! These terms and conditions ("Terms")
              govern your use of our website, located at www.avocado-growth.com,
              and any related services we provide (collectively, the "Service").
              By using the Service, you agree to be bound by these Terms.
            </p>
          </div>
          <div className="mt-6 prose prose-emerald prose-lg text-gray-500 mx-auto">
            <h2>DESCRIPTION OF SERVICE</h2>
            <p>
              Avocado Growth is an online platform that connects mentors and
              mentees in the field of information technology. Our Service allows
              mentees to connect with mentors for one-on-one mentoring sessions,
              as well as access other mentoring resources.
            </p>
          </div>
          <div className="mt-6 prose prose-emerald prose-lg text-gray-500 mx-auto">
            <h2>PAYMENT</h2>
            <p>
              Payment for mentoring sessions is handled through our payment
              provider, Stripe. By booking a mentoring session through our
              Service, you agree to pay the listed price for the session.
              Payment is due at the time of booking.
            </p>
          </div>

          <div className="mt-6 prose prose-emerald prose-lg text-gray-500 mx-auto">
            <h2>USE OF THE SERVICE</h2>
            <p>
              You agree to use the Service only for lawful purposes and in
              accordance with these Terms. You agree not to use the Service:
            </p>
            <p>
              In any way that violates any applicable federal, state, local, or
              international law or regulation. For the purpose of exploiting,
              harming, or attempting to exploit or harm minors in any way by
              exposing them to inappropriate content, asking for personally
              identifiable information, or otherwise. To transmit, or procure
              the sending of, any advertising or promotional material, including
              any "junk mail," "chain letter," "spam," or any other similar
              solicitation. To impersonate or attempt to impersonate Avocado
              Growth, an Avocado Growth employee, another user, or any other
              person or entity. To engage in any other conduct that restricts or
              inhibits anyone's use or enjoyment of the Service, or which, as
              determined by us, may harm Avocado Growth or users of the Service
              or expose them to liability.
            </p>
          </div>

          <div className="mt-6 prose prose-emerald prose-lg text-gray-500 mx-auto">
            <h2>INTELLECTUAL PROPERTY</h2>
            <p>
              All content included on the Service, such as text, graphics,
              logos, images, audio clips, video, data, music, software, and
              other material (collectively "Content") is owned or licensed
              property of Avocado Growth or its suppliers or licensors and is
              protected by copyright, trademark, patent, or other proprietary
              rights. The compilation of all Content on the Service is the
              exclusive property of Avocado Growth and is protected by copyright
              law.
            </p>
          </div>

          <div className="mt-6 prose prose-emerald prose-lg text-gray-500 mx-auto">
            <h2>DISCLAIMER OF WARRANTIES</h2>
            <p>
              The Service is provided "as is" and "as available" without
              warranty of any kind, either express or implied, including but not
              limited to the implied warranties of merchantability and fitness
              for a particular purpose, non-infringement, or availability of the
              Service. Avocado Growth does not guarantee that the Service will
              be uninterrupted, secure, or error-free.
            </p>
          </div>

          <div className="mt-6 prose prose-emerald prose-lg text-gray-500 mx-auto">
            <h2>LIMITATION OF LIABILITY</h2>
            <p>
              Avocado Growth shall not be liable for any direct, indirect,
              incidental, special, consequential, or exemplary damages,
              including but not limited to damages for loss of profits,
              goodwill, use, data, or other intangible losses resulting from the
              use or inability to use the Service or from any content posted on
              the Service.
            </p>
          </div>

          <div className="mt-6 prose prose-emerald prose-lg text-gray-500 mx-auto">
            <h2>PRIVACY POLICY</h2>
            <p>
              We respect your privacy and are committed to protecting it. Our
              Privacy Policy, located at{" "}
              <Link href="/privacy-policy">Privacy policy</Link> , governs the
              collection, use, and disclosure of your personal information.
            </p>
          </div>

          <div className="mt-6 prose prose-emerald prose-lg text-gray-500 mx-auto">
            <h2>GOVERNING LAW AND JURISDICTION</h2>
            <p>
              These Terms and any dispute or claim arising out of or in
              connection with them or their subject matter or formation
              (including non-contractual disputes
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
