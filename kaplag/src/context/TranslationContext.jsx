import { createContext, useContext, useState, useCallback, useEffect } from 'react';
import { autoTranslate } from '../utils/pageTranslator.js';

// English to Tagalog translation dictionary - Natural, conversational Filipino
export const translations = {
  // Header/Brand
  'KAPLAG': 'KAPLAG',
  'UP Mindanao · Student Portal': 'UP Mindanao · Portal para sa Mag-aaral',

  // Navigation
  'Dashboard': 'Dashboard',
  'Class Schedule': 'Schedule ng klase',
  'School Calendar': 'Kalendaryo ng paaralan',
  'Grades': 'Grades',
  'Fees': 'Bayarin',
  'Prospectus': 'Prospektus',
  'Announcements': 'Anunsiyo',
  'UP Mail': 'UP Mail',
  'Student Information': 'Impormasyon ng estudyante',
  'Evaluations': 'Evaluation',
  'Campus Facility & Safety': 'Pasilidad ng kampus & kaligtasan',
  'College Facility & Safety': 'Pasilidad ng kolehiyo & kaligtasan',
  'Student Housing': 'Tirahan ng estudyante',
  'Privacy': 'Privacy',
  'Logout': 'Log out',

  // Common UI
  'Loading...': 'Naglo-load...',
  'Error': 'Error',
  'Save': 'Save',
  'Cancel': 'Kanselahin',
  'Submit': 'I-submit',
  'Confirm': 'Kumpirmahin',
  'Close': 'Sara',
  'Back': 'Balik',
  'Next': 'Susunod',
  'Previous': 'Nakaraan',
  'Search': 'Hanapin',
  'Filter': 'Filter',
  'Clear': 'Linisin',
  'Apply': 'Apply',
  'Edit': 'Edit',
  'Delete': 'Burahin',
  'View': 'Tignan',
  'Add': 'Dagdag',
  'Create': 'Gawin',
  'Update': 'I-update',
  'Remove': 'Tanggalin',
  'Yes': 'Oo',
  'No': 'Hindi',
  'OK': 'OK',
  'Continue': 'Tuloy',
  'Saving...': 'Nagse-save...',
  'Saved': 'Na-save na',
  'Open': 'Buksan',
  'Select': 'Piliin',
  'Optional': 'Optional',
  'Required': 'Required',

  // Dashboard
  'Welcome back': 'Welcome back',
  'Good morning': 'Magandang umaga',
  'Good afternoon': 'Magandang hapon',
  'Good evening': 'Magandang gabi',
  'Student': 'Estudyante',
  'Program': 'Programa',
  'Year Level': 'Taon',
  'Student Number': 'Student Number',
  'Quick Links': 'Mga Quick Link',
  'Notifications': 'Notipikasyon',
  'No notifications': 'Walang notipikasyon',
  'View all': 'Tignan lahat',
  'Up Next': 'Susunod',
  'No upcoming items': 'Walang darating',
  'No announcements': 'Walang anunsiyo',
  'Progress': 'Progreso',
  'Completion': 'Pagkumpleto',
  "Today's classes": "Klase ngayon",
  'Day of the week': 'Araw',
  'Up next:': 'Susunod:',
  'View full schedule': 'Tignan buong schedule',
  'Needs your attention': 'Kailangan ng pansin',
  'Tuition fee payment': 'Bayad sa tuition',
  '10 days left': '10 araw na lang',
  'View fees': 'Tignan bayarin',
  'INC grade completion deadline': 'Deadline ng INC grade',
  'LOA application deadline': 'Deadline ng LOA application',
  'View all announcements': 'Tignan lahat ng anunsiyo',
  'Completion of Degree': 'Pagtapus ng Degree',
  'Current GWA': 'GWA ngayon',
  'Units enrolled': 'Units na naka-enroll',
  'Degree progress': 'Progreso ng degree',
  'Your term at a glance — classes, deadlines, and announcements.': 'Term mo sa isang tingin — klase, deadline, at anunsiyo.',
  'Dashboard shortcuts': 'Mga shortcut sa Dashboard',
  'No classes today': 'Walang klase ngayon',
  'Upcoming deadlines': 'Darating na deadline',
  'Recent announcements': 'Latest anunsiyo',

  // Login
  'Login': 'Login',
  'Sign in to your account': 'Mag-sign in sa account mo',
  'Username': 'Username',
  'Password': 'Password',
  'Remember me': 'Tandaan ako',
  'Forgot password?': 'Nakalimutan password?',
  'Sign in': 'Sign in',
  'Or continue with': 'O tuloy sa',
  'Google': 'Google',
  "Don't have an account?": 'Walang account?',
  'Register': 'Mag-rehistro',
  'Student Portal': 'Portal ng estudyante',
  'Sign in to access the student directory': 'Sign in para ma-access ang directory',
  'Student number': 'Student number',
  'Your UP student number (format: YYYY-NNNNN)': 'Iyong UP student number (format: YYYY-NNNNN)',
  'Enter password': 'Lagay password',
  'Signing in...': 'Nag-sign in...',
  'Continue with Google': 'Tuloy sa Google',
  'Loading Google Sign-In...': 'Naglo-load Google Sign-In...',
  'Demo account': 'Demo account',
  'Student no:': 'Student no.:',
  'Password:': 'Password:',
  'Autofill': 'Auto-fill',
  'Privacy Notice': 'Privacy Notice',
  '© 2026 University of the Philippines Mindanao': '© 2026 Unibersidad ng Pilipinas Mindanao',
  'University of the Philippines Mindanao': 'Unibersidad ng Pilipinas Mindanao',
  'Invalid credentials': 'Maling credentials',
  'Account not found': 'Account hindi mahanap',
  'Fill in all fields': 'Punan lahat ng fields',

  // Registration
  'Course Registration': 'Rehistro sa kurso',
  'Term': 'Term',
  'Select Term': 'Piliin ang term',
  'Available Blocks': 'Available na blocks',
  'Selected Blocks': 'Piniling blocks',
  'Schedule': 'Schedule',
  'Action': 'Aksyon',
  'Add to Schedule': 'Idagdag sa schedule',
  'Remove from Schedule': 'Tanggalin sa schedule',
  'Confirm Registration': 'Kumpirmahin rehistro',
  'Registration Summary': 'Buod ng rehistro',
  'Total Units': 'Kabuuan ng units',
  'Submit Registration': 'I-submit rehistro',
  'Registration Successful': 'OK ang rehistro',
  'Registration Failed': 'Failed ang rehistro',
  'Registration': 'Rehistro',
  'Registration complete': 'Tapos na rehistro',
  'Registration summary': 'Buod ng rehistro',
  'Saved for this session': 'Na-save para sa session na ito',
  'Student information': 'Impormasyon ng estudyante',
  'Name': 'Pangalan',
  'Enlisted schedules': 'Naka-list na schedule',
  'These are the block courses and sections you selected.': 'Ito ang block courses at sections na pili mo.',
  'Type': 'Type',
  'Day(s)': 'Araw',
  'Time': 'Oras',
  'This prototype stores your selections in this browser session only. It does not submit an official UP registration.': 'Ito ay prototype lang. Na-save lang dito sa browser, hindi opisyal na UP registration.',
  'Change selections': 'Baguhin pili',
  '1. Choose your block': '1. Piliin ang block mo',
  'Compare the available block schedules below. Only blocks for your year level are shown.': 'Ihambing schedules sa baba. Para sa iyong year level lang.',
  'Selected': 'Pili na',
  'Second semester': '2nd Semester',
  'No block schedules have been added for': 'Walang block schedule para sa',
  'yet.': 'pa.',
  'The reference provided includes complete schedules for 1BSCS-A and 1BSCS-B. Other block schedules can be added when their details are available.': 'May complete schedule na 1BSCS-A at 1BSCS-B. Pwede dagdagan kapag ready na.',
  '2. Choose a PE section': '2. Piliin PE section',
  'PE means Physical Education. Only sections with available seats that do not overlap your selected block schedule are listed.': 'PE = Physical Education. Nakalista lang available na hindi nag-overlap sa block mo.',
  'Activity names appear in parentheses to clarify the PE course codes.': 'Activities nasa parenthesis para malinaw PE code.',
  'Select a block above to see compatible PE sections.': 'Pili block sa taas para makita PE sections.',
  'No open PE sections fit this block schedule.': 'Walang PE section na bagay sa block na ito.',
  'Choose': 'Piliin',
  'Seats left': 'Slot na natitira',
  'Seat counts are copied from the supplied schedule screenshot and are not live enrollment data.': 'Bilang ng slot galing sa screenshot, hindi live data.',
  '3. NSTP section': '3. NSTP section',
  'NSTP registration is available to first-year students only.': 'NSTP para sa 1st year lang.',
  'NSTP schedule selection is only available to first-year students.': 'NSTP schedule selection para 1st year lang.',
  'Review your choices before the final confirmation.': 'Check choices bago kumpirmahin.',
  'Review and confirm': 'Check at kumpirmahin',
  'Final review': 'Final check',
  'Confirm your registration choices': 'Kumpirmahin pili mo sa rehistro',
  'Check your selected sections before saving.': 'Check sections bago i-save.',
  'PE section': 'PE section',
  'NSTP section': 'NSTP section',
  'Confirming saves these choices in this browser session only; it does not submit an official UP registration.': 'Kumpirmahin = save dito sa browser lang, hindi opisyal na UP registration.',
  'Back to choices': 'Balik sa pili',
  'Confirm and save': 'Kumpirmahin at i-save',
  'Choose your block, then select PE and NSTP sections that fit your schedule.': 'Piliin block mo, tapos PE at NSTP na bagay sa schedule.',
  'Block section': 'Block Section',
  'Section': 'Section',
  'No schedule conflict': 'Walang schedule conflict',
  'Schedule conflict detected': 'May schedule conflict',
  'Maximum units exceeded': 'Sobra sa max units',

  // Grades
  'Grades Overview': 'Grades Overview',
  'Term GWA': 'Term GWA',
  'Cumulative GWA': 'Cumulative GWA',
  'Subject': 'Subject',
  'Grade': 'Grade',
  'Status': 'Status',
  'Incomplete': 'Incomplete',
  'Passed': 'Passed',
  'Failed': 'Failed',
  'Currently Enrolled': 'Naka-enroll pa',
  'No grades available': 'Walang grades',
  'Choose a year and semester to see the grades for that term.': 'Pili year at semestre para makita grades.',
  'Your grade summary': 'Grade summary mo',
  'General weighted average': 'General Weighted Average',
  'Completed units': 'Tapos na units',
  'Incomplete grades': 'Incomplete grades',
  'Find grades': 'Hanapin grades',
  'All years': 'Lahat ng taon',
  'First Year': '1st Year',
  'Second Year': '2nd Year',
  'Third Year': '3rd Year',
  'Fourth Year': '4th Year',
  'All semesters': 'Lahat ng semestre',
  'First Semester': '1st Semester',
  'Second Semester': '2nd Semester',
  'Summer': 'Summer',
  'No grades posted yet': 'Walang grades pa',
  'There are no completed courses or grades available for this term.': 'Walang tapos na kurso o grades dito.',
  'Removal': 'Removal',
  'No matching term': 'Walang term na tugma',
  'Choose another year or semester to see grades.': 'Pili ibang year o semestre.',
  'How to read your grades': 'Paano basahin grades',
  'Passing grade': 'Passing grade (1.00-3.00)',
  'Conditional grade; may need a removal exam': 'Conditional (4.00) - may removal exam',
  'Failed grade': 'Failed (5.00)',
  'Incomplete; course work still needs to be finished': 'Incomplete - kelangan pa tapusin',
  'Course': 'Course',
  'Units': 'Units',
  'Semester': 'Semestre',
  'Year': 'Taon',
  'Curriculum': 'Curriculum',
  'No grades for this term': 'Walang grades para sa term na ito',
  'Select a term to view grades': 'Pili term para makita grades',
  'Grade legend': 'Grade legend',

  // Prospectus
  'Course Code': 'Course Code',
  'Course Title': 'Course Title',
  'Prerequisite': 'Prerequisite',
  'Corequisite': 'Corequisite',
  'Your course checklist for the whole program, term by term.': 'Checklist ng kurso mo per term.',
  'Filter courses': 'Filter kurso',
  'Search courses': 'Hanapin kurso',
  'Course code or prerequisite': 'Course code o prerequisite',
  'Filter by status': 'Filter by status',
  'All courses': 'Lahat ng kurso',
  'Not yet taken': 'Hindi pa nakuha',
  'Taken': 'Nakuha na',
  'In progress': 'Ongoing',
  'Year level': 'Year level',

  // Privacy
  'Privacy Policy': 'Privacy Policy',
  'Data Collection': 'Pagkokolekta ng data',
  'Data Usage': 'Paggamit ng data',
  'Data Sharing': 'Pagbabahagi ng data',
  'Your Rights': 'Karapatan mo',
  'Contact Us': 'Contact Us',

  // Footer
  'All rights reserved': 'Lahat ng karapatan naka-reserve',

  // Form labels
  'First Name': 'First Name',
  'Last Name': 'Last Name',
  'Middle Name': 'Middle Name',
  'Email': 'Email',
  'Phone': 'Phone',
  'Address': 'Address',
  'Birthday': 'Birthday',
  'Gender': 'Gender',
  'Male': 'Male',
  'Female': 'Female',
  'Other': 'Iba pa',

  // Messages
  'Are you sure?': 'Sure ka ba?',
  'This action cannot be undone': 'Hindi pwedeng i-undo to.',
  'Successfully saved': 'Na-save na.',
  'Something went wrong': 'May error.',
  'Please try again': 'Subukan ulit.',
  'Session expired': 'Expired na session.',
  'Please log in again': 'Log in ulit.',

  // Privacy Notice - Natural Filipino
  'UP Privacy Notice for Students': 'UP Privacy Notice para sa mga Estudyante',
  "The short version": "Maikling bersyon",
  "Don't have time to read it all? Here's what matters.": "Walang oras basahin lahat? Ito ang importante.",
  'Why UP has your data:': 'Bakit may data ka sa UP:',
  'to enroll you, teach and grade you, serve you, keep campus safe, and follow the law.': 'para i-enroll, turuan, bigyan grade, serbisyohan, ligtas campus, sundin batas.',
  'The legal basis:': 'Legal basis:',
  'when you enroll and sign the UP student pledge, you enter a contract with UP. Most data processing for your education rests on that contract, so UP doesn\'t need new consent each time.': 'pag enroll ka at pumirma ng pledge, may contract na kayo. Data processing para sa education nasa contract na, di na kailangan ng bagong consent.',
  'The law behind it:': 'Batas sa likod:',
  'the Philippine Data Privacy Act of 2012 (DPA).': 'Data Privacy Act 2012 (DPA).',
  'Who sees it:': 'Sino nakakakita:',
  'authorized UP personnel who need it for their work, plus outside parties when the law requires it or you consent.': 'awtorisadong UP personnel + outside parties kung kailangan ng batas o nag-consent ka.',
  'Your rights:': 'Karapatan mo:',
  'you can see and correct your data, and in some cases object to processing or withdraw consent.': 'pwede mo makita, i-correct data. Pwede i-object o i-withdraw consent.',
  'Questions?': 'Tanong?',
  'Contact the UP Mindanao Data Protection Officer in the': 'Contact UP Mindanao DPO sa',
  'contact section': 'contact section',
  'Jump to a section': 'Punta sa section',
  'What this notice is about': 'Tungkol dito ang notice',
  'Why UP can process your data': 'Bakit pwede i-process data mo',
  'What UP collects, and why': 'Ano kinokolekta UP at bakit',
  'Storage and research': 'Storage at research',
  'Your UP ID (RFID)': 'UP ID mo (RFID)',
  'Who your data may be shared with': 'Sino pwede makabahagi data mo',
  'Risks and how UP protects your data': 'Risks at paano pinoprotektahan data mo',
  'Your rights': 'Karapatan mo',
  'Consent and how to withdraw it': 'Consent at paano i-withdraw',
  'Contact the Data Protection Officer': 'Contact DPO',
  'Confirmation': 'Kumpirmasyon',
  'Confirm that you have read this notice. Any consent that UP needs from you for specific activities is collected separately through official UP consent forms.': 'Kumpirmahin na binasa mo. Ibang consent forms para sa ibang activities.',
  'I have read and understood the UP Privacy Notice for Students.': 'Binasa ko at naunawaan.',
  'Thank you. Your confirmation has been recorded for this session.': 'Salamat. Na-record na.',
  'Source:': 'Source:',
  'UP Privacy Policies': 'UP Privacy Policies',
  'Notice revised as of 1st Semester 2024–2025 (PDF)': 'Revised 1st Sem 2024–2025 (PDF)',
  'This page summarizes the official notice. If anything differs, the official notice applies.': 'Summary lang ito. Official notice ang susundin.',
  'This page is under development.': 'Under development pa.',
  'Back to dashboard': 'Balik sa dashboard',

  // UI components
  'Close navigation': 'Sara navigation',
  'More': 'More',
  'Quick navigation': 'Quick navigation',
  'Open navigation': 'Buksan navigation',
  'Toggle menu': 'Toggle menu',
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