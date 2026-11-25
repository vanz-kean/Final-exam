import { useState } from 'react';

const Privacy = () => {
  const [accepted, setAccepted] = useState(false);

  return (
    <>
      <section className="portal-card card-full privacy-heading">
        <h1 tabIndex="-1">UP Privacy Notice for Students</h1>
        <p>
          University of the Philippines · Revised as of 1st Semester/Trimester
          2024–2025. Effective starting the 1st semester of AY 2024–2025. It
          replaces the 2018–19 notices and the notice of 27 August 2019.
        </p>
      </section>

      <section className="portal-card card-full" aria-labelledby="short-version">
        <h2 id="short-version">The short version</h2>
        <p>Don't have time to read it all? Here's what matters.</p>
        <ul className="portal-list">
          <li>
            <strong>Why UP has your data:</strong> to enroll you, teach and
            grade you, serve you, keep campus safe, and follow the law.
          </li>
          <li>
            <strong>The legal basis:</strong> when you enroll and sign the UP
            student pledge, you enter a contract with UP. Most data processing
            for your education rests on that contract, so UP doesn't need new
            consent each time.
          </li>
          <li>
            <strong>The law behind it:</strong> the Philippine Data Privacy Act
            of 2012 (DPA).
          </li>
          <li>
            <strong>Who sees it:</strong> authorized UP personnel who need it
            for their work, plus outside parties when the law requires it or
            you consent.
          </li>
          <li>
            <strong>Your rights:</strong> you can see and correct your data,
            and in some cases object to processing or withdraw consent.
          </li>
          <li>
            <strong>Questions?</strong> Contact the UP Mindanao Data Protection
            Officer in the <a href="#contact">contact section</a>.
          </li>
        </ul>
      </section>

      <section className="portal-card card-full" aria-labelledby="privacy-toc">
        <h2 id="privacy-toc">Jump to a section</h2>
        <ol className="privacy-toc">
          <li><a href="#policy">What this notice is about</a></li>
          <li><a href="#basis">Why UP can process your data</a></li>
          <li><a href="#collected">What UP collects, and why</a></li>
          <li><a href="#storage">Storage and research</a></li>
          <li><a href="#rfid">Your UP ID (RFID)</a></li>
          <li><a href="#sharing">Who your data may be shared with</a></li>
          <li><a href="#protection">Risks and how UP protects your data</a></li>
          <li><a href="#rights">Your rights</a></li>
          <li><a href="#consent">Consent and how to withdraw it</a></li>
          <li><a href="#contact">Contact the Data Protection Officer</a></li>
        </ol>
      </section>

      <section className="portal-card card-full" id="policy">
        <details open>
          <summary><h2>1. What this notice is about</h2></summary>
          <p>
            To protect academic freedom and your right to quality education, UP
            needs to process your <strong>personal data</strong>: personal
            information that identifies you and your <strong>sensitive
            personal information</strong>. UP commits to comply with the
            Philippine Data Privacy Act of 2012 (DPA).
          </p>
          <h3>This notice explains</h3>
          <ol>
            <li>The nature, purpose, and extent of processing your personal data</li>
            <li>The legal basis for that processing</li>
            <li>The risks involved and the measures UP uses to protect your data</li>
            <li>Your data privacy rights and how to use them</li>
          </ol>
          <p>
            Other notices may apply too. UP portals (such as SLAS Online), data
            systems (such as the pre-enrollment health assessment), registration
            systems, and learning management systems have their own privacy
            notices. Check your campus website for the ones that apply to you.
            System-wide notices are on the{' '}
            <a href="https://privacy.up.edu.ph/" target="_blank" rel="noreferrer">
              UP Privacy Policies homepage
            </a>.
          </p>
          <h3>Who is "you" and who is "UP"?</h3>
          <dl>
            <dt>UP / the University / us</dt>
            <dd>
              The UP System and its Constituent Universities (CUs), any of
              their offices, officials, or authorized personnel.
            </dd>
            <dt>You / your</dt>
            <dd>
              All UP students and those qualified to enroll who are seeking
              admission. For students and applicants under 18, it also covers
              parents or guardians who sign registration-related forms.
            </dd>
          </dl>
        </details>
      </section>

      <section className="portal-card card-full" id="basis">
        <details>
          <summary><h2>2. Why UP can process your data</h2></summary>
          <h3>Your contract with UP</h3>
          <p>
            When you first enrolled (and when you were re-admitted, if
            applicable), you signed and submitted the <strong>UP student
            pledge</strong> to your University Registrar, as required by
            Article 329 of the Revised UP Code. In it you promise to follow the
            rules and regulations of the University System and your college or
            school. By signing it you entered into a contract with UP.
          </p>
          <dl>
            <dt>Personal information</dt>
            <dd>
              Your name, photo, signature, sex assigned at birth, address,
              contact details, parents' names, and similar details are
              processed under this contract (Section 12(b) of the DPA).
            </dd>
            <dt>Sensitive personal information</dt>
            <dd>
              This includes education records, exact birthdate and age, health
              information tied to admission or to excusing absences, leave of
              absence, readmission and appeals, religious affiliation,
              Indigenous Peoples group membership, civil status (for a married
              woman who chooses to use her spouse's surname), disciplinary
              information, your student number, and government ID documents
              such as a PSA birth or marriage certificate. By signing the
              pledge, you are understood to have given consent for UP to
              process these as part of providing your education. UP therefore
              doesn't ask for separate consent for processing within its
              academic freedom.
            </dd>
            <dt>Continuing students and document requests</dt>
            <dd>
              Data of continuing students, and of those requesting
              certifications, clearances, true copies of grades, transcripts,
              and other official documents, is processed under the contract
              (12(b)) and consent (13(a)) provisions of the DPA.
            </dd>
          </dl>
          <p>
            UP relies on National Privacy Commission (NPC) Advisory Opinion
            2022-14, which says schools can process personal data within their
            educational framework without separate consent, because enrollment
            creates a contract between school and student. The NPC adds that
            schools should separate core educational processing from things
            outside it, such as marketing or public relations.
          </p>
        </details>
      </section>

      <section className="portal-card card-full" id="collected">
        <details>
          <summary><h2>3. What UP collects, and why</h2></summary>
          <p>
            UP collects information through paper-based and online systems. It
            may also collect publicly available information about you, as
            allowed by the DPA. Your image may be captured by CCTV or at
            recorded, broadcast, and live-streamed University events.
          </p>
          <div className="table-responsive">
            <table className="table kaplag-table">
              <caption>Typical information collected from students</caption>
              <thead>
                <tr><th scope="col">Information</th><th scope="col">Why UP uses it</th></tr>
              </thead>
              <tbody>
                <tr>
                  <th scope="row">Name, sex assigned at birth, birth date and place, citizenship, photo, signature, family information, admission portal login details, PSA birth or marriage certificate</th>
                  <td>Verify your identity, determine your eligibility to enroll, and prevent fraud. You must attest that the information is true and correct.</td>
                </tr>
                <tr>
                  <th scope="row">Parents' education and occupation, household income, Indigenous Peoples group membership, permanent address (UPCAT admits)</th>
                  <td>Campus qualifier selection considers socioeconomic and geographic factors under Section 9 of RA 9500, which requires UP to improve access for disadvantaged students.</td>
                </tr>
                <tr>
                  <th scope="row">Educational records and grades</th>
                  <td>Process enrollment, grade your work, act on changes of matriculation, dropping, and leave of absence, check academic progress, evaluate graduation, act on appeals, and recommend honors.</td>
                </tr>
                <tr>
                  <th scope="row">Health information</th>
                  <td>Check physical fitness to enroll, provide health services and emergency care, and process medical certificates for excused absences, dropping a subject, leave of absence, or an appeal to graduate with honors.</td>
                </tr>
                <tr>
                  <th scope="row">Religious affiliation</th>
                  <td>Verify identity against records, check that UP stays non-discriminatory, and provide services that respect your beliefs (such as health and food needs).</td>
                </tr>
                <tr>
                  <th scope="row">Disciplinary information</th>
                  <td>Handle any offense you committed or are alleged to have committed, through UP's disciplinary proceedings.</td>
                </tr>
                <tr>
                  <th scope="row">Contact information and your emergency contact person</th>
                  <td>Reach you about classes, academic matters, and UP activities, contact your family or others you identify in an emergency, and invite you to join non-commercial research.</td>
                </tr>
                <tr>
                  <th scope="row">Financial information</th>
                  <td>Administer State-funded and private scholarships, grants, and other assistance.</td>
                </tr>
                <tr>
                  <th scope="row">Information for services</th>
                  <td>ID cards, stickers and gate passes, library, dormitory, health, counseling and guidance, insurance claims, student organization recognition, student elections, exchange programs, and internships.</td>
                </tr>
                <tr>
                  <th scope="row">CCTV footage</th>
                  <td>Protect your vitally important interests, keep public order and safety, and prevent harm or injury.</td>
                </tr>
                <tr>
                  <th scope="row">Non-Filipino applicants' information</th>
                  <td>Confirm that admission and enrollment are allowed under Philippine law and University rules.</td>
                </tr>
              </tbody>
            </table>
          </div>
          <details>
            <summary>Good to know</summary>
            <ul>
              <li>
                If you give UP your parents', guardian's, or emergency contact's
                information, you warrant that you have their consent, and you
                agree to hold UP free and harmless from liability for
                processing it under UP's rules.
              </li>
              <li>
                When you use UP services, you may be asked to show your UP ID,
                or a government ID if your UP ID isn't available yet.
              </li>
              <li>
                Records of applicants who don't qualify or don't enroll are
                securely disposed of within a reasonable period.
              </li>
            </ul>
          </details>
        </details>
      </section>

      <section className="portal-card card-full" id="storage">
        <details>
          <summary><h2>4. Storage and research</h2></summary>
          <h3>How long UP keeps your records</h3>
          <p>
            UP securely stores your educational record and the personal
            information needed to verify your identity, so it can issue
            transcripts, certifications, and other documents to current
            students, former students, and alumni, as the Education Act of 1982
            requires. It also keeps records to:
          </p>
          <ul>
            <li>Meet legal obligations, such as providing information to UNIFAST, CHED, and the Commission on Audit</li>
            <li>Establish or defend legal claims</li>
            <li>Comply with its obligations to the UP Alumni Association</li>
            <li>Serve historical, statistical, and scientific purposes, which the DPA allows to be stored for longer periods with adequate safeguards (Section 11(f))</li>
          </ul>
          <h3>Research using student data</h3>
          <p>
            As a research university, UP studies stored, de-identified student
            data to produce general demographic information and statistics
            over time. This helps UP check whether its policies improve access
            for disadvantaged students (Section 9 of RA 9500), follow the
            UniFAST Act (RA 10687) and RA 10931, and advise public authorities
            such as Congress, CHED, and the UniFAST Board.
          </p>
          <ul>
            <li>Authorized UP personnel remove identifiers first, so researchers can't link data back to you.</li>
            <li>Results include only aggregate or statistical data that doesn't identify you.</li>
            <li>Under NPC Memorandum Circular 2023-4, anonymized research that discloses only general demographics doesn't need your consent.</li>
            <li>If research uses <strong>identifiable</strong> data and the law or ethics rules require it, UP first obtains ethics clearance and your informed consent.</li>
          </ul>
        </details>
      </section>

      <section className="portal-card card-full" id="rfid">
        <details>
          <summary><h2>5. Your UP ID (RFID)</h2></summary>
          <p>
            UP uses your <strong>name, student number, and photograph</strong>{' '}
            to issue your RFID-enabled UP ID.
          </p>
          <dl>
            <dt>What the chip stores</dt>
            <dd>Only a unique, randomly generated number and your student number. That is all a compatible reader can read.</dd>
            <dt>When it is read</dt>
            <dd>When you tap or wave your ID near a reader.</dd>
            <dt>What it is used for</dt>
            <dd>
              <ul>
                <li>Regulating access to libraries and other University buildings</li>
                <li>RFID-enabled services in UP offices where available</li>
                <li>Benefits for qualified students under the UP Charter and internal rules</li>
              </ul>
            </dd>
          </dl>
          <p>
            <strong>Lost your ID?</strong> Report it right away to your
            University Registrar and the UP ITDC to prevent unauthorized use.
          </p>
        </details>
      </section>

      <section className="portal-card card-full" id="sharing">
        <details>
          <summary><h2>6. Who your data may be shared with</h2></summary>
          <p>
            UP shares your information only when required or allowed by law, or
            with your consent. UP takes reasonable steps to require recipients
            to respect your privacy.
          </p>
          <h3>When the law or UP's mandate requires it</h3>
          <ul>
            <li>Posting lists of students qualified to enroll and waitlisted applicants on bulletin boards, for transparency in admissions (as allowed by NPC Advisory Opinion 2018-20)</li>
            <li>Information required by the UNIFAST Board and the Commission on Higher Education (RA 10931 and RA 10687)</li>
            <li>Court orders and lawful processes from government and law enforcement agencies</li>
            <li>Disclosures that enable you to take licensure, board, or bar exams</li>
            <li>Emergencies, to prevent harm or injury to you or others</li>
            <li>Student elections (lists of candidates and results) and Board of Regents minutes on graduation, student discipline, and similar matters</li>
            <li>University rankings and similar exercises</li>
          </ul>
          <h3>For your benefit</h3>
          <ul>
            <li>Exchange programs, conferences, trainings, and academic or athletic competitions</li>
            <li>Scholarships, grants, and other assistance</li>
            <li>Civil Service eligibility for Latin honors (PD 907), and internships, employment, or other career opportunities</li>
            <li>Your parents, guardian, spouse, or next of kin, when required by law, in an emergency, or with your consent where consent is the proper basis</li>
          </ul>
          <h3>Recognition and publicity</h3>
          <ul>
            <li>Commencement programs and materials naming graduates, courses, and honors</li>
            <li>Honor societies and award-giving entities, with your consent</li>
            <li>Researchers conducting academic or non-commercial research, with your consent, so they can ask you to participate</li>
            <li>Articles about your achievements, awards, research, or public service, and responses to press inquiries</li>
            <li>Publishing, broadcasting, or live streaming University events</li>
          </ul>
          <p>The notice also covers other instances similar to those above.</p>
        </details>
      </section>

      <section className="portal-card card-full" id="protection">
        <details>
          <summary><h2>7. Risks and how UP protects your data</h2></summary>
          <p>
            Processing your data carries risks to its <strong>confidentiality,
            integrity, and availability</strong>, and the risk that your
            privacy rights could be violated. UP uses three kinds of
            safeguards:
          </p>
          <dl>
            <dt>Physical</dt>
            <dd>Access controls such as locks and security personnel.</dd>
            <dt>Organizational</dt>
            <dd>Only authorized personnel who have signed a non-disclosure undertaking, and who need the data for their work, may process it. UP also runs periodic privacy impact assessments.</dd>
            <dt>Technical</dt>
            <dd>Measures such as a content delivery network (CDN), encryption, multi-factor authentication for UP Mail and portals, and vulnerability and penetration testing.</dd>
          </dl>
          <p>
            <strong>No system is perfectly safe.</strong> These measures can't
            guarantee protection against targeted cyberattacks, malware,
            ransomware, or computer viruses. UP has procedures for security
            incidents and personal data breaches, set out in the UP Data
            Privacy Manual (2023 Edition), including incident and breach
            report forms and notifications to the National Privacy Commission
            and affected students.
          </p>
          <details>
            <summary>How you can keep your own data safe</summary>
            <ul>
              <li>Check whether the email account you use for UP portals has been compromised, for example with Have I Been Pwned.</li>
              <li>Use a strong password, and turn on two-factor authentication for your personal email if you don't have a UP email yet.</li>
              <li>Use your UP email account for UP portals and official communications.</li>
              <li>Don't submit personal data over public, unsecured networks. If you must, use a VPN.</li>
              <li>Keep all your UP account credentials, including your student number, confidential.</li>
            </ul>
          </details>
        </details>
      </section>

      <section className="portal-card card-full" id="rights">
        <details>
          <summary><h2>8. Your rights</h2></summary>
          <dl>
            <dt>Be informed</dt>
            <dd>Know how your data is processed, through this and other privacy notices.</dd>
            <dt>Access</dt>
            <dd>See the data UP holds about you through the systems you use, such as enrollment, online classes, and SLAS Online for financial assistance, or by requesting documents from the University Registrar or your College Secretary. Bring your UP ID or other proof of identity.</dd>
            <dt>Correct</dt>
            <dd>Ask for updates to wrong or outdated information through the relevant portal, website, or office. Correction of grades follows University rules and procedures.</dd>
            <dt>Object, suspend, block, or remove</dt>
            <dd>You may object to processing, or ask for your data to be suspended, withdrawn, blocked, removed, or destroyed. This has limits: much processing is needed for UP's mandate and legal requirements, or rests on a lawful basis other than consent.</dd>
            <dt>Damages</dt>
            <dd>Receive damages, under a valid decision, for inaccurate, incomplete, outdated, false, unlawfully obtained, or unauthorized use of your data.</dd>
            <dt>Complain</dt>
            <dd>File a complaint with the National Privacy Commission, but only after you first exhaust administrative remedies by filing a request with the proper office or a complaint with the DPO.</dd>
          </dl>
          <details>
            <summary>Requesting documents through a representative</summary>
            <p>You'll need to provide:</p>
            <ul>
              <li>A letter of authorization stating the information or document requested and its purpose</li>
              <li>Your UP ID or another valid government-issued ID</li>
              <li>A valid government-issued ID of your representative</li>
            </ul>
          </details>
        </details>
      </section>

      <section className="portal-card card-full" id="consent">
        <details>
          <summary><h2>9. Consent and how to withdraw it</h2></summary>
          <p>
            Where consent is UP's lawful basis for processing (Sections 12(a)
            and 13(a) of the DPA), UP asks you to complete the proper online
            form (for example on SLAS Online) or a paper form. If you are under
            18, your parent or guardian completes or signs the form, or the
            withdrawal letter.
          </p>
          <h3>To withdraw consent</h3>
          <ol>
            <li>Write or email the proper UP office.</li>
            <li>Name the processing activity you're withdrawing consent for.</li>
            <li>Attach a copy of your UP ID so your identity can be verified.</li>
            <li>Wait for the office's action on your request. Once it confirms the withdrawal, it takes effect.</li>
          </ol>
          <p>
            Consent can be withdrawn only for activities where consent is the
            <em> only </em> lawful basis. Processing under your student
            contract, or required by law, doesn't depend on consent.
          </p>
        </details>
      </section>

      <section className="portal-card card-full" id="contact">
        <details>
          <summary><h2>10. Contact the Data Protection Officer</h2></summary>
          <h3>UP Mindanao</h3>
          <address>
            Data Protection Officer, c/o Office of the Chancellor<br />
            University of the Philippines Mindanao<br />
            Barangay Mintal, Davao City 8022<br />
            Phone: (082) 293-0310<br />
            Email:{' '}
            <a href="mailto:dataprotection.upmindanao@up.edu.ph">
              dataprotection.upmindanao@up.edu.ph
            </a>
          </address>
          <details>
            <summary>Other UP campuses and the UP System</summary>
            <div className="table-responsive">
              <table className="table kaplag-table">
                <caption>UP Data Protection Officers</caption>
                <thead>
                  <tr>
                    <th scope="col">Office</th>
                    <th scope="col">Post</th>
                    <th scope="col">Phone</th>
                    <th scope="col">Email</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th scope="row">UP System</th>
                    <td>c/o the Office of the President, 2F North Wing Quezon Hall (Admin Building), University Avenue, UP Diliman, Quezon City 1101</td>
                    <td>(632) 89280110<br />(632) 89818500 loc. 2521</td>
                    <td><a href="mailto:dpo@up.edu.ph">dpo@up.edu.ph</a></td>
                  </tr>
                  <tr>
                    <th scope="row">UP Diliman</th>
                    <td>Lower Ground Floor, PHIVOLCS Building, C.P. Garcia Avenue, Diliman, Quezon City 1101</td>
                    <td>8255-3561</td>
                    <td><a href="mailto:dpo.updiliman@up.edu.ph">dpo.updiliman@up.edu.ph</a></td>
                  </tr>
                  <tr>
                    <th scope="row">UP Los Baños</th>
                    <td>Office of the University Registrar, G/F CAS Annex I Building, College 4031, Laguna</td>
                    <td>(049) 536-2553<br />(049) 536-2426</td>
                    <td><a href="mailto:dpo.uplb@up.edu.ph">dpo.uplb@up.edu.ph</a></td>
                  </tr>
                  <tr>
                    <th scope="row">UP Manila</th>
                    <td>3/F Information Technology Center, Joaquin Gonzales Compound, Padre Faura St., Ermita, Manila</td>
                    <td>+63 (2) 509-1003<br />(PGH) 554-8400</td>
                    <td><a href="mailto:dpo.upmanila@up.edu.ph">dpo.upmanila@up.edu.ph</a></td>
                  </tr>
                  <tr>
                    <th scope="row">UP Visayas</th>
                    <td>c/o Office of the University Registrar, New Administration Building, Miag-ao, Iloilo 5023</td>
                    <td>(033) 315-9631 or 315-9632<br />locals 191–192</td>
                    <td><a href="mailto:dpo.upvisayas@up.edu.ph">dpo.upvisayas@up.edu.ph</a></td>
                  </tr>
                  <tr>
                    <th scope="row">UP Open University</th>
                    <td>2/F UP Open University Main Building, Los Baños 4031, Laguna</td>
                    <td>(049) 536-6001 to 006<br />local 299</td>
                    <td><a href="mailto:dpo.upou@up.edu.ph">dpo.upou@up.edu.ph</a></td>
                  </tr>
                  <tr>
                    <th scope="row">UP Baguio</th>
                    <td>Office of the University Registrar, Gov. Pack Road, Baguio City 2600</td>
                    <td>+63 (74) 442-5592</td>
                    <td><a href="mailto:dpo.upbaguio@up.edu.ph">dpo.upbaguio@up.edu.ph</a></td>
                  </tr>
                  <tr>
                    <th scope="row">UP Cebu</th>
                    <td>Room 242, Arts and Science Building, UP Cebu Lahug Campus</td>
                    <td>+63 (32) 233-8203 loc. 202</td>
                    <td><a href="mailto:dpo.upcebu@up.edu.ph">dpo.upcebu@up.edu.ph</a></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </details>
          <p>For comments on this System-wide notice, contact the UP System DPO.</p>
        </details>
      </section>

      <section className="portal-card card-full">
        <h2>Confirmation</h2>
        <p>
          Confirm that you have read this notice. Any consent that UP needs
          from you for specific activities is collected separately through
          official UP consent forms.
        </p>
        <label className="read-confirmation">
          <input
            type="checkbox"
            checked={accepted}
            onChange={(event) => setAccepted(event.target.checked)}
          />
          I have read and understood the UP Privacy Notice for Students.
        </label>
        {accepted && (
          <p className="success-message" role="status">
            Thank you. Your confirmation has been recorded for this session.
          </p>
        )}
      </section>

      <section className="portal-card card-full">
        <p>
          Source:{' '}
          <a href="https://privacy.up.edu.ph/" target="_blank" rel="noreferrer">
            UP Privacy Policies
          </a>
          {' · '}
          <a
            href="https://ovpdx.up.edu.ph/wp-content/uploads/2025/03/policies_files_up-privacy-notice-for-students.pdf"
            target="_blank"
            rel="noreferrer"
          >
            Notice revised as of 1st Semester 2024–2025 (PDF)
          </a>
        </p>
        <p>This page summarizes the official notice. If anything differs, the official notice applies.</p>
      </section>
    </>
  );
};

export default Privacy;
