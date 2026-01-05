import { useState } from 'react';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';

const SignUp = () => {
    const [step, setStep] = useState(1);
    const [showPassword, setShowPassword] = useState(false);
    const [errors, setErrors] = useState({});
    const [pincodeLoading, setPincodeLoading] = useState(false);
    
    // Form data
    const [formData, setFormData] = useState({
        fullName: '',
        mobileNumber: '',
        otp: '',
        password: '',
        serviceType: [],
        experience: '',
        city: '',
        state: '',
        pincode: '',
        serviceRadius: '',
        aadhaarNumber: '',
        panNumber: '',
        bankAccountNumber: '',
        ifscCode: '',
        accountHolderName: '',
        termsAccepted: false
    });

    const [otpSent, setOtpSent] = useState(false);
    const [otpVerified, setOtpVerified] = useState(false);

    const handleInputChange = (field, value) => {
        setFormData(prev => ({ ...prev, [field]: value }));
        if (errors[field]) {
            setErrors(prev => ({ ...prev, [field]: '' }));
        }
    };

    const fetchPincodeData = async (pincode) => {
        if (pincode.length !== 6) return;
        
        setPincodeLoading(true);
        try {
            const response = await fetch(`https://api.postalpincode.in/pincode/${pincode}`);
            const data = await response.json();
            
            if (data[0].Status === 'Success' && data[0].PostOffice.length > 0) {
                const postOffice = data[0].PostOffice[0];
                setFormData(prev => ({
                    ...prev,
                    city: postOffice.District,
                    state: postOffice.State
                }));
                setErrors(prev => ({ ...prev, pincode: '' }));
            } else {
                setErrors(prev => ({ ...prev, pincode: 'Invalid pincode - Please enter city and state manually' }));
            }
        } catch (error) {
            setErrors(prev => ({ ...prev, pincode: 'Failed to fetch pincode data - Please enter manually' }));
        } finally {
            setPincodeLoading(false);
        }
    };

    const handlePincodeChange = (value) => {
        const numericValue = value.replace(/\D/g, '');
        handleInputChange('pincode', numericValue);
        
        if (numericValue.length === 6) {
            fetchPincodeData(numericValue);
        }
    };

    const handleServiceTypeToggle = (service) => {
        setFormData(prev => ({
            ...prev,
            serviceType: prev.serviceType.includes(service)
                ? prev.serviceType.filter(s => s !== service)
                : [...prev.serviceType, service]
        }));
    };

    const sendOTP = () => {
        if (!formData.mobileNumber || formData.mobileNumber.length !== 10) {
            setErrors({ mobileNumber: 'Enter valid 10-digit mobile number' });
            return;
        }
        setOtpSent(true);
        console.log('OTP sent to:', formData.mobileNumber);
    };

    const verifyOTP = () => {
        if (formData.otp.length !== 6) {
            setErrors({ otp: 'Enter valid 6-digit OTP' });
            return;
        }
        setOtpVerified(true);
        setErrors({});
        console.log('OTP verified');
    };

    const validateStep1 = () => {
        const newErrors = {};
        if (!formData.fullName.trim()) newErrors.fullName = 'Full name is required';
        if (!formData.mobileNumber || formData.mobileNumber.length !== 10) {
            newErrors.mobileNumber = 'Valid 10-digit mobile number is required';
        }
        if (!otpVerified) newErrors.otp = 'Please verify your mobile number';
        if (!formData.password || formData.password.length < 6) {
            newErrors.password = 'Password must be at least 6 characters';
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const validateStep2 = () => {
        const newErrors = {};
        if (formData.serviceType.length === 0) {
            newErrors.serviceType = 'Select at least one service type';
        }
        if (!formData.experience || formData.experience < 0) {
            newErrors.experience = 'Enter valid years of experience';
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const validateStep3 = () => {
        const newErrors = {};
        if (!formData.pincode || formData.pincode.length !== 6) {
            newErrors.pincode = 'Valid 6-digit pincode is required';
        }
        if (!formData.city.trim()) newErrors.city = 'City is required';
        if (!formData.state.trim()) newErrors.state = 'State is required';
        if (!formData.serviceRadius || formData.serviceRadius < 1) {
            newErrors.serviceRadius = 'Service radius must be at least 1 KM';
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const validateStep4 = () => {
        const newErrors = {};
        if (!formData.aadhaarNumber || formData.aadhaarNumber.length !== 12) {
            newErrors.aadhaarNumber = 'Valid 12-digit Aadhaar number is required';
        }
        if (!formData.panNumber || !/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/.test(formData.panNumber)) {
            newErrors.panNumber = 'Valid PAN number is required (e.g., ABCDE1234F)';
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const validateStep5 = () => {
        const newErrors = {};
        if (!formData.bankAccountNumber || formData.bankAccountNumber.length < 9) {
            newErrors.bankAccountNumber = 'Valid bank account number is required';
        }
        if (!formData.ifscCode || !/^[A-Z]{4}0[A-Z0-9]{6}$/.test(formData.ifscCode)) {
            newErrors.ifscCode = 'Valid IFSC code is required (e.g., SBIN0001234)';
        }
        if (!formData.accountHolderName.trim()) {
            newErrors.accountHolderName = 'Account holder name is required';
        }
        if (!formData.termsAccepted) {
            newErrors.termsAccepted = 'You must accept terms and conditions';
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleNext = () => {
        let isValid = false;
        switch (step) {
            case 1: isValid = validateStep1(); break;
            case 2: isValid = validateStep2(); break;
            case 3: isValid = validateStep3(); break;
            case 4: isValid = validateStep4(); break;
            case 5: isValid = validateStep5(); break;
            default: isValid = true;
        }
        
        if (isValid) {
            if (step === 5) {
                handleSubmit();
            } else {
                setStep(step + 1);
            }
        }
    };

    const handleBack = () => {
        setStep(step - 1);
        setErrors({});
    };

    const handleSubmit = () => {
        console.log('Service Engineer Registration Data:', formData);
        alert('Registration successful! Check console for data.');
    };

    const renderProgressBar = () => (
        <div className="w-full max-w-2xl mb-8">
            <div className="flex justify-between items-center mb-2">
                {[1, 2, 3, 4, 5].map((s) => (
                    <div key={s} className="flex flex-col items-center">
                        <div className={`w-8 h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center text-white font-semibold ${
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
                    type="text"
                    placeholder="Enter your full name"
                    className="h-12 md:h-14 border border-gray-300 px-4 rounded-lg"
                    value={formData.fullName}
                    onChange={(e) => handleInputChange('fullName', e.target.value)}
                />
                {errors.fullName && <p className="text-red-500 text-sm">{errors.fullName}</p>}
            </div>

            <div className="flex flex-col gap-2">
                <label className="text-base md:text-lg">Mobile Number</label>
                <div className="flex gap-2">
                    <input
                        type="tel"
                        placeholder="10-digit mobile number"
                        maxLength="10"
                        className="flex-1 h-12 md:h-14 border border-gray-300 px-4 rounded-lg"
                        value={formData.mobileNumber}
                        onChange={(e) => handleInputChange('mobileNumber', e.target.value.replace(/\D/g, ''))}
                        disabled={otpVerified}
                    />
                    {!otpVerified && (
                        <button
                            onClick={sendOTP}
                            className="px-4 md:px-6 h-12 md:h-14 bg-[#7EC1B1] text-white rounded-lg whitespace-nowrap"
                        >
                            {otpSent ? 'Resend' : 'Send OTP'}
                        </button>
                    )}
                    {otpVerified && (
                        <div className="px-4 h-12 md:h-14 bg-green-500 text-white rounded-lg flex items-center">
                            ✓ Verified
                        </div>
                    )}
                </div>
                {errors.mobileNumber && <p className="text-red-500 text-sm">{errors.mobileNumber}</p>}
            </div>

            {otpSent && !otpVerified && (
                <div className="flex flex-col gap-2">
                    <label className="text-base md:text-lg">Enter OTP</label>
                    <div className="flex gap-2">
                        <input
                            type="text"
                            placeholder="6-digit OTP"
                            maxLength="6"
                            className="flex-1 h-12 md:h-14 border border-gray-300 px-4 rounded-lg"
                            value={formData.otp}
                            onChange={(e) => handleInputChange('otp', e.target.value.replace(/\D/g, ''))}
                        />
                        <button
                            onClick={verifyOTP}
                            className="px-4 md:px-6 h-12 md:h-14 bg-green-500 text-white rounded-lg"
                        >
                            Verify
                        </button>
                    </div>
                    {errors.otp && <p className="text-red-500 text-sm">{errors.otp}</p>}
                </div>
            )}

            <div className="flex flex-col gap-2">
                <label className="text-base md:text-lg">Password</label>
                <div className="relative">
                    <input
                        type={showPassword ? "text" : "password"}
                        placeholder="Minimum 6 characters"
                        className="w-full h-12 md:h-14 border border-gray-300 px-4 pr-12 rounded-lg"
                        value={formData.password}
                        onChange={(e) => handleInputChange('password', e.target.value)}
                    />
                    <span
                        className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-gray-500"
                        onClick={() => setShowPassword(!showPassword)}
                    >
                        {showPassword ? <AiOutlineEyeInvisible size={22} /> : <AiOutlineEye size={22} />}
                    </span>
                </div>
                {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
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
                        <label key={service} className="flex items-center gap-3 p-3 border rounded-lg cursor-pointer hover:bg-gray-50">
                            <input
                                type="checkbox"
                                checked={formData.serviceType.includes(service)}
                                onChange={() => handleServiceTypeToggle(service)}
                                className="w-5 h-5 accent-[#7EC1B1]"
                            />
                            <span className="text-base">{service}</span>
                        </label>
                    ))}
                </div>
                {errors.serviceType && <p className="text-red-500 text-sm">{errors.serviceType}</p>}
            </div>

            <div className="flex flex-col gap-2">
                <label className="text-base md:text-lg">Years of Experience</label>
                <input
                    type="number"
                    placeholder="Enter years of experience"
                    min="0"
                    className="h-12 md:h-14 border border-gray-300 px-4 rounded-lg"
                    value={formData.experience}
                    onChange={(e) => handleInputChange('experience', e.target.value)}
                />
                {errors.experience && <p className="text-red-500 text-sm">{errors.experience}</p>}
            </div>
        </div>
    );

    const renderStep3 = () => (
        <div className="w-full max-w-2xl space-y-5">
            <h3 className="text-xl md:text-2xl font-semibold mb-4">Location Details</h3>
            
            <div className="flex flex-col gap-2">
                <label className="text-base md:text-lg">Pincode</label>
                <div className="relative">
                    <input
                        type="text"
                        placeholder="Enter 6-digit pincode"
                        maxLength="6"
                        className="h-12 md:h-14 border border-gray-300 px-4 rounded-lg w-full"
                        value={formData.pincode}
                        onChange={(e) => handlePincodeChange(e.target.value)}
                    />
                    {pincodeLoading && (
                        <div className="absolute right-3 top-1/2 -translate-y-1/2">
                            <div className="w-5 h-5 border-2 border-[#7EC1B1] border-t-transparent rounded-full animate-spin"></div>
                        </div>
                    )}
                </div>
                {errors.pincode && <p className="text-red-500 text-sm">{errors.pincode}</p>}
                {formData.city && formData.state && (
                    <p className="text-green-600 text-sm">✓ Location auto-filled from pincode</p>
                )}
            </div>

            <div className="flex flex-col gap-2">
                <label className="text-base md:text-lg">City</label>
                <input
                    type="text"
                    placeholder="Enter your city"
                    className="h-12 md:h-14 border border-gray-300 px-4 rounded-lg"
                    value={formData.city}
                    onChange={(e) => handleInputChange('city', e.target.value)}
                />
                {errors.city && <p className="text-red-500 text-sm">{errors.city}</p>}
            </div>

            <div className="flex flex-col gap-2">
                <label className="text-base md:text-lg">State</label>
                <input
                    type="text"
                    placeholder="Enter your state"
                    className="h-12 md:h-14 border border-gray-300 px-4 rounded-lg"
                    value={formData.state}
                    onChange={(e) => handleInputChange('state', e.target.value)}
                />
                {errors.state && <p className="text-red-500 text-sm">{errors.state}</p>}
            </div>

            <div className="flex flex-col gap-2">
                <label className="text-base md:text-lg">Service Radius (KM)</label>
                <input
                    type="number"
                    placeholder="How far can you travel for work?"
                    min="1"
                    className="h-12 md:h-14 border border-gray-300 px-4 rounded-lg"
                    value={formData.serviceRadius}
                    onChange={(e) => handleInputChange('serviceRadius', e.target.value)}
                />
                {errors.serviceRadius && <p className="text-red-500 text-sm">{errors.serviceRadius}</p>}
            </div>
        </div>
    );

    const renderStep4 = () => (
        <div className="w-full max-w-2xl space-y-5">
            <h3 className="text-xl md:text-2xl font-semibold mb-4">KYC Verification</h3>
            
            <div className="flex flex-col gap-2">
                <label className="text-base md:text-lg">Aadhaar Number</label>
                <input
                    type="text"
                    placeholder="12-digit Aadhaar number"
                    maxLength="12"
                    className="h-12 md:h-14 border border-gray-300 px-4 rounded-lg"
                    value={formData.aadhaarNumber}
                    onChange={(e) => handleInputChange('aadhaarNumber', e.target.value.replace(/\D/g, ''))}
                />
                {errors.aadhaarNumber && <p className="text-red-500 text-sm">{errors.aadhaarNumber}</p>}
            </div>

            <div className="flex flex-col gap-2">
                <label className="text-base md:text-lg">PAN Number</label>
                <input
                    type="text"
                    placeholder="ABCDE1234F"
                    maxLength="10"
                    className="h-12 md:h-14 border border-gray-300 px-4 rounded-lg uppercase"
                    value={formData.panNumber}
                    onChange={(e) => handleInputChange('panNumber', e.target.value.toUpperCase())}
                />
                {errors.panNumber && <p className="text-red-500 text-sm">{errors.panNumber}</p>}
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-sm">
                <p className="text-blue-800">These documents are required for verification and compliance purposes.</p>
            </div>
        </div>
    );

    const renderStep5 = () => (
        <div className="w-full max-w-2xl space-y-5">
            <h3 className="text-xl md:text-2xl font-semibold mb-4">Payment Details</h3>
            
            <div className="flex flex-col gap-2">
                <label className="text-base md:text-lg">Bank Account Number</label>
                <input
                    type="text"
                    placeholder="Enter account number"
                    className="h-12 md:h-14 border border-gray-300 px-4 rounded-lg"
                    value={formData.bankAccountNumber}
                    onChange={(e) => handleInputChange('bankAccountNumber', e.target.value.replace(/\D/g, ''))}
                />
                {errors.bankAccountNumber && <p className="text-red-500 text-sm">{errors.bankAccountNumber}</p>}
            </div>

            <div className="flex flex-col gap-2">
                <label className="text-base md:text-lg">IFSC Code</label>
                <input
                    type="text"
                    placeholder="SBIN0001234"
                    maxLength="11"
                    className="h-12 md:h-14 border border-gray-300 px-4 rounded-lg uppercase"
                    value={formData.ifscCode}
                    onChange={(e) => handleInputChange('ifscCode', e.target.value.toUpperCase())}
                />
                {errors.ifscCode && <p className="text-red-500 text-sm">{errors.ifscCode}</p>}
            </div>

            <div className="flex flex-col gap-2">
                <label className="text-base md:text-lg">Account Holder Name</label>
                <input
                    type="text"
                    placeholder="As per bank records"
                    className="h-12 md:h-14 border border-gray-300 px-4 rounded-lg"
                    value={formData.accountHolderName}
                    onChange={(e) => handleInputChange('accountHolderName', e.target.value)}
                />
                {errors.accountHolderName && <p className="text-red-500 text-sm">{errors.accountHolderName}</p>}
            </div>

            <div className="flex items-start gap-3 mt-4">
                <input
                    type="checkbox"
                    checked={formData.termsAccepted}
                    onChange={(e) => handleInputChange('termsAccepted', e.target.checked)}
                    className="w-5 h-5 mt-1 accent-[#7EC1B1]"
                />
                <label className="text-sm md:text-base">
                    I accept the terms and conditions and authorize the platform to use my KYC and payment information for verification and payout purposes.
                </label>
            </div>
            {errors.termsAccepted && <p className="text-red-500 text-sm">{errors.termsAccepted}</p>}
        </div>
    );

    return (
        <div className="min-h-screen bg-[#7EC1B1] flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl shadow-xl w-full max-w-4xl p-6 md:p-10">
                <div className="flex flex-col items-center">
                    <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">Service Engineer Registration</h2>
                    <p className="text-gray-600 mb-8 text-center">Complete all steps to start receiving jobs</p>

                    {renderProgressBar()}

                    <div className="w-full flex justify-center mb-8">
                        {step === 1 && renderStep1()}
                        {step === 2 && renderStep2()}
                        {step === 3 && renderStep3()}
                        {step === 4 && renderStep4()}
                        {step === 5 && renderStep5()}
                    </div>

                    <div className="w-full max-w-xs flex gap-4">
                        {step > 1 && (
                            <button
                                onClick={handleBack}
                                className="flex-1 h-12 md:h-14 border-2 border-[#7EC1B1] text-[#7EC1B1] rounded-lg font-semibold"
                            >
                                Back
                            </button>
                        )}
                        <button
                            onClick={handleNext}
                            className="flex-1 h-12 md:h-14 bg-[#7EC1B1] text-white rounded-lg font-semibold"
                        >
                            {step === 5 ? 'Complete Registration' : 'Next'}
                        </button>
                    </div>

                    <div className="flex items-center pt-5">
                        <span>Already have an account?</span>
                        <a className="text-blue-500 hover:underline hover:text-blue-600 pl-2" href="/">Login</a>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SignUp;