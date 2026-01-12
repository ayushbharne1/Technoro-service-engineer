import { useState, useEffect } from 'react';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';
import { ImSpinner2 } from 'react-icons/im'; // Loading Icon
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { 
    sendEngineerOtp, 
    verifyEngineerOtp, 
    registerEngineer, 
    clearError 
} from '../../redux/slices/authSlice'; 

const SignUp = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    
    // Redux State
    const { error } = useSelector((state) => state.auth);

    // Local States
    const [step, setStep] = useState(1);
    const [showPassword, setShowPassword] = useState(false);
    const [localErrors, setLocalErrors] = useState({});
    const [pincodeLoading, setPincodeLoading] = useState(false);
    
    // Loading States 
    const [isOtpLoading, setIsOtpLoading] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const [otpSent, setOtpSent] = useState(false);
    const [otpVerified, setOtpVerified] = useState(false);

    const [formData, setFormData] = useState({
        fullName: '', mobileNumber: '', otp: '', password: '',
        serviceType: [], experience: '',
        city: '', state: '', pincode: '', serviceRadius: '',
        aadhaarNumber: '', panNumber: '',
        bankAccountNumber: '', ifscCode: '', accountHolderName: '',
        termsAccepted: false
    });

    // Clear errors on step change
    useEffect(() => {
        dispatch(clearError());
    }, [step, dispatch]);

    // --- Inputs & Logic ---

    const handleInputChange = (field, value) => {
        setFormData(prev => ({ ...prev, [field]: value }));
        if (localErrors[field]) setLocalErrors(prev => ({ ...prev, [field]: '' }));
    };

    const handlePincodeChange = async (value) => {
        const numericValue = value.replace(/\D/g, '');
        handleInputChange('pincode', numericValue);
        
        if (numericValue.length === 6) {
            setPincodeLoading(true);
            try {
                const response = await fetch(`https://api.postalpincode.in/pincode/${numericValue}`);
                const data = await response.json();
                if (data[0].Status === 'Success') {
                    const postOffice = data[0].PostOffice[0];
                    setFormData(prev => ({ ...prev, city: postOffice.District, state: postOffice.State }));
                }
            } catch (err) { console.error(err); }
            finally { setPincodeLoading(false); }
        }
    };

    const handleServiceTypeToggle = (service) => {
        setFormData(prev => ({...prev, serviceType: prev.serviceType.includes(service)
                ? prev.serviceType.filter(s => s !== service)
                : [...prev.serviceType, service]
        }));
    };

    // --- API Interactions (Redux) ---

    const handleSendOTP = async () => {
        if (formData.mobileNumber.length !== 10) return setLocalErrors({ mobileNumber: 'Enter valid 10-digit number' });
        
        setIsOtpLoading(true);
        const result = await dispatch(sendEngineerOtp(formData.mobileNumber));
        setIsOtpLoading(false);

        if (result.meta.requestStatus === 'fulfilled') setOtpSent(true);
    };

    const handleVerifyOTP = async () => {
        setIsOtpLoading(true);
        const result = await dispatch(verifyEngineerOtp({ phone: formData.mobileNumber, otp: formData.otp }));
        setIsOtpLoading(false);

        if (result.meta.requestStatus === 'fulfilled') setOtpVerified(true);
    };

    const handleFinalSubmit = async () => {
        // Construct Payload for API
        const payload = {
            name: formData.fullName,
            phone: formData.mobileNumber,
            password: formData.password,
            serviceTypes: formData.serviceType,
            experience: Number(formData.experience),
            location: {
                pincode: formData.pincode, city: formData.city, state: formData.state,
                serviceRadius: Number(formData.serviceRadius)
            },
            kyc: { aadharNumber: formData.aadhaarNumber, panNumber: formData.panNumber },
            bankDetails: {
                accountHolderName: formData.accountHolderName,
                accountNumber: formData.bankAccountNumber,
                ifscCode: formData.ifscCode
            }
        };

        setIsSubmitting(true); // Start local loading
        try {
            await dispatch(registerEngineer(payload)).unwrap();
            alert("Registration successful!");
            navigate('/login');
        } catch (err) {
            console.error("Registration failed", err);
        } finally {
            setIsSubmitting(false); // Stop local loading
        }
    };

    const handleNext = () => {
        const newErrors = {};
        
        // Basic Client-Side Validation
        if (step === 1) {
            if (!formData.fullName) newErrors.fullName = 'Full name is required';
            if (!otpVerified) newErrors.otp = 'Please verify mobile number';
            if (formData.password.length < 6) newErrors.password = 'Password too short';
        }
        else if (step === 5) {
            if(!formData.termsAccepted) newErrors.termsAccepted = "You must accept terms";
        }

        if (Object.keys(newErrors).length > 0) {
            setLocalErrors(newErrors);
            return;
        }

        if (step === 5) {
            handleFinalSubmit();
        } else {
            setStep(step + 1);
        }
    };

    const handleBack = () => {
        setStep(step - 1);
        setLocalErrors({});
    };

    // --- Render Functions (Using your requested style) ---

    const renderProgressBar = () => (
        <div className="w-full max-w-2xl mb-8">
            <div className="flex justify-between items-center mb-2">
                {[1, 2, 3, 4, 5].map((s) => (
                    <div key={s} className="flex flex-col items-center">
                        <div className={`w-8 h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center text-white font-semibold transition-all ${
                            s <= step ? 'bg-[#7EC1B1]' : 'bg-gray-300'
                        }`}>
                            {s}
                        </div>
                        <span className="text-xs mt-1 hidden md:block">
                            {s === 1 ? 'Identity' : s === 2 ? 'Skills' : s === 3 ? 'Location' : s === 4 ? 'KYC' : 'Payment'}
                        </span>
                    </div>
                ))}
            </div>
            <div className="w-full h-2 bg-gray-200 rounded-full">
                <div className="h-full bg-[#7EC1B1] rounded-full transition-all duration-300" style={{ width: `${(step / 5) * 100}%` }}></div>
            </div>
        </div>
    );

    const renderStep1 = () => (
        <div className="w-full max-w-2xl space-y-5">
            <h3 className="text-xl md:text-2xl font-semibold mb-4">Identity & Login</h3>
            
            <div className="flex flex-col gap-2">
                <label className="text-base md:text-lg">Full Name</label>
                <input
                    type="text" placeholder="Enter your full name"
                    className="h-12 md:h-14 border border-gray-300 px-4 rounded-lg focus:outline-none focus:border-[#7EC1B1]"
                    value={formData.fullName} onChange={(e) => handleInputChange('fullName', e.target.value)}
                />
                {localErrors.fullName && <p className="text-red-500 text-sm">{localErrors.fullName}</p>}
            </div>

            <div className="flex flex-col gap-2">
                <label className="text-base md:text-lg">Mobile Number</label>
                <div className="flex gap-2">
                    <input
                        type="tel" placeholder="10-digit mobile number" maxLength="10"
                        className="flex-1 h-12 md:h-14 border border-gray-300 px-4 rounded-lg focus:outline-none focus:border-[#7EC1B1]"
                        value={formData.mobileNumber} onChange={(e) => handleInputChange('mobileNumber', e.target.value.replace(/\D/g, ''))}
                        disabled={otpVerified}
                    />
                    {!otpVerified && (
                        <button onClick={handleSendOTP} disabled={isOtpLoading} className="px-4 md:px-6 h-12 md:h-14 bg-[#7EC1B1] text-white rounded-lg whitespace-nowrap min-w-[100px] flex items-center justify-center">
                            {isOtpLoading && !otpSent ? <ImSpinner2 className="animate-spin" /> : otpSent ? 'Resend' : 'Send OTP'}
                        </button>
                    )}
                    {otpVerified && (
                        <div className="px-4 h-12 md:h-14 bg-green-500 text-white rounded-lg flex items-center">✓ Verified</div>
                    )}
                </div>
                {localErrors.mobileNumber && <p className="text-red-500 text-sm">{localErrors.mobileNumber}</p>}
            </div>

            {otpSent && !otpVerified && (
                <div className="flex flex-col gap-2">
                    <label className="text-base md:text-lg">Enter OTP</label>
                    <div className="flex gap-2">
                        <input
                            type="text" placeholder="6-digit OTP" maxLength="6"
                            className="flex-1 h-12 md:h-14 border border-gray-300 px-4 rounded-lg focus:outline-none focus:border-[#7EC1B1]"
                            value={formData.otp} onChange={(e) => handleInputChange('otp', e.target.value.replace(/\D/g, ''))}
                        />
                        <button onClick={handleVerifyOTP} disabled={isOtpLoading} className="px-4 md:px-6 h-12 md:h-14 bg-green-500 text-white rounded-lg min-w-[100px] flex items-center justify-center">
                            {isOtpLoading ? <ImSpinner2 className="animate-spin" /> : 'Verify'}
                        </button>
                    </div>
                    {localErrors.otp && <p className="text-red-500 text-sm">{localErrors.otp}</p>}
                </div>
            )}

            <div className="flex flex-col gap-2">
                <label className="text-base md:text-lg">Password</label>
                <div className="relative">
                    <input
                        type={showPassword ? "text" : "password"} placeholder="Minimum 6 characters"
                        className="w-full h-12 md:h-14 border border-gray-300 px-4 pr-12 rounded-lg focus:outline-none focus:border-[#7EC1B1]"
                        value={formData.password} onChange={(e) => handleInputChange('password', e.target.value)}
                    />
                    <span className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-gray-500" onClick={() => setShowPassword(!showPassword)}>
                        {showPassword ? <AiOutlineEyeInvisible size={22} /> : <AiOutlineEye size={22} />}
                    </span>
                </div>
                {localErrors.password && <p className="text-red-500 text-sm">{localErrors.password}</p>}
            </div>
        </div>
    );

    const renderStep2 = () => (
        <div className="w-full max-w-2xl space-y-5">
            <h3 className="text-xl md:text-2xl font-semibold mb-4">Work Capability</h3>
            <div className="flex flex-col gap-2">
                <label className="text-base md:text-lg">Service Type</label>
                <div className="space-y-3">
                    {['Installation', 'Repair', 'Maintenance'].map((service) => (
                        <label key={service} className={`flex items-center gap-3 p-3 border rounded-lg cursor-pointer hover:bg-gray-50 ${formData.serviceType.includes(service) ? 'border-[#7EC1B1] bg-teal-50' : 'border-gray-300'}`}>
                            <input type="checkbox" checked={formData.serviceType.includes(service)} onChange={() => handleServiceTypeToggle(service)} className="w-5 h-5 accent-[#7EC1B1]" />
                            <span className="text-base">{service}</span>
                        </label>
                    ))}
                </div>
            </div>
            <div className="flex flex-col gap-2">
                <label className="text-base md:text-lg">Years of Experience</label>
                <input type="number" placeholder="Enter years of experience" min="0" className="h-12 md:h-14 border border-gray-300 px-4 rounded-lg focus:outline-none focus:border-[#7EC1B1]" value={formData.experience} onChange={(e) => handleInputChange('experience', e.target.value)} />
            </div>
        </div>
    );

    const renderStep3 = () => (
        <div className="w-full max-w-2xl space-y-5">
            <h3 className="text-xl md:text-2xl font-semibold mb-4">Location Details</h3>
            <div className="flex flex-col gap-2">
                <label className="text-base md:text-lg">Pincode</label>
                <div className="relative">
                    <input type="text" placeholder="Enter 6-digit pincode" maxLength="6" className="h-12 md:h-14 border border-gray-300 px-4 rounded-lg w-full focus:outline-none focus:border-[#7EC1B1]" value={formData.pincode} onChange={(e) => handlePincodeChange(e.target.value)} />
                    {pincodeLoading && <div className="absolute right-3 top-1/2 -translate-y-1/2"><ImSpinner2 className="animate-spin text-[#7EC1B1]" /></div>}
                </div>
            </div>
            <div className="flex flex-col gap-2">
                <label className="text-base md:text-lg">City</label>
                <input type="text" placeholder="City" className="h-12 md:h-14 border border-gray-300 px-4 rounded-lg bg-gray-50" value={formData.city} readOnly />
            </div>
            <div className="flex flex-col gap-2">
                <label className="text-base md:text-lg">State</label>
                <input type="text" placeholder="State" className="h-12 md:h-14 border border-gray-300 px-4 rounded-lg bg-gray-50" value={formData.state} readOnly />
            </div>
            <div className="flex flex-col gap-2">
                <label className="text-base md:text-lg">Service Radius (KM)</label>
                <input type="number" placeholder="Service Radius" min="1" className="h-12 md:h-14 border border-gray-300 px-4 rounded-lg focus:outline-none focus:border-[#7EC1B1]" value={formData.serviceRadius} onChange={(e) => handleInputChange('serviceRadius', e.target.value)} />
            </div>
        </div>
    );

    const renderStep4 = () => (
        <div className="w-full max-w-2xl space-y-5">
            <h3 className="text-xl md:text-2xl font-semibold mb-4">KYC Verification</h3>
            <div className="flex flex-col gap-2">
                <label className="text-base md:text-lg">Aadhaar Number</label>
                <input type="text" placeholder="12-digit Aadhaar number" maxLength="12" className="h-12 md:h-14 border border-gray-300 px-4 rounded-lg focus:outline-none focus:border-[#7EC1B1]" value={formData.aadhaarNumber} onChange={(e) => handleInputChange('aadhaarNumber', e.target.value.replace(/\D/g, ''))} />
            </div>
            <div className="flex flex-col gap-2">
                <label className="text-base md:text-lg">PAN Number</label>
                <input type="text" placeholder="ABCDE1234F" maxLength="10" className="h-12 md:h-14 border border-gray-300 px-4 rounded-lg uppercase focus:outline-none focus:border-[#7EC1B1]" value={formData.panNumber} onChange={(e) => handleInputChange('panNumber', e.target.value.toUpperCase())} />
            </div>
        </div>
    );

    const renderStep5 = () => (
        <div className="w-full max-w-2xl space-y-5">
            <h3 className="text-xl md:text-2xl font-semibold mb-4">Payment Details</h3>
            <div className="flex flex-col gap-2">
                <label className="text-base md:text-lg">Bank Account Number</label>
                <input type="text" placeholder="Enter account number" className="h-12 md:h-14 border border-gray-300 px-4 rounded-lg focus:outline-none focus:border-[#7EC1B1]" value={formData.bankAccountNumber} onChange={(e) => handleInputChange('bankAccountNumber', e.target.value.replace(/\D/g, ''))} />
            </div>
            <div className="flex flex-col gap-2">
                <label className="text-base md:text-lg">IFSC Code</label>
                <input type="text" placeholder="SBIN0001234" maxLength="11" className="h-12 md:h-14 border border-gray-300 px-4 rounded-lg uppercase focus:outline-none focus:border-[#7EC1B1]" value={formData.ifscCode} onChange={(e) => handleInputChange('ifscCode', e.target.value.toUpperCase())} />
            </div>
            <div className="flex flex-col gap-2">
                <label className="text-base md:text-lg">Account Holder Name</label>
                <input type="text" placeholder="As per bank records" className="h-12 md:h-14 border border-gray-300 px-4 rounded-lg focus:outline-none focus:border-[#7EC1B1]" value={formData.accountHolderName} onChange={(e) => handleInputChange('accountHolderName', e.target.value)} />
            </div>
            <div className="flex items-start gap-3 mt-4">
                <input type="checkbox" checked={formData.termsAccepted} onChange={(e) => handleInputChange('termsAccepted', e.target.checked)} className="w-5 h-5 mt-1 accent-[#7EC1B1]" />
                <label className="text-sm md:text-base">I accept the terms and conditions.</label>
            </div>
            {localErrors.termsAccepted && <p className="text-red-500 text-sm">{localErrors.termsAccepted}</p>}
        </div>
    );

    return (
        <div className="min-h-screen bg-[#7EC1B1] flex items-center justify-center p-4 font-poppins">
            <div className="bg-white rounded-2xl shadow-xl w-full max-w-4xl p-6 md:p-10">
                <div className="flex flex-col items-center">
                    <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">Service Engineer Registration</h2>
                    <p className="text-gray-600 mb-8 text-center">Complete all steps to start receiving jobs</p>

                    {renderProgressBar()}

                    {/* Step Content */}
                    <div className="w-full flex justify-center mb-8">
                        {step === 1 && renderStep1()}
                        {step === 2 && renderStep2()}
                        {step === 3 && renderStep3()}
                        {step === 4 && renderStep4()}
                        {step === 5 && renderStep5()}
                    </div>

                    {/* Global Error */}
                    {error && (
                        <div className="w-full max-w-2xl mb-4 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">
                            {error}
                        </div>
                    )}

                    {/* Footer Actions */}
                    <div className="w-full max-w-xs flex gap-4">
                        {step > 1 && (
                            <button onClick={handleBack} className="flex-1 h-12 md:h-14 border-2 border-[#7EC1B1] text-[#7EC1B1] rounded-lg font-semibold hover:bg-teal-50">
                                Back
                            </button>
                        )}
                        <button 
                            onClick={handleNext} 
                            disabled={step === 5 && isSubmitting}
                            className="flex-1 h-12 md:h-14 bg-[#7EC1B1] text-white rounded-lg font-semibold hover:bg-[#68a998] flex items-center justify-center gap-2"
                        >
                            {(step === 5 && isSubmitting) && <ImSpinner2 className="animate-spin" />}
                            {step === 5 ? 'Complete Registration' : 'Next'}
                        </button>
                    </div>

                    <div className="flex items-center pt-5">
                        <span>Already have an account?</span>
                        <a className="text-[#7EC1B1] font-bold hover:underline pl-2" href="/login">Login</a>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SignUp;