import Link from "next/link"

export default function Cookies() {
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
                What is a Cookies Policy?
              </span>
            </h1>
            <p className="mt-8 text-xl text-gray-500 leading-8">
              A Cookies Policy is a legal document that outlines how your
              website uses cookies, what types of cookies are used, and how
              users can control or disable them. Cookies are small text files
              that are stored on a user's device when they visit a website. They
              are used to collect information about the user's browsing
              behavior, such as their preferences and interests, which can be
              used to improve the website's performance and user experience
            </p>
          </div>
          <div className="mt-6 prose prose-emerald prose-lg text-gray-500 mx-auto">
            <h2>Why is a Cookies Policy important?</h2>
            <p>
              A Cookies Policy is important because it helps to inform users
              about how their personal data is collected and used by your
              website. This is particularly important under privacy laws like
              the General Data Protection Regulation (GDPR) in the EU and the
              California Consumer Privacy Act (CCPA) in the US, which require
              website owners to obtain user consent before collecting and
              processing their personal data. A clear and concise Cookies Policy
              can help you meet your legal obligations and build trust with your
              users by demonstrating that you are transparent about your data
              collection and use practices.
            </p>
          </div>
          <div className="mt-6 prose prose-emerald prose-lg text-gray-500 mx-auto">
            <h2>What information should be included in a Cookies Policy?</h2>
            Your Cookies Policy should include the following information:
            <span></span>
            <ul className=" p-8  list-disc">
              <li>
                What cookies are used on your website, including the type,
                purpose, and duration of each cookie.
              </li>
              <li>
                How cookies are used, including what data is collected, how it
                is used, and who it is shared with (if applicable).
              </li>
              <li>
                How users can control or disable cookies, including instructions
                on how to do so in different browsers and devices.
              </li>
              <li>
                How you comply with privacy laws and regulations, such as the
                GDPR and CCPA.
              </li>
              <li>
                How you handle user data, including how it is collected, stored,
                and processed.
              </li>
            </ul>
          </div>

          <div className="mt-6 prose prose-emerald prose-lg text-gray-500 mx-auto">
            <p>
              By providing this information in a clear and concise manner, you
              can help your users understand how cookies are used on your
              website and make informed decisions about their privacy.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
