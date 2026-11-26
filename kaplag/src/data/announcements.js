// Announcements data with Gmail-like hierarchy
// Categories: 'urgent' (requires immediate action), 'action' (requires action but not urgent), 'info' (informational)

export const announcements = [
  // ============ URGENT - Requires immediate action ============
  {
    id: 'ann-001',
    category: 'urgent',
    categoryLabel: 'URGENT',
    date: '2026-11-20',
    title: 'INC Grade Completion Deadline — Tomorrow',
    text: 'All students with INC grades from 2nd Semester AY 2025–2026 must complete requirements by November 21, 2026. Failure to complete will result in a grade of 5.00.',
    office: 'Office of the University Registrar',
    actionRequired: true,
    actionText: 'View Requirements',
    actionLink: '/grades',
    expiryDate: '2026-11-21',
  },
  {
    id: 'ann-002',
    category: 'urgent',
    categoryLabel: 'URGENT',
    date: '2026-11-18',
    title: 'Tuition Payment Deadline — 3 Days Left',
    text: 'Second semester tuition payment is due by November 22, 2026. Late payments will incur a 2% monthly penalty. Check your SAIS account for the exact amount.',
    office: 'Accounting Office',
    actionRequired: true,
    actionText: 'Pay Now',
    actionLink: '/fees',
    expiryDate: '2026-11-22',
  },
  {
    id: 'ann-003',
    category: 'urgent',
    categoryLabel: 'URGENT',
    date: '2026-11-15',
    title: 'LOA Application Deadline — This Week',
    text: 'Leave of Absence (LOA) applications for 2nd Semester AY 2026–2027 must be submitted by November 22, 2026. Applications require adviser endorsement and OUR approval.',
    office: 'Office of the University Registrar',
    actionRequired: true,
    actionText: 'Apply for LOA',
    actionLink: '/registration',
    expiryDate: '2026-11-22',
  },

  // ============ ACTION REQUIRED - Needs action but not urgent ============
  {
    id: 'ann-004',
    category: 'action',
    categoryLabel: 'ACTION REQUIRED',
    date: '2026-11-10',
    title: 'Pre-Registration Advising for 2nd Semester AY 2026–2027',
    text: 'All continuing students must complete pre-registration advising with their program adviser before the enrollment period (Dec 1–15, 2026). Schedule your appointment via SAIS.',
    office: 'Office of the College Secretary',
    actionRequired: true,
    actionText: 'Schedule Advising',
    actionLink: '/registration',
    expiryDate: '2026-11-30',
  },
  {
    id: 'ann-005',
    category: 'action',
    categoryLabel: 'ACTION REQUIRED',
    date: '2026-11-08',
    title: 'Student Evaluation of Teachers (SET) — Open Until Dec 15',
    text: 'The online SET for 1st Semester AY 2026–2027 is now open. Your feedback helps improve teaching quality. Access SET through your SAIS student portal.',
    office: 'Office of the Vice Chancellor for Academic Affairs',
    actionRequired: true,
    actionText: 'Complete SET',
    actionLink: '#',
    expiryDate: '2026-12-15',
  },
  {
    id: 'ann-006',
    category: 'action',
    categoryLabel: 'ACTION REQUIRED',
    date: '2026-11-05',
    title: 'Update Contact Information in SAIS',
    text: 'Please verify and update your mobile number, email, and emergency contact in SAIS by November 30, 2026. This ensures you receive important university notifications.',
    office: 'Office of the University Registrar',
    actionRequired: true,
    actionText: 'Update Info',
    actionLink: '/student-information',
    expiryDate: '2026-11-30',
  },
  {
    id: 'ann-007',
    category: 'action',
    categoryLabel: 'ACTION REQUIRED',
    date: '2026-10-28',
    title: 'Scholarship Renewal Application — Deadline Dec 1',
    text: 'STFAP and other scholarship grantees must submit renewal requirements by December 1, 2026. Late submissions may result in scholarship discontinuation.',
    office: 'Office of Scholarships and Grants',
    actionRequired: true,
    actionText: 'Submit Requirements',
    actionLink: '#',
    expiryDate: '2026-12-01',
  },

  // ============ INFO - Informational announcements ============
  {
    id: 'ann-008',
    category: 'info',
    categoryLabel: 'ANNOUNCEMENT',
    date: '2026-11-22',
    title: 'University Holiday — November 30 (Bonifacio Day)',
    text: 'Classes and offices are suspended on November 30, 2026 (Monday) in observance of Bonifacio Day. Regular operations resume December 1.',
    office: 'Office of the Chancellor',
    actionRequired: false,
  },
  {
    id: 'ann-009',
    category: 'info',
    categoryLabel: 'ANNOUNCEMENT',
    date: '2026-11-20',
    title: 'Library Extended Hours During Finals Week',
    text: 'The Main Library will extend hours from 7:00 AM to 10:00 PM from December 2–13, 2026 for finals week. Overnight study areas available at the Learning Commons.',
    office: 'University Library',
    actionRequired: false,
  },
  {
    id: 'ann-010',
    category: 'info',
    categoryLabel: 'ANNOUNCEMENT',
    date: '2026-11-18',
    title: 'UP Mindanao Intramurals 2026 — Schedule of Games',
    text: 'Intramurals will run from December 2–6, 2026. Check the Sports and Recreation Office bulletin for game schedules and venue assignments. All students welcome to watch.',
    office: 'Sports and Recreation Office',
    actionRequired: false,
  },
  {
    id: 'ann-011',
    category: 'info',
    categoryLabel: 'ANNOUNCEMENT',
    date: '2026-11-15',
    title: 'New Course Offering: CS 198 - Special Topics in AI Ethics',
    text: 'A new 3-unit elective (CS 198) will be offered in 2nd Semester AY 2026–2027. Prerequisite: CS 130. Limited slots available. Consult your adviser for enrollment.',
    office: 'Department of Computer Science',
    actionRequired: false,
  },
  {
    id: 'ann-012',
    category: 'info',
    categoryLabel: 'ANNOUNCEMENT',
    date: '2026-11-12',
    title: 'Campus Wi-Fi Maintenance — November 23, 6:00–10:00 AM',
    text: 'Scheduled maintenance for campus Wi-Fi infrastructure. Expect intermittent connectivity during this window. Wired connections in labs unaffected.',
    office: 'Information Technology Office',
    actionRequired: false,
  },
  {
    id: 'ann-013',
    category: 'info',
    categoryLabel: 'ANNOUNCEMENT',
    date: '2026-11-10',
    title: 'Career Fair 2027 — February 14–15, 2027',
    text: 'Annual UP Mindanao Career Fair featuring 50+ partner companies. Pre-register via SAIS starting January 2027. Open to all graduating students and alumni.',
    office: 'Office of Student Affairs',
    actionRequired: false,
  },
  {
    id: 'ann-014',
    category: 'info',
    categoryLabel: 'ANNOUNCEMENT',
    date: '2026-11-05',
    title: 'Mental Health Awareness Week — November 25–29',
    text: 'Free counseling sessions, stress management workshops, and peer support activities available all week at the Student Wellness Center. Walk-ins welcome.',
    office: 'Office of Student Affairs — Guidance and Counseling',
    actionRequired: false,
  },
  {
    id: 'ann-015',
    category: 'info',
    categoryLabel: 'ANNOUNCEMENT',
    date: '2026-10-30',
    title: 'UP System-wide Research Symposium — Call for Papers',
    text: 'Abstract submission deadline: January 15, 2027. Open to undergraduate and graduate students. Categories: Sciences, Humanities, Engineering, Social Sciences.',
    office: 'Office of the Vice Chancellor for Research and Extension',
    actionRequired: false,
  },
  {
    id: 'ann-016',
    category: 'info',
    categoryLabel: 'ANNOUNCEMENT',
    date: '2026-10-25',
    title: 'Shuttle Service Schedule Update',
    text: 'Additional shuttle trips added for morning peak hours (6:30–8:30 AM) starting November 4. Check the Transport Office bulletin for updated timetable.',
    office: 'Transport and Security Office',
    actionRequired: false,
  },
  {
    id: 'ann-017',
    category: 'info',
    categoryLabel: 'ANNOUNCEMENT',
    date: '2026-10-20',
    title: 'New Dormitory Policies Effective 2nd Semester',
    text: 'Updated curfew hours, visitor policy, and maintenance fee structure. All dorm residents must attend the orientation on November 28, 2026 at 2:00 PM.',
    office: 'Student Housing Office',
    actionRequired: false,
  },
  {
    id: 'ann-018',
    category: 'info',
    categoryLabel: 'ANNOUNCEMENT',
    date: '2026-10-15',
    title: 'Enrollment Period for 2nd Semester AY 2026–2027',
    text: 'Online enrollment: December 1–15, 2026. Late enrollment: December 16–19, 2026 (with fee). Refer to the Academic Calendar for complete schedule.',
    office: 'Office of the University Registrar',
    actionRequired: false,
  },
];

// Helper functions for filtering
export const getAnnouncementsByCategory = (category) => {
  return announcements.filter(a => a.category === category);
};

export const getUrgentAnnouncements = () => getAnnouncementsByCategory('urgent');
export const getActionAnnouncements = () => getAnnouncementsByCategory('action');
export const getInfoAnnouncements = () => getAnnouncementsByCategory('info');

export const getAllAnnouncements = () => [...announcements];

// For dashboard - get top 5 most recent across all categories
export const getRecentAnnouncements = (limit = 5) => {
  return [...announcements]
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, limit);
};