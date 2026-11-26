import { useEffect, useRef, useState } from 'react';
import JsBarcode from 'jsbarcode';
import QRCode from 'qrcode';
import { student as defaultStudent } from '../data/student';
import { useTranslation } from '../context/TranslationContext.jsx';

const Barcode = ({ value }) => {
  const barcodeRef = useRef(null);

  useEffect(() => {
    if (!barcodeRef.current) return;
    try {
      JsBarcode(barcodeRef.current, value || '00000000', {
        format: 'CODE128',
        width: 1.25,
        height: 34,
        displayValue: false,
        margin: 0,
      });
    } catch {
      barcodeRef.current.innerHTML = '';
    }
  }, [value]);

  return <svg ref={barcodeRef} className="student-id-barcode" aria-label={`${value} library barcode`} />;
};

const StudentField = ({
  label,
  name,
  value,
  onChange,
  translate,
  type = 'text',
  options,
  placeholder,
  wide = false,
}) => (
  <label className={wide ? 'student-information-wide' : undefined}>
    <span>{label}</span>
    {options ? (
      <select className="form-select" name={name} value={value || ''} onChange={onChange}>
        <option value="">{translate('Select an option')}</option>
        {options.map((option) => <option key={option} value={option}>{translate(option)}</option>)}
      </select>
    ) : type === 'textarea' ? (
      <textarea className="form-control" name={name} value={value || ''} onChange={onChange} rows="2" placeholder={placeholder} />
    ) : (
      <input className="form-control" name={name} type={type} value={value || ''} onChange={onChange} placeholder={placeholder} />
    )}
  </label>
);

const StudentRecordValue = ({ label, value }) => (
  <div className="student-information-readonly-field">
    <span>{label}</span>
    <strong>{value || '—'}</strong>
  </div>
);

const initialInformation = {
  upMail: `${defaultStudent.studentNumber}@up.edu.ph`,
  studentNumber: defaultStudent.studentNumber,
  saIsId: '',
  firstName: 'Vanz Kean',
  middleName: 'Tiansing',
  lastName: 'Sazon',
  suffix: '',
  birthDate: '',
  birthPlace: '',
  sex: '',
  genderIdentity: '',
  civilStatus: '',
  citizenship: 'Filipino',
  religion: '',
  indigenousMember: '',
  indigenousGroup: '',
  pwdStatus: '',
  disabilityType: '',
  pwdIdNumber: '',
  soloParentStatus: '',
  firstGenerationStudent: '',
  homeLanguage: '',
  mobileNumber: '',
  personalEmail: '',
  preferredName: '',
  currentAddress: '',
  permanentAddress: '',
  upResidence: '',
  residenceType: '',
  permanentStreet: '',
  permanentBarangay: '',
  permanentCity: '',
  permanentProvince: '',
  permanentRegion: '',
  permanentPostalCode: '',
  currentStreet: '',
  currentBarangay: '',
  currentCity: '',
  currentProvince: '',
  currentRegion: '',
  currentPostalCode: '',
  motherFullName: '',
  motherMaidenName: '',
  motherOccupation: '',
  motherEmployer: '',
  motherMobile: '',
  motherWorkPhone: '',
  motherEmail: '',
  fatherFullName: '',
  fatherOccupation: '',
  fatherEmployer: '',
  fatherMobile: '',
  fatherWorkPhone: '',
  fatherEmail: '',
  parentAddress: '',
  upGuardianName: '',
  upGuardianRelationship: '',
  upGuardianMobile: '',
  upGuardianEmail: '',
  upGuardianAddress: '',
  employmentStatus: '',
  householdIncome: '',
  householdSize: '',
  financialSupport: '',
  scholarshipStatus: '',
  financialAidInterest: '',
  previousSchool: '',
  previousSchoolType: '',
  previousSchoolCity: '',
  previousSchoolProvince: '',
  previousSchoolRegion: '',
  previousProgram: '',
  graduationDate: '',
  lastSchoolYear: '',
  college: 'College of Science and Mathematics',
  program: defaultStudent.program,
  curriculum: defaultStudent.curriculum,
  yearLevel: defaultStudent.year,
  academicStatus: 'Regular',
  emergencyName: '',
  emergencyRelationship: '',
  emergencyNumber: '',
  profilePhoto: '',
  photoConfirmed: false,
  signature: '',
  electronicSignature: false,
};

const PHILIPPINE_REGIONS = [
  'NCR', 'CAR', 'Region I - Ilocos Region', 'Region II - Cagayan Valley',
  'Region III - Central Luzon', 'Region IV-A - CALABARZON',
  'MIMAROPA Region', 'Region V - Bicol Region', 'Region VI - Western Visayas',
  'Region VII - Central Visayas', 'Region VIII - Eastern Visayas',
  'Region IX - Zamboanga Peninsula', 'Region X - Northern Mindanao',
  'Region XI - Davao Region', 'Region XII - SOCCSKSARGEN',
  'Region XIII - Caraga', 'BARMM',
];

const StudentInformation = () => {
  const { translate } = useTranslation();
  const [information, setInformation] = useState(() => {
    const saved = sessionStorage.getItem('kaplag-student-information');
    return saved ? { ...initialInformation, ...JSON.parse(saved) } : initialInformation;
  });
  const [showId, setShowId] = useState(false);
  const [message, setMessage] = useState('');
  const signatureInputRef = useRef(null);
  const photoInputRef = useRef(null);
  const signatureCanvasRef = useRef(null);
  const signatureDrawingRef = useRef(false);
  const [showSignaturePad, setShowSignaturePad] = useState(false);
  const [qrCodeUrl, setQrCodeUrl] = useState('');

  useEffect(() => {
    const studentNumber = information.studentNumber || defaultStudent.studentNumber;
    QRCode.toDataURL(`UP-MIN|LIBRARY-RETURN|${studentNumber}`, {
      width: 180,
      margin: 1,
      errorCorrectionLevel: 'M',
      color: { dark: '#111111', light: '#FFFFFF' },
    }).then(setQrCodeUrl).catch(() => setQrCodeUrl(''));
  }, [information.studentNumber]);

  useEffect(() => {
    if (!showSignaturePad) return;
    const canvas = signatureCanvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    canvas.width = Math.round(rect.width * window.devicePixelRatio);
    canvas.height = Math.round(rect.height * window.devicePixelRatio);
    const context = canvas.getContext('2d');
    context.scale(window.devicePixelRatio, window.devicePixelRatio);
  }, [showSignaturePad]);

  useEffect(() => {
    if (!showId && !showSignaturePad) return undefined;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const closeOnEscape = (event) => {
      if (event.key === 'Escape') {
        setShowId(false);
        setShowSignaturePad(false);
      }
    };
    window.addEventListener('keydown', closeOnEscape);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', closeOnEscape);
    };
  }, [showId, showSignaturePad]);

  const updateField = (event) => {
    const { name, value } = event.target;
    setInformation((current) => ({ ...current, [name]: value }));
  };

  const handleSignature = (event) => {
    const file = event.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith('image/')) {
      setMessage(translate('Please choose an image file for your signature.'));
      return;
    }
    const reader = new FileReader();
    reader.onload = () => {
      const image = new Image();
      image.onload = () => {
        const scale = Math.min(1, 1200 / Math.max(image.width, image.height));
        const canvas = document.createElement('canvas');
        canvas.width = Math.max(1, Math.round(image.width * scale));
        canvas.height = Math.max(1, Math.round(image.height * scale));
        const context = canvas.getContext('2d');
        context.drawImage(image, 0, 0, canvas.width, canvas.height);

        const pixels = context.getImageData(0, 0, canvas.width, canvas.height);
        for (let index = 0; index < pixels.data.length; index += 4) {
          const red = pixels.data[index];
          const green = pixels.data[index + 1];
          const blue = pixels.data[index + 2];
          const luminance = (red * 299 + green * 587 + blue * 114) / 1000;
          if (luminance > 225) {
            pixels.data[index + 3] = 0;
          } else {
            const contrast = luminance < 115 ? 0 : Math.round(luminance * 0.55);
            pixels.data[index] = contrast;
            pixels.data[index + 1] = contrast;
            pixels.data[index + 2] = contrast;
          }
        }
        context.putImageData(pixels, 0, 0);
        setInformation((current) => ({
          ...current,
          signature: canvas.toDataURL('image/png'),
          electronicSignature: true,
        }));
        setMessage('');
      };
      image.src = reader.result;
    };
    reader.readAsDataURL(file);
  };

  const handleProfilePhoto = (event) => {
    const file = event.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith('image/')) {
      setMessage(translate('Please choose a JPG or PNG profile photo.'));
      return;
    }
    const reader = new FileReader();
    reader.onload = () => {
      setInformation((current) => ({ ...current, profilePhoto: reader.result }));
      setMessage('');
    };
    reader.readAsDataURL(file);
  };

  const getCanvasPoint = (event) => {
    const canvas = signatureCanvasRef.current;
    const rect = canvas.getBoundingClientRect();
    return {
      x: event.clientX - rect.left,
      y: event.clientY - rect.top,
    };
  };

  const startSignatureDrawing = (event) => {
    event.preventDefault();
    event.currentTarget.setPointerCapture?.(event.pointerId);
    signatureDrawingRef.current = true;
    const context = signatureCanvasRef.current.getContext('2d');
    const point = getCanvasPoint(event);
    context.beginPath();
    context.moveTo(point.x, point.y);
  };

  const drawSignature = (event) => {
    if (!signatureDrawingRef.current) return;
    const context = signatureCanvasRef.current.getContext('2d');
    const point = getCanvasPoint(event);
    context.lineWidth = 2;
    context.lineCap = 'round';
    context.lineJoin = 'round';
    context.strokeStyle = '#222';
    context.lineTo(point.x, point.y);
    context.stroke();
  };

  const stopSignatureDrawing = () => {
    signatureDrawingRef.current = false;
  };

  const clearSignature = () => {
    const canvas = signatureCanvasRef.current;
    const context = canvas.getContext('2d');
    context.clearRect(0, 0, canvas.width, canvas.height);
  };

  const saveDrawnSignature = () => {
    const canvas = signatureCanvasRef.current;
    setInformation((current) => ({ ...current, signature: canvas.toDataURL('image/png') }));
    setShowSignaturePad(false);
    setMessage('');
  };

  const saveInformation = (event) => {
    event.preventDefault();
    sessionStorage.setItem(
      'kaplag-student-information',
      JSON.stringify(information),
    );
    setMessage(translate('Student information saved for this session.'));
  };

  const middleInitial = information.middleName.trim().charAt(0);
  const fullName = [
    information.firstName,
    middleInitial && `${middleInitial}.`,
    information.lastName,
    information.suffix,
  ].filter(Boolean).join(' ');

  return (
    <form onSubmit={saveInformation} className="student-information-layout card-full">
      <section className="portal-card card-full student-information-heading">
        <div>
          <p className="student-information-eyebrow">{translate('Student records')}</p>
          <h1>{translate('Student Information')}</h1>
          <p>{translate('View and manage your personal, contact, address, and student ID information.')}</p>
        </div>
        <button type="button" className="btn btn-primary" onClick={() => setShowId(true)}>
          {translate('View student ID')}
        </button>
      </section>

      <section className="profile-photo-card card-full" aria-labelledby="profile-photo-title">
        <button type="button" className="profile-photo-avatar" onClick={() => photoInputRef.current?.click()} aria-label={translate('Change profile photo')}>
          {information.profilePhoto
            ? <img src={information.profilePhoto} alt={translate('Profile photo')} />
            : <span>{information.firstName?.charAt(0) || 'S'}</span>}
        </button>
        <div className="profile-photo-content">
          <h2 id="profile-photo-title">{translate('Profile photo')}</h2>
          <p>{translate('This photo appears on your Virtual ID and must meet the following requirements.')}</p>
          <ul>
            <li>{translate('A recent color photograph of yourself, facing the camera with your full face visible.')}</li>
            <li>{translate('A plain UP maroon or formal uniform background in JPG or PNG format.')}</li>
            <li>{translate('No eyeglasses, sunglasses, facewear, or edits. Religious head coverings are permitted.')}</li>
            <li>{translate('JPG or PNG, at least 400 by 400 pixels, square or portrait.')}</li>
          </ul>
          <label className="profile-photo-confirmation">
            <input type="checkbox" checked={information.photoConfirmed} onChange={(event) => setInformation((current) => ({ ...current, photoConfirmed: event.target.checked }))} />
            <span>{translate('I confirm that my photo meets these requirements. All photos are screened and inappropriate images may be rejected.')}</span>
          </label>
          <button type="button" className="btn btn-outline-secondary profile-photo-change" onClick={() => photoInputRef.current?.click()}>
            {information.profilePhoto ? translate('Change photo') : translate('Upload photo')}
          </button>
          <input ref={photoInputRef} className="visually-hidden" type="file" accept="image/jpeg,image/png" onChange={handleProfilePhoto} />
        </div>
      </section>

      <section className="portal-card card-full" aria-labelledby="account-details-title">
        <h2 id="account-details-title">{translate('UP account and student number')}</h2>
        <div className="student-information-grid">
          <label>
            <span>{translate('UP Mail')}</span>
            <input className="form-control" name="upMail" value={information.upMail} onChange={updateField} placeholder="2026-17196@up.edu.ph" />
          </label>
          <label>
            <span>{translate('Student number')}</span>
            <input className="form-control" name="studentNumber" value={information.studentNumber} onChange={updateField} placeholder="YYYY-NNNNN" required />
          </label>
          <label>
            <span>{translate('SAIS ID')}</span>
            <input className="form-control" name="saIsId" value={information.saIsId} onChange={updateField} placeholder={translate('If assigned')} />
          </label>
        </div>
      </section>

      <section className="portal-card" aria-labelledby="personal-details-title">
        <h2 id="personal-details-title">{translate('Personal information')}</h2>
        <div className="student-information-grid">
          <label><span>{translate('Last name')}</span><input className="form-control" name="lastName" value={information.lastName} onChange={updateField} required /></label>
          <label><span>{translate('First name')}</span><input className="form-control" name="firstName" value={information.firstName} onChange={updateField} required /></label>
          <label><span>{translate('Middle name')}</span><input className="form-control" name="middleName" value={information.middleName} onChange={updateField} /></label>
          <label><span>{translate('Suffix')}</span><input className="form-control" name="suffix" value={information.suffix} onChange={updateField} placeholder="Sr., Jr., III" /></label>
          <label><span>{translate('Birth date')}</span><input className="form-control" type="date" name="birthDate" value={information.birthDate} onChange={updateField} /></label>
          <label><span>{translate('Place of birth')}</span><input className="form-control" name="birthPlace" value={information.birthPlace} onChange={updateField} /></label>
          <label>
            <span>{translate('Sex')}</span>
            <select className="form-select" name="sex" value={information.sex} onChange={updateField}>
              <option value="">—</option><option>Female</option><option>Male</option><option>Intersex</option><option>Prefer not to say</option>
            </select>
          </label>
          <label>
            <span>{translate('Civil status')}</span>
            <select className="form-select" name="civilStatus" value={information.civilStatus} onChange={updateField}>
              <option value="">—</option><option>Single</option><option>Married</option><option>Widowed</option><option>Separated</option>
            </select>
          </label>
          <label><span>{translate('Citizenship')}</span><input className="form-control" name="citizenship" value={information.citizenship} onChange={updateField} /></label>
          <label><span>{translate('Religion')}</span><input className="form-control" name="religion" value={information.religion} onChange={updateField} /></label>
          <label><span>{translate('Mobile number')}</span><input className="form-control" type="tel" name="mobileNumber" value={information.mobileNumber} onChange={updateField} placeholder="+63" /></label>
          <label><span>{translate('Personal email')}</span><input className="form-control" type="email" name="personalEmail" value={information.personalEmail} onChange={updateField} /></label>
        </div>
      </section>

      <details className="portal-card card-full student-info-accordion">
        <summary>
          <span>
            <strong>{translate('Demographics and community')}</strong>
            <small>{translate('Optional identity, accessibility, and student-background details')}</small>
          </span>
          <span className="student-info-accordion-icon" aria-hidden="true">+</span>
        </summary>
        <p className="student-info-privacy-note">{translate('These details can be sensitive. Share only information requested for an authorized university purpose. Optional fields may be left blank.')}</p>
        <div className="student-information-grid">
          <StudentField label={translate('Preferred name')} name="preferredName" value={information.preferredName} onChange={updateField} translate={translate} />
          <StudentField label={translate('Gender identity (optional)')} name="genderIdentity" value={information.genderIdentity} onChange={updateField} translate={translate} />
          <StudentField label={translate('Language spoken at home')} name="homeLanguage" value={information.homeLanguage} onChange={updateField} translate={translate} />
          <StudentField label={translate('First-generation college student')} name="firstGenerationStudent" value={information.firstGenerationStudent} onChange={updateField} translate={translate} options={['Yes', 'No', 'Prefer not to say']} />
          <StudentField label={translate('Member of an Indigenous Cultural Community / Indigenous People')} name="indigenousMember" value={information.indigenousMember} onChange={updateField} translate={translate} options={['Yes', 'No', 'Prefer not to say']} />
          {information.indigenousMember === 'Yes' && (
            <StudentField label={translate('Indigenous cultural group (optional)')} name="indigenousGroup" value={information.indigenousGroup} onChange={updateField} translate={translate} />
          )}
          <StudentField label={translate('Person with disability (PWD)')} name="pwdStatus" value={information.pwdStatus} onChange={updateField} translate={translate} options={['Yes', 'No', 'Prefer not to say']} />
          {information.pwdStatus === 'Yes' && (
            <>
              <StudentField label={translate('Disability / accommodation details (optional)')} name="disabilityType" value={information.disabilityType} onChange={updateField} translate={translate} />
              <StudentField label={translate('PWD ID number (optional)')} name="pwdIdNumber" value={information.pwdIdNumber} onChange={updateField} translate={translate} />
            </>
          )}
          <StudentField label={translate('Solo parent status')} name="soloParentStatus" value={information.soloParentStatus} onChange={updateField} translate={translate} options={['Yes', 'No', 'Prefer not to say']} />
        </div>
      </details>

      <details className="portal-card card-full student-info-accordion">
        <summary>
          <span>
            <strong>{translate('Parents and family')}</strong>
            <small>{translate('Parent or family contact information and employment')}</small>
          </span>
          <span className="student-info-accordion-icon" aria-hidden="true">+</span>
        </summary>
        <div className="student-info-subsection">
          <h3>{translate('Mother / parent 1')}</h3>
          <div className="student-information-grid">
            <StudentField label={translate('Full name')} name="motherFullName" value={information.motherFullName} onChange={updateField} translate={translate} />
            <StudentField label={translate('Name before marriage (optional)')} name="motherMaidenName" value={information.motherMaidenName} onChange={updateField} translate={translate} />
            <StudentField label={translate('Occupation')} name="motherOccupation" value={information.motherOccupation} onChange={updateField} translate={translate} />
            <StudentField label={translate('Employer / business')} name="motherEmployer" value={information.motherEmployer} onChange={updateField} translate={translate} />
            <StudentField label={translate('Mobile number')} name="motherMobile" value={information.motherMobile} onChange={updateField} translate={translate} type="tel" />
            <StudentField label={translate('Work contact number (optional)')} name="motherWorkPhone" value={information.motherWorkPhone} onChange={updateField} translate={translate} type="tel" />
            <StudentField label={translate('Email address')} name="motherEmail" value={information.motherEmail} onChange={updateField} translate={translate} type="email" />
          </div>
        </div>
        <div className="student-info-subsection">
          <h3>{translate('Father / parent 2')}</h3>
          <div className="student-information-grid">
            <StudentField label={translate('Full name')} name="fatherFullName" value={information.fatherFullName} onChange={updateField} translate={translate} />
            <StudentField label={translate('Occupation')} name="fatherOccupation" value={information.fatherOccupation} onChange={updateField} translate={translate} />
            <StudentField label={translate('Employer / business')} name="fatherEmployer" value={information.fatherEmployer} onChange={updateField} translate={translate} />
            <StudentField label={translate('Mobile number')} name="fatherMobile" value={information.fatherMobile} onChange={updateField} translate={translate} type="tel" />
            <StudentField label={translate('Work contact number (optional)')} name="fatherWorkPhone" value={information.fatherWorkPhone} onChange={updateField} translate={translate} type="tel" />
            <StudentField label={translate('Email address')} name="fatherEmail" value={information.fatherEmail} onChange={updateField} translate={translate} type="email" />
            <StudentField label={translate('Parents’ / family address')} name="parentAddress" value={information.parentAddress} onChange={updateField} translate={translate} type="textarea" wide />
          </div>
        </div>
      </details>

      <section className="portal-card" aria-labelledby="academic-details-title">
        <h2 id="academic-details-title">{translate('Academic record')}</h2>
        <p className="student-information-record-note">{translate('These details are maintained by the University and are shown here for reference.')}</p>
        <div className="student-information-grid">
          <StudentRecordValue label={translate('College')} value={information.college} />
          <StudentRecordValue label={translate('Program')} value={information.program} />
          <StudentRecordValue label={translate('Curriculum')} value={information.curriculum} />
          <StudentRecordValue label={translate('Year level')} value={information.yearLevel} />
          <StudentRecordValue label={translate('Academic status')} value={information.academicStatus} />
        </div>
      </section>

      <details className="portal-card card-full student-info-accordion">
        <summary>
          <span>
            <strong>{translate('Addresses and residence')}</strong>
            <small>{translate('Permanent, current, and during-term addresses')}</small>
          </span>
          <span className="student-info-accordion-icon" aria-hidden="true">+</span>
        </summary>
        <div className="student-info-subsection">
          <h3>{translate('Permanent address')}</h3>
          <div className="student-information-grid">
            <StudentField label={translate('House / street / subdivision')} name="permanentStreet" value={information.permanentStreet} onChange={updateField} translate={translate} />
            <StudentField label={translate('Barangay')} name="permanentBarangay" value={information.permanentBarangay} onChange={updateField} translate={translate} />
            <StudentField label={translate('City / municipality')} name="permanentCity" value={information.permanentCity} onChange={updateField} translate={translate} />
            <StudentField label={translate('Province')} name="permanentProvince" value={information.permanentProvince} onChange={updateField} translate={translate} />
            <StudentField label={translate('Region')} name="permanentRegion" value={information.permanentRegion} onChange={updateField} translate={translate} options={PHILIPPINE_REGIONS} />
            <StudentField label={translate('Postal code')} name="permanentPostalCode" value={information.permanentPostalCode} onChange={updateField} translate={translate} />
          </div>
        </div>
        <div className="student-info-subsection">
          <h3>{translate('Current address')}</h3>
          <div className="student-information-grid">
            <StudentField label={translate('House / street / subdivision')} name="currentStreet" value={information.currentStreet} onChange={updateField} translate={translate} />
            <StudentField label={translate('Barangay')} name="currentBarangay" value={information.currentBarangay} onChange={updateField} translate={translate} />
            <StudentField label={translate('City / municipality')} name="currentCity" value={information.currentCity} onChange={updateField} translate={translate} />
            <StudentField label={translate('Province')} name="currentProvince" value={information.currentProvince} onChange={updateField} translate={translate} />
            <StudentField label={translate('Region')} name="currentRegion" value={information.currentRegion} onChange={updateField} translate={translate} options={PHILIPPINE_REGIONS} />
            <StudentField label={translate('Postal code')} name="currentPostalCode" value={information.currentPostalCode} onChange={updateField} translate={translate} />
          </div>
        </div>
        <div className="student-info-subsection">
          <h3>{translate('Where you will live while attending UP Mindanao')}</h3>
          <div className="student-information-grid">
            <StudentField label={translate('Residence type')} name="residenceType" value={information.residenceType} onChange={updateField} translate={translate} options={['University dormitory', 'Private dormitory', 'Boarding house', 'With family / relatives', 'Other']} />
            <StudentField label={translate('Address during the term')} name="upResidence" value={information.upResidence} onChange={updateField} translate={translate} type="textarea" wide />
          </div>
        </div>
      </details>

      <details className="portal-card card-full student-info-accordion">
        <summary>
          <span>
            <strong>{translate('Guardian while at UP')}</strong>
            <small>{translate('Local guardian or trusted contact during your stay')}</small>
          </span>
          <span className="student-info-accordion-icon" aria-hidden="true">+</span>
        </summary>
        <div className="student-information-grid">
          <StudentField label={translate('Guardian full name')} name="upGuardianName" value={information.upGuardianName} onChange={updateField} translate={translate} />
          <StudentField label={translate('Relationship to student')} name="upGuardianRelationship" value={information.upGuardianRelationship} onChange={updateField} translate={translate} />
          <StudentField label={translate('Mobile number')} name="upGuardianMobile" value={information.upGuardianMobile} onChange={updateField} translate={translate} type="tel" />
          <StudentField label={translate('Email address')} name="upGuardianEmail" value={information.upGuardianEmail} onChange={updateField} translate={translate} type="email" />
          <StudentField label={translate('Local address')} name="upGuardianAddress" value={information.upGuardianAddress} onChange={updateField} translate={translate} type="textarea" wide />
        </div>
      </details>

      <details className="portal-card card-full student-info-accordion">
        <summary>
          <span>
            <strong>{translate('Financial and student support')}</strong>
            <small>{translate('Optional information to help identify financial aid and support needs')}</small>
          </span>
          <span className="student-info-accordion-icon" aria-hidden="true">+</span>
        </summary>
        <p className="student-info-privacy-note">{translate('Income and financial details are sensitive. You may skip these fields unless you are applying for or being assessed for a university support program.')}</p>
        <div className="student-information-grid">
          <StudentField label={translate('Employment status')} name="employmentStatus" value={information.employmentStatus} onChange={updateField} translate={translate} options={['Not employed', 'Part-time', 'Full-time', 'Self-employed', 'Prefer not to say']} />
          <StudentField label={translate('Household size')} name="householdSize" value={information.householdSize} onChange={updateField} translate={translate} type="number" />
          <StudentField label={translate('Estimated monthly household income (range)')} name="householdIncome" value={information.householdIncome} onChange={updateField} translate={translate} options={['Below ₱10,000', '₱10,000–₱19,999', '₱20,000–₱39,999', '₱40,000–₱69,999', '₱70,000 or more', 'Prefer not to say']} />
          <StudentField label={translate('Main source of educational support')} name="financialSupport" value={information.financialSupport} onChange={updateField} translate={translate} options={['Parent / family', 'Self-supported', 'Scholarship', 'Government assistance', 'Other', 'Prefer not to say']} />
          <StudentField label={translate('Scholarship / financial aid status')} name="scholarshipStatus" value={information.scholarshipStatus} onChange={updateField} translate={translate} options={['Currently receiving aid', 'Applied / pending', 'Not receiving aid', 'Prefer not to say']} />
          <StudentField label={translate('Interested in information about financial assistance?')} name="financialAidInterest" value={information.financialAidInterest} onChange={updateField} translate={translate} options={['Yes', 'No']} />
        </div>
      </details>

      <details className="portal-card card-full student-info-accordion">
        <summary>
          <span>
            <strong>{translate('Previous education')}</strong>
            <small>{translate('School attended before entering UP Mindanao')}</small>
          </span>
          <span className="student-info-accordion-icon" aria-hidden="true">+</span>
        </summary>
        <div className="student-information-grid">
          <StudentField label={translate('Previous school name')} name="previousSchool" value={information.previousSchool} onChange={updateField} translate={translate} />
          <StudentField label={translate('School type')} name="previousSchoolType" value={information.previousSchoolType} onChange={updateField} translate={translate} options={['Public', 'Private', 'Home school', 'Other']} />
          <StudentField label={translate('City / municipality')} name="previousSchoolCity" value={information.previousSchoolCity} onChange={updateField} translate={translate} />
          <StudentField label={translate('Province')} name="previousSchoolProvince" value={information.previousSchoolProvince} onChange={updateField} translate={translate} />
          <StudentField label={translate('Region')} name="previousSchoolRegion" value={information.previousSchoolRegion} onChange={updateField} translate={translate} options={PHILIPPINE_REGIONS} />
          <StudentField label={translate('Previous program / strand')} name="previousProgram" value={information.previousProgram} onChange={updateField} translate={translate} />
          <StudentField label={translate('Date of graduation')} name="graduationDate" value={information.graduationDate} onChange={updateField} translate={translate} type="date" />
          <StudentField label={translate('Last school year attended')} name="lastSchoolYear" value={information.lastSchoolYear} onChange={updateField} translate={translate} placeholder="e.g. 2025–2026" />
        </div>
      </details>

      <section className="portal-card" aria-labelledby="emergency-details-title">
        <h2 id="emergency-details-title">{translate('Emergency contact')}</h2>
        <div className="student-information-grid">
          <label><span>{translate('Contact name')}</span><input className="form-control" name="emergencyName" value={information.emergencyName} onChange={updateField} /></label>
          <label><span>{translate('Relationship')}</span><input className="form-control" name="emergencyRelationship" value={information.emergencyRelationship} onChange={updateField} /></label>
          <label><span>{translate('Contact number')}</span><input className="form-control" type="tel" name="emergencyNumber" value={information.emergencyNumber} onChange={updateField} /></label>
        </div>
      </section>

      <section className="portal-card card-full" aria-labelledby="signature-details-title">
        <h2 id="signature-details-title">{translate('Signature')}</h2>
        <p>{translate('Printed on your Virtual ID card and on every form you sign in ARAL. Draw it here or upload a clear picture of your signature.')}</p>
        <div className="signature-status">
          {information.signature
            ? <img src={information.signature} alt={translate('Student signature preview')} />
            : <span>{translate('No signature')}</span>}
        </div>
        <label className="signature-consent">
          <input type="radio" name="electronicSignature" checked={information.electronicSignature} onChange={() => setInformation((current) => ({ ...current, electronicSignature: true }))} />
          <span>{translate('This is my official electronic signature for ARAL. Using another person’s signature is a violation of the UP Policy on Electronic Documents and Signatures.')}</span>
        </label>
        <div className="signature-actions">
          <button type="button" className="btn btn-outline-secondary" onClick={() => setShowSignaturePad(true)}>
            <span aria-hidden="true">✎</span> {translate('Draw')}
          </button>
          <button type="button" className="btn btn-outline-secondary" onClick={() => signatureInputRef.current?.click()}>
            <span aria-hidden="true">↑</span> {translate('Upload')}
          </button>
          {information.signature && (
            <button type="button" className="btn btn-link text-danger" onClick={() => setInformation((current) => ({ ...current, signature: '', electronicSignature: false }))}>
              {translate('Remove signature')}
            </button>
          )}
        </div>
        <input ref={signatureInputRef} className="visually-hidden" type="file" accept="image/png,image/jpeg" onChange={handleSignature} />
      </section>

      <section className="portal-card card-full student-information-actions">
        {message && <p className="student-information-message" role="status">{message}</p>}
        <button type="submit" className="btn btn-primary">{translate('Save student information')}</button>
      </section>

      {showId && (
        <div className="student-id-overlay" role="presentation" onMouseDown={(event) => {
          if (event.target === event.currentTarget) setShowId(false);
        }}>
          <section className="student-id-modal" role="dialog" aria-modal="true" aria-labelledby="student-id-title">
            <div className="student-id-modal-actions">
              <h2 id="student-id-title">{translate('Student ID preview')}</h2>
              <button type="button" className="btn-close" aria-label={translate('Close')} onClick={() => setShowId(false)} />
            </div>
            <div className="student-id-pair">
              <article className="up-id-card up-id-front" aria-label={translate('Student ID front')}>
                <div className="up-id-masthead">
                  <img className="up-id-seal" src={`${import.meta.env.BASE_URL}img/Logo.png`} alt="University of the Philippines Mindanao seal" />
                  <div>
                    <strong>University of the Philippines</strong>
                    <b>Mindanao</b>
                  </div>
                </div>
                <div className="up-id-main">
                  <div className="up-id-details">
                    <div className="up-id-academic">
                      <strong className="up-id-name">{fullName || defaultStudent.fullName}</strong>
                      <div className="up-id-number">{information.studentNumber || defaultStudent.studentNumber}</div>
                      <div className="up-id-college">{information.college || 'College of Science and Mathematics'}</div>
                    </div>
                    <div className="up-id-signature-group">
                      <div className="up-id-signature">
                        {information.signature
                          ? <img src={information.signature} alt={translate('Student signature')} />
                          : <span>{translate('Signature placeholder')}</span>}
                      </div>
                      <small>{translate("Student's signature")}</small>
                    </div>
                    <div className="up-id-library">
                      <small>UPMinLIB</small>
                      <Barcode value={(information.studentNumber || defaultStudent.studentNumber).replace('-', '')} />
                    </div>
                  </div>
                  <div className="up-id-right">
                    <div className="up-id-photo">
                      {information.profilePhoto
                        ? <img src={information.profilePhoto} alt={translate('Student profile photo')} />
                        : <span>{translate('Photo')}</span>}
                    </div>
                    {qrCodeUrl
                      ? <img className="up-id-qr" src={qrCodeUrl} alt={translate('Library book return QR code')} />
                      : <div className="up-id-qr-placeholder">{translate('QR')}</div>}
                    <div className="up-id-chip" aria-hidden="true">UPMinLIB</div>
                  </div>
                </div>
              </article>

              <article className="up-id-card up-id-back" aria-label={translate('Student ID back')}>
                <p>
                  * This card is non-transferable.<br />
                  * Tampering it in any way will invalidate this card.<br />
                  * It must be presented for entry into campus premises.<br />
                  * In case of loss, the finder is requested to return it to the Registrar&apos;s Office, UP Mindanao, Mintal Davao City.
                </p>
                <address>Tel. No. (082) 293-0201</address>
                <div className="up-id-registrar">
                  <span className="up-id-registrar-signature">Karen Joyce C. Cayamanda</span>
                  <strong>PROF. KAREN JOYCE C. CAYAMANDA, PhD.</strong>
                  <small>University Registrar</small>
                </div>
                <div className="up-id-term">
                  <strong>{translate('1st Semester')}</strong>
                  <span>AY 2026-2027</span>
                  <small># <b>0256</b></small>
                </div>
              </article>
            </div>
          </section>
        </div>
      )}
      {showSignaturePad && (
        <div className="student-id-overlay" role="presentation" onMouseDown={(event) => {
          if (event.target === event.currentTarget) setShowSignaturePad(false);
        }}>
          <section className="signature-pad-modal" role="dialog" aria-modal="true" aria-labelledby="signature-pad-title">
            <div className="student-id-modal-actions">
              <h2 id="signature-pad-title">{translate('Draw your signature')}</h2>
              <button type="button" className="btn-close" aria-label={translate('Close')} onClick={() => setShowSignaturePad(false)} />
            </div>
            <canvas
              ref={signatureCanvasRef}
              className="signature-canvas"
              aria-label={translate('Signature drawing area')}
              onPointerDown={startSignatureDrawing}
              onPointerMove={drawSignature}
              onPointerUp={stopSignatureDrawing}
              onPointerLeave={stopSignatureDrawing}
            />
            <div className="signature-pad-actions">
              <button type="button" className="btn btn-outline-secondary" onClick={clearSignature}>{translate('Clear')}</button>
              <button type="button" className="btn btn-primary" onClick={saveDrawnSignature}>{translate('Save signature')}</button>
            </div>
          </section>
        </div>
      )}
    </form>
  );
};

export default StudentInformation;
