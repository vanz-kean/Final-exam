import { createContext, useContext, useState, useCallback, useEffect } from 'react';
import { autoTranslate } from '../utils/pageTranslator.js';

// English to Tagalog translation dictionary
export const translations = {
  // Header/Brand
  'KAPLAG': 'KAPLAG',
  'UP Mindanao · Student Portal': 'UP Mindanao · Portal ng Mag-aaral',

  // Navigation
  'Dashboard': 'Dashboard',
  'Class Schedule': 'Oras ng Klase',
  'School Calendar': 'Kalendaryo ng Paaralan',
  'Grades': 'Mga Grade',
  'Fees': 'Mga Bayarin',
  'Prospectus': 'Prospektus',
  'Announcements': 'Mga Anunsiyo',
  'UP Mail': 'UP Mail',
  'Student Information': 'Impormasyon ng Mag-aaral',
  'Evaluations': 'Mga Pagsusuri',
  'Campus Facility & Safety': 'Pasilidad ng Kampus & Kaligtasan',
  'College Facility & Safety': 'Pasilidad ng Kolehiyo & Kaligtasan',
  'Student Housing': 'Tahanan ng Mag-aaral',
  'Privacy': 'Privado',
  'Logout': 'Mag-logout',

  // Common UI
  'Loading...': 'Naglo-load...',
  'Error': 'Error',
  'Save': 'Save',
  'Cancel': 'Kanselahin',
  'Submit': 'Isumite',
  'Confirm': 'Kumpirmahin',
  'Close': 'Isara',
  'Back': 'Bumalik',
  'Next': 'Susunod',
  'Previous': 'Nakaraan',
  'Search': 'Maghanap',
  'Filter': 'Filter',
  'Clear': 'Linisin',
  'Apply': 'I-apply',
  'Edit': 'I-edit',
  'Delete': 'Burahin',
  'View': 'Tingnan',
  'Add': 'Dagdag',
  'Create': 'Lumikha',
  'Update': 'I-update',
  'Remove': 'Tanggalin',
  'Yes': 'Oo',
  'No': 'Hindi',
  'OK': 'OK',
  'Continue': 'Patuloy',
  'Saving...': 'Nagse-save...',
  'Saved': 'Na-save',

  // Dashboard
  'Welcome back': 'Welcome back',
  'Good morning': 'Magandang umaga',
  'Good afternoon': 'Magandang hapon',
  'Good evening': 'Magandang gabi',
  'Student': 'Mag-aaral',
  'Program': 'Programa',
  'Year Level': 'Taon',
  'Student Number': 'Numero ng Mag-aaral',
  'Quick Links': 'Mga Quick Link',
  'Notifications': 'Mga Notipikasyon',
  'No notifications': 'Walang notipikasyon',
  'View all': 'Tingnan lahat',
  'Up Next': 'Susunod',
  'No upcoming items': 'Walang darating na items',
  'No announcements': 'Walang anunsiyo',
  'Progress': 'Progreso',
  'Completion': 'Pagkumpleto',
  "Today's classes": "Mga klase ngayon",
  'Day of the week': 'Araw ng linggo',
  'Up next:': 'Susunod:',
  'View full schedule': 'Tingnan ang buong schedule',
  'Needs your attention': 'Kailangan ang iyong pansin',
  'Tuition fee payment': 'Bayad sa tuition',
  '10 days left': '10 na araw na lang',
  'View fees': 'Tingnan ang bayarin',
  'INC grade completion deadline': 'Deadline ng pagkumpleto ng INC grade',
  'LOA application deadline': 'Deadline ng aplikasyon sa LOA',
  'View all announcements': 'Tingnan ang lahat ng anunsiyo',
  'Completion of Degree': 'Pagkumpleto ng Degree',
  'Current GWA': 'Kasalukuyang GWA',
  'Units enrolled': 'Naka-enroll na yunit',
  'Degree progress': 'Progreso ng degree',

  // Login
  'Login': 'Login',
  'Sign in to your account': 'Mag-sign in sa iyong account',
  'Username': 'Username',
  'Password': 'Password',
  'Remember me': 'Tandaan ako',
  'Forgot password?': 'Nakalimutan ang password?',
  'Sign in': 'Mag-sign in',
  'Or continue with': 'O magpatuloy sa',
  'Google': 'Google',
  'Don\'t have an account?': 'Walang account?',
  'Register': 'Magrehistro',
  'Student Portal': 'Portal ng Mag-aaral',
  'Sign in to access the student directory': 'Mag-sign in upang ma-access ang directory ng mag-aaral',
  'Student number': 'Numero ng mag-aaral',
  'Your UP student number (format: YYYY-NNNNN)': 'Iyong UP student number (format: YYYY-NNNNN)',
  'Enter password': 'Ilagay ang password',
  'Signing in...': 'Nag-sign in...',
  'Continue with Google': 'Magpatuloy sa Google',
  'Loading Google Sign-In...': 'Naglo-load ang Google Sign-In...',
  'Demo account': 'Demo account',
  'Student no:': 'Student no.:',
  'Password:': 'Password:',
  'Autofill': 'Auto-fill',
  'Privacy Notice': 'Privacy Notice',
  '© 2026 University of the Philippines Mindanao': '© 2026 Unibersidad ng Pilipinas Mindanao',

  // Registration
  'Course Registration': 'Rehistro sa Kurso',
  'Term': 'Term',
  'Select Term': 'Pumili ng Term',
  'Available Blocks': 'Available na Blocks',
  'Selected Blocks': 'Piniling Blocks',
  'Schedule': 'Schedule',
  'Action': 'Aksyon',
  'Add to Schedule': 'Idagdag sa Schedule',
  'Remove from Schedule': 'Tanggalin sa Schedule',
  'Confirm Registration': 'Kumpirmahin ang Rehistro',
  'Registration Summary': 'Buod ng Rehistro',
  'Total Units': 'Kabuuang Yunit',
  'Submit Registration': 'Isumite ang Rehistro',
  'Registration Successful': 'Matagumpay ang Rehistro',
  'Registration Failed': 'Nabigo ang Rehistro',
  'Registration': 'Rehistro',
  'Registration complete': 'Kumpleto na ang rehistro',
  'Registration summary': 'Buod ng rehistro',
  'Saved for this session': 'Na-save para sa session na ito',
  'Student information': 'Impormasyon ng mag-aaral',
  'Name': 'Pangalan',
  'Enlisted schedules': 'Nailistang schedule',
  'These are the block courses and sections you selected.': 'Ito ang mga block courses at sections na iyong pinili.',
  'Type': 'Uri',
  'Day(s)': 'Araw',
  'Time': 'Oras',
  'This prototype stores your selections in this browser session only. It does not submit an official UP registration.': 'Ang prototipong ito ay nag-iimbak lamang sa browser session na ito. Hindi ito nagsu-submit ng opisyal na UP registration.',
  'Change selections': 'Baguhin ang mga pinili',
  '1. Choose your block': '1. Pumili ng iyong block',
  'Compare the available block schedules below. Only blocks for your year level are shown.': 'Ihambing ang available na block schedules sa ibaba. Ipinapakita lamang ang mga block para sa iyong year level.',
  'Selected': 'Pinili',
  'Second semester': 'Ikalawang semestre',
  'No block schedules have been added for': 'Walang dagdag na block schedules para sa',
  'yet.': 'pa.',
  'The reference provided includes complete schedules for 1BSCS-A and 1BSCS-B. Other block schedules can be added when their details are available.': 'Ang reference na ibinigay ay may kumpletong schedule para sa 1BSCS-A at 1BSCS-B. Maaaring idagdag ang ibang block schedules kapag available na ang detalye.',
  '2. Choose a PE section': '2. Pumili ng PE section',
  'PE means Physical Education. Only sections with available seats that do not overlap your selected block schedule are listed.': 'Ang PE ay nangangahulugang Physical Education. Nakalista lamang ang mga section na may available na upuan at hindi nag-ooverlap sa iyong piniling block schedule.',
  'Activity names appear in parentheses to clarify the PE course codes.': 'Ang mga pangalan ng activity ay nasa parenthesis upang malinaw ang PE course codes.',
  'Select a block above to see compatible PE sections.': 'Pumili ng block sa itaas upang makita ang compatible na PE sections.',
  'No open PE sections fit this block schedule.': 'Walang bukas na PE section na bagay sa block schedule na ito.',
  'Choose': 'Piliin',
  'Seats left': 'Natitirang upuan',
  'Seat counts are copied from the supplied schedule screenshot and are not live enrollment data.': 'Ang bilang ng upuan ay kinuha sa screenshot ng schedule at hindi live enrollment data.',
  '3. NSTP section': '3. NSTP section',
  'NSTP registration is available to first-year students only.': 'Ang NSTP registration ay para sa first-year students lamang.',
  'NSTP schedule selection is only available to first-year students.': 'Ang NSTP schedule selection ay para sa first-year students lamang.',
  'Review your choices before the final confirmation.': 'Suriiin ang iyong mga pinili bago ang huling kumpirmasyon.',
  'Review and confirm': 'Suriiin at kumpirmahin',
  'Final review': 'Huling pagsusuri',
  'Confirm your registration choices': 'Kumpirmahin ang iyong mga pinili sa rehistro',
  'Check your selected sections before saving.': 'Suriin ang iyong piniling sections bago i-save.',
  'PE section': 'PE section',
  'NSTP section': 'NSTP section',
  'Confirming saves these choices in this browser session only; it does not submit an official UP registration.': 'Ang pagkumpirma ay nag-i-save lamang sa browser session na ito; hindi ito nagsu-submit ng opisyal na UP registration.',
  'Back to choices': 'Bumalik sa mga pinili',
  'Confirm and save': 'Kumpirmahin at i-save',

  // Grades
  'Grades Overview': 'Panoraman ng Mga Grade',
  'Term GWA': 'Term GWA',
  'Cumulative GWA': 'Kumulatibong GWA',
  'Subject': 'Assignatura',
  'Grade': 'Grade',
  'Status': 'Status',
  'Incomplete': 'Incomplete',
  'Passed': 'Passed',
  'Failed': 'Failed',
  'Currently Enrolled': 'Kasalukuyang Nagrerehistro',
  'No grades available': 'Walang available na grades',
  'Choose a year and semester to see the grades for that term.': 'Pumili ng taon at semestre upang makita ang mga grade para sa term na iyon.',
  'Your grade summary': 'Iyong grade summary',
  'General weighted average': 'General weighted average',
  'Completed units': 'Kumpletong yunit',
  'Incomplete grades': 'Incomplete na grade',
  'Find grades': 'Humanap ng grades',
  'All years': 'Lahat ng taon',
  'First Year': 'Unang Taon',
  'Second Year': 'Ikalawang Taon',
  'Third Year': 'Ikatlong Taon',
  'Fourth Year': 'Ikaapat na Taon',
  'All semesters': 'Lahat ng semestre',
  'First Semester': 'Unang Semestre',
  'Second Semester': 'Ikalawang Semestre',
  'Summer': 'Summer',
  'No grades posted yet': 'Walang na-post na grades pa',
  'There are no completed courses or grades available for this term.': 'Walang natapos na kurso o available na grades para sa term na ito.',
  'Removal': 'Removal',
  'No matching term': 'Walang tumutugmang term',
  'Choose another year or semester to see grades.': 'Pumili ng ibang taon o semestre upang makita ang mga grade.',
  'How to read your grades': 'Paano basahin ang iyong mga grade',
  'Passing grade': 'Passing grade',
  'Conditional grade; may need a removal exam': 'Conditional grade; maaaring kailangan ng removal exam',
  'Failed grade': 'Failed grade',
  'Incomplete; course work still needs to be finished': 'Incomplete; kailangan pa ring tapusin ang course work',

  // Prospectus
  'Course Code': 'Kurso Code',
  'Course Title': 'Pamagat ng Kurso',
  'Prerequisite': 'Prerequisite',
  'Corequisite': 'Corequisite',
  'Your course checklist for the whole program, term by term.': 'Ang iyong course checklist para sa buong programa, term per term.',
  'Filter courses': 'I-filter ang mga kurso',
  'Search courses': 'Maghanap ng kurso',
  'Course code or prerequisite': 'Course code o prerequisite',
  'Filter by status': 'I-filter ayon sa status',
  'All courses': 'Lahat ng kurso',
  'Not yet taken': 'Hindi pa nakuha',

  // Privacy
  'Privacy Policy': 'Patakaran sa Privacy',
  'Data Collection': 'Pagkokolekta ng Data',
  'Data Usage': 'Paggamit ng Data',
  'Data Sharing': 'Pagbabahagi ng Data',
  'Your Rights': 'Iyong Karapatan',
  'Contact Us': 'Makipag-ugnayan sa Amin',

  // Footer
  'University of the Philippines Mindanao': 'Unibersidad ng Pilipinas Mindanao',
  'All rights reserved': 'Lahat ng karapatan nakalaan',

  // Form labels
  'First Name': 'Unang Pangalan',
  'Last Name': 'Apelyido',
  'Middle Name': 'Gitnang Pangalan',
  'Email': 'Email',
  'Phone': 'Telepono',
  'Address': 'Address',
  'Birthday': 'Kaarawan',
  'Gender': 'Kasarian',
  'Male': 'Lalaki',
  'Female': 'Babae',
  'Other': 'Iba pa',

  // Messages
  'Are you sure?': 'Sigurado ka ba?',
  'This action cannot be undone': 'Hindi maaaring i-undo ang aksiyong ito',
  'Successfully saved': 'Matagumpay na na-save',
  'Something went wrong': 'May nagkamali',
  'Please try again': 'Pakisubukan muli',
  'Session expired': 'Nag-expire ang session',
  'Please log in again': 'Pakilog in muli',

  // Privacy
  'UP Privacy Notice for Students': 'UP Privacy Notice para sa mga Mag-aaral',
  "The short version": "Ang maikling bersyon",
  "Don't have time to read it all? Here's what matters.": "Walang oras na basahin ang lahat? Narito ang mahalaga.",
  'Why UP has your data:': 'Bakit may data ka sa UP:',
  'to enroll you, teach and grade you, serve you, keep campus safe, and follow the law.': 'upang i-enroll ka, turuan at bigyan ng grade, paglingkuran, panatilihin ang kaligtasan ng kampus, at sundin ang batas.',
  'The legal basis:': 'Ang legal na basehan:',
  'when you enroll and sign the UP student pledge, you enter a contract with UP. Most data processing for your education rests on that contract, so UP doesn\'t need new consent each time.': 'kapag nag-enroll ka at pumirma ng UP student pledge, nagkakaroon ka ng kontrata sa UP. Ang karamihan sa data processing para sa iyong edukasyon ay nakabase sa kontratang iyon, kaya hindi na kailangan ng UP na humingi ng bagong consent bawat beses.',
  'The law behind it:': 'Ang batas sa likod nito:',
  'the Philippine Data Privacy Act of 2012 (DPA).': 'ang Philippine Data Privacy Act of 2012 (DPA).',
  'Who sees it:': 'Sino ang nakakakita nito:',
  'authorized UP personnel who need it for their work, plus outside parties when the law requires it or you consent.': 'awtorisadong personnel ng UP na kailangan ito para sa kanilang trabaho, pati na rin mga outside parties kapag kinakailangan ng batas o nagbigay ka ng consent.',
  'Your rights:': 'Iyong karapatan:',
  'you can see and correct your data, and in some cases object to processing or withdraw consent.': 'maaari mong makita at i-correct ang iyong data, at sa ilang kaso ay maaaring i-object ang processing o i-withdraw ang consent.',
  'Questions?': 'Mga tanong?',
  'Contact the UP Mindanao Data Protection Officer in the': 'Makipag-ugnayan sa UP Mindanao Data Protection Officer sa',
  'contact section': 'contact section',
  'Jump to a section': 'Tumalon sa isang section',
  'What this notice is about': 'Tungkol sa anong notice na ito',
  'Why UP can process your data': 'Bakit maaaring i-process ng UP ang iyong data',
  'What UP collects, and why': 'Ano ang kinokolekta ng UP, at bakit',
  'Storage and research': 'Storage at research',
  'Your UP ID (RFID)': 'Iyong UP ID (RFID)',
  'Who your data may be shared with': 'Sino ang maaaring makabahagi ng iyong data',
  'Risks and how UP protects your data': 'Mga panganib at paano pinoprotektahan ng UP ang iyong data',
  'Your rights': 'Iyong karapatan',
  'Consent and how to withdraw it': 'Consent at paano i-withdraw ito',
  'Contact the Data Protection Officer': 'Makipag-ugnayan sa Data Protection Officer',
  'Confirmation': 'Kumpirmasyon',
  'Confirm that you have read this notice. Any consent that UP needs from you for specific activities is collected separately through official UP consent forms.': 'Kumpirmahin na binasa mo ang notice na ito. Ang anumang consent na kailangan ng UP mula sa iyo para sa partikular na aktibidad ay kinokolekta nang hiwalay sa pamamagitan ng opisyal na UP consent forms.',
  'I have read and understood the UP Privacy Notice for Students.': 'Binasa ko na at naunawaan ang UP Privacy Notice para sa mga Mag-aaral.',
  'Thank you. Your confirmation has been recorded for this session.': 'Salamat. Ang iyong kumpirmasyon ay naitala na para sa session na ito.',
  'Source:': 'Pinagmulan:',
  'UP Privacy Policies': 'UP Privacy Policies',
  'Notice revised as of 1st Semester 2024–2025 (PDF)': 'Notice na na-revise noong 1st Semester 2024–2025 (PDF)',
  'This page summarizes the official notice. If anything differs, the official notice applies.': 'Ang pahinang ito ay nagbubuo ng opisyal na notice. Kung may mga pagkakaiba, ang opisyal na notice ang susundin.',
  'This page is under development.': 'Ang pahinang ito ay sa ilalim pa ng pag-unlad.',
  'Back to dashboard': 'Bumalik sa dashboard',
};

const TranslationContext = createContext(null);

export const TranslationProvider = ({ children }) => {
  const [language, setLanguage] = useState(() => {
    // Check localStorage for saved preference
    const saved = localStorage.getItem('kaplag-language');
    return saved || 'en';
  });

  const [isTranslating, setIsTranslating] = useState(false);

  useEffect(() => {
    localStorage.setItem('kaplag-language', language);
    // Apply translation to document title if needed
    document.documentElement.lang = language === 'tl' ? 'tl' : 'en';
    // Auto-translate the page content
    setIsTranslating(true);
    // Small delay to allow React to render first
    const timer = setTimeout(() => {
      autoTranslate(language, document.getElementById('main-content') || document.body);
      setIsTranslating(false);
    }, 100);
    return () => clearTimeout(timer);
  }, [language]);

  const toggleLanguage = useCallback(() => {
    setLanguage(prev => prev === 'en' ? 'tl' : 'en');
  }, []);

  const translate = useCallback((text) => {
    if (language === 'en') return text;
    return translations[text] || text;
  }, [language]);

  const translateAll = useCallback((texts) => {
    if (language === 'en') return texts;
    return texts.map(text => translations[text] || text);
  }, [language]);

  const value = {
    language,
    isTranslating,
    toggleLanguage,
    translate,
    translateAll,
    setLanguage,
  };

  return (
    <TranslationContext.Provider value={value}>
      {children}
    </TranslationContext.Provider>
  );
};

export const useTranslation = () => {
  const context = useContext(TranslationContext);
  if (!context) {
    throw new Error('useTranslation must be used within a TranslationProvider');
  }
  return context;
};

// Helper component to translate text nodes
export const Translate = ({ children }) => {
  const { translate } = useTranslation();
  const text = typeof children === 'string' ? children : '';
  return translate(text);
};

export default TranslationContext;