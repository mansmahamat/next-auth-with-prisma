/* eslint-disable react/no-unescaped-entities */

import Link from "next/link"

export default function CodeOfConduct() {
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
                CODE OF CONDUCT
              </span>
            </h1>
            <p className="mt-8 text-xl text-gray-500 leading-8">
              At Avocado Growth, we value all our mentors, mentees, and
              contributors. Our goal is to make this a safe space where new and
              experienced developers can connect and learn from one another.
              Therefore, we do not tolerate any form of harassment or prejudice.
              This Code of Conduct applies to all Avocado Growth spaces
              including but not limited to slack, email correspondence, and
              social media.
            </p>
            <p>Harassment includes but is not limited to:</p>
            <li>
              Offensive comments related to gender, gender identity and
              expression, sexual orientation, disability, mental illness,
              physical appearance, body size, age, race, or religion.
            </li>
            <li>Deliberate misgendering or use of ‘dead’ or rejected names.</li>
            <li>
              Physical contact and simulated physical contact (eg, textual
              descriptions like “hug” or “backrub”) without consent or after a
              request to stop.
            </li>
            <li>Threats of violence.</li>
            <li>
              Incitement of violence towards any individual, including
              encouraging a person to commit suicide or to engage in self-harm.
            </li>
            <li>Deliberate intimidation.</li>
            <li>Stalking or following.</li>
            <li>
              Harassing photography or recording, including logging online
              activity for harassment purposes.
            </li>
            <li>
              Unwelcome sexual attention such as sexual images or behaviour in
              spaces where they’re not appropriate.
            </li>
            <li>
              Pattern of inappropriate social contact, such as
              requesting/assuming inappropriate levels of intimacy with others.
            </li>
            <li>Continued one-on-one communication after requests to cease.</li>
            <li>
              Deliberate “outing” of any aspect of a person’s identity without
              their consent except as necessary to protect vulnerable people
              from intentional abuse.
            </li>
            <li>Publication of non-harassing private communication.</li>
          </div>
          <div className="mt-6 prose prose-emerald prose-lg text-gray-500 mx-auto">
            <p>
              We value integrity here at Avocado Growth. As such, mentees may
              not ask for solutions to technical interview take home
              assessments. We're happy to mentor you in the process of solving
              difficult questions, but will not provide you with solutions to
              your assessments as they are meant to reflect your personal skill
              set.
            </p>
            <p>
              Members who violate this code of conduct will be approached by
              someone of the Avocado Growth leadership team and asked to stop
              immediately. Members may also be banned from the Avocado Growth
              slack, blocked on social media, and removed from the website.
            </p>
            <p>
              If someone makes you or anyone else feel unsafe or unwelcome,
              please report it as soon as possible. To report an incident of
              harassment, anonymously or otherwise, please contact us at
              contact@avocadogrowth.com.
            </p>
            <p>
              Our primary goal is to support you. We will listen to you and then
              help you determine a course of action based on the situation.
              While harassment may not always result in that member being
              expelled from the group, depending on the type and severity of
              harassment. We want to make sure you have all the support you need
              no matter what that entails, including whether to stay anonymous
              or not. Whatever decision you make, our priority is your safety.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
