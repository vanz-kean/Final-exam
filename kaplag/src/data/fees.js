export const nominalProgramYears = {
  'BS Computer Science': 4,
};

export const isTuitionAssessmentActive = (program, yearLevel) => {
  const duration = nominalProgramYears[program];
  return Number.isInteger(yearLevel) && duration !== undefined && yearLevel > duration + 1;
};

export const form5FeeItems = [
  'Tuition + NSTP-CWTS/MS',
  'Laboratory fees',
  'Admission fees',
  'Athletic fees',
  'Computer fees',
  'Cultural fees',
  'Development fees',
  'Energy fee',
  'Entrance fees',
  'Guidance fees',
  'Handbook fees',
  'Internet fee',
  'Library fee',
  'Medical fee',
  'Registration fees',
  'School ID fees',
];

export const form5FeeTotals = [
  'Total tuition',
  'Total other school fees',
  'Less: Scholarship/Privilege',
  'Less: Tuition Subsidy',
  'Less: Loan',
  'Less: Other School Fees Subsidy',
  'Amount payable',
];

export const form5UnavailableAmount = 'Not available';

export const documentRequestOptions = [
  'Certificate of Enrollment',
  'Transcript of Records',
  'True Copy of Grades',
  'Certificate of Good Moral Character',
  'Certificate of Graduation',
];

export const freeHigherEducationLaw = {
  title: 'Republic Act No. 10931',
  url: 'https://lawphil.net/statutes/repacts/ra2017/ra_10931_2017.html',
};
