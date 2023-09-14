/* eslint-disable react/no-unescaped-entities */
import Link from "next/link"

export default function PrivacyPolicy() {
  return (
    <div className="py-16 xl:py-36 px-4 sm:px-6 lg:px-8 bg-white overflow-hidden">
      <div>
        <div className="relative px-4 sm:px-6 lg:px-8">
          <div className="text-lg max-w-prose mx-auto">
            <h1>
              <span className="block text-base text-center text-emerald-600 font-semibold tracking-wide uppercase">
                Last updated: 15/05/2023
              </span>
              <span className="mt-2 block text-3xl text-center leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
                Privacy Policy
              </span>
            </h1>
            <p className="mt-8 text-xl text-gray-500 leading-8">
              Avocado Growth ("us", "we", or "our") operates [WEBSITE URL] (the
              "Site"). This page informs you of our policies regarding the
              collection, use and disclosure of Personal Information we receive
              from users of the Site.
            </p>
            <p>
              We use your Personal Information only for providing and improving
              the Site. By using the Site, you agree to the collection and use
              of information in accordance with this policy.
            </p>
          </div>
          <div className="mt-6 prose prose-emerald prose-lg text-gray-500 mx-auto">
            <h2>Information Collection And Use</h2>
            <p>
              While using our Site, we may ask you to provide us with certain
              personally identifiable information that can be used to contact or
              identify you. Personally identifiable information may include, but
              is not limited to your name, email address, phone number, and
              company name ("Personal Information").
            </p>
          </div>
          <div className="mt-6 prose prose-emerald prose-lg text-gray-500 mx-auto">
            <h2>Log Data</h2>
            <p>
              Like many site operators, we collect information that your browser
              sends whenever you visit our Site ("Log Data"). This Log Data may
              include information such as your computer's Internet Protocol
              ("IP") address, browser type, browser version, the pages of our
              Site that you visit, the time and date of your visit, the time
              spent on those pages and other statistics.
            </p>
          </div>

          <div className="mt-6 prose prose-emerald prose-lg text-gray-500 mx-auto">
            <h2>Communications</h2>
            <p>
              We may use your Personal Information to contact you with
              newsletters, marketing or promotional materials and other
              information that may be of interest to you. You may opt out of
              receiving any, or all, of these communications from us by
              following the unsubscribe link or instructions provided in any
              email we send.
            </p>
          </div>

          <div className="mt-6 prose prose-emerald prose-lg text-gray-500 mx-auto">
            <h2>Cookies</h2>
            <p>
              Cookies are files with small amount of data, which may include an
              anonymous unique identifier. Cookies are sent to your browser from
              a web site and stored on your computer's hard drive.
            </p>
            <p>
              Like many sites, we use "cookies" to collect information. You can
              instruct your browser to refuse all cookies or to indicate when a
              cookie is being sent. However, if you do not accept cookies, you
              may not be able to use some portions of our Site.
            </p>
          </div>

          <div className="mt-6 prose prose-emerald prose-lg text-gray-500 mx-auto">
            <h2>Security</h2>
            <p>
              The security of your Personal Information is important to us, but
              remember that no method of transmission over the Internet, or
              method of electronic storage, is 100% secure. While we strive to
              use commercially acceptable means to protect your Personal
              Information, we cannot guarantee its absolute security.
            </p>
          </div>

          <div className="mt-6 prose prose-emerald prose-lg text-gray-500 mx-auto">
            <h2>Changes To This Privacy Policy</h2>
            <p>
              This Privacy Policy is effective as of the date above and will
              remain in effect except with respect to any changes in its
              provisions in the future, which will be in effect immediately
              after being posted on this page.
            </p>
            <p>
              We reserve the right to update or change our Privacy Policy at any
              time and you should check this Privacy Policy periodically. Your
              continued use of the Service after we post any modifications to
              the Privacy Policy on this page will constitute your
              acknowledgment of the modifications and your consent to abide and
              be bound by the modified Privacy Policy.
            </p>
          </div>

          <div className="mt-6 prose prose-emerald prose-lg text-gray-500 mx-auto">
            <h2>Contact Us</h2>
            <p>
              If you have any questions about this Privacy Policy, please
              contact us at contact@avocadogrowth.com .
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
