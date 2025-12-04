import React, { useState, useRef, useEffect } from 'react';
import { User, Camera, Upload, Save, MapPin, Mail, Phone, X } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import '../css/Settings.css';

const Settings = () => {
    const { user, updateUser } = useAuth();
    const [isLoading, setIsLoading] = useState(false);
    const [showCamera, setShowCamera] = useState(false);
    const [showUploadOptions, setShowUploadOptions] = useState(false);
    const videoRef = useRef(null);
    const fileInputRef = useRef(null);

    // Form State
    const [formData, setFormData] = useState({
        name: user?.name || '',
        email: user?.email || '',
        phone: user?.phone || '',
        address: user?.address || '',
        city: user?.city || '',
        state: user?.state || '',
        zip: user?.zip || '',
        country: user?.country || '',
        avatar: user?.avatar || null
    });

    // Update form when user data loads
    useEffect(() => {
        if (user) {
            setFormData(prev => ({
                ...prev,
                name: user.name || '',
                email: user.email || '',
                avatar: user.avatar || null
            }));
        }
    }, [user]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleFileSelect = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setFormData(prev => ({ ...prev, avatar: reader.result }));
                setShowUploadOptions(false);
            };
            reader.readAsDataURL(file);
        }
    };

    const startCamera = async () => {
        setShowCamera(true);
        setShowUploadOptions(false);
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ video: true });
            if (videoRef.current) {
                videoRef.current.srcObject = stream;
            }
        } catch (err) {
            console.error("Error accessing camera:", err);
            alert("Could not access camera");
            setShowCamera(false);
        }
    };

    const capturePhoto = () => {
        const video = videoRef.current;
        const canvas = document.createElement('canvas');
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        canvas.getContext('2d').drawImage(video, 0, 0);
        const imageUrl = canvas.toDataURL('image/jpeg');

        setFormData(prev => ({ ...prev, avatar: imageUrl }));
        stopCamera();
    };

    const stopCamera = () => {
        const stream = videoRef.current?.srcObject;
        const tracks = stream?.getTracks();
        tracks?.forEach(track => track.stop());
        setShowCamera(false);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 1000));

        // Update user context
        updateUser(formData);

        setIsLoading(false);
    };

    return (
        <div className="settings-page section-padding">
            <div className="container">
                <div className="settings-header mb-8">
                    <h1>Account Settings</h1>
                    <p className="text-muted">Manage your profile and preferences</p>
                </div>

                <div className="settings-grid">
                    {/* Profile Image Section */}
                    <div className="settings-card profile-card">
                        <div className="profile-image-wrapper">
                            <div className="profile-image">
                                {formData.avatar ? (
                                    <img src={formData.avatar} alt="Profile" />
                                ) : (
                                    <User size={64} className="default-avatar" />
                                )}
                            </div>
                            <button
                                className="btn-icon-upload"
                                onClick={() => setShowUploadOptions(!showUploadOptions)}
                            >
                                <Camera size={20} />
                            </button>

                            {showUploadOptions && (
                                <div className="upload-options-menu">
                                    <button onClick={() => fileInputRef.current.click()}>
                                        <Upload size={16} /> Upload from Device
                                    </button>
                                    <button onClick={startCamera}>
                                        <Camera size={16} /> Take Photo
                                    </button>
                                </div>
                            )}
                            <input
                                type="file"
                                ref={fileInputRef}
                                hidden
                                accept="image/*"
                                onChange={handleFileSelect}
                            />
                        </div>
                        <div className="profile-info text-center mt-4">
                            <h3>{formData.name || 'User Name'}</h3>
                            <p className="text-muted">{formData.email || 'user@example.com'}</p>
                        </div>
                    </div>

                    {/* Camera Modal */}
                    {showCamera && (
                        <div className="camera-modal">
                            <div className="camera-content">
                                <video ref={videoRef} autoPlay playsInline></video>
                                <div className="camera-controls">
                                    <button className="btn btn-primary" onClick={capturePhoto}>Capture</button>
                                    <button className="btn btn-outline" onClick={stopCamera}>Cancel</button>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Form Section */}
                    <form className="settings-form" onSubmit={handleSubmit}>
                        <div className="settings-card">
                            <h3 className="card-title mb-6">Personal Information</h3>
                            <div className="form-grid">
                                <div className="form-group">
                                    <label>Full Name</label>
                                    <div className="input-wrapper">
                                        <User size={18} className="input-icon" />
                                        <input
                                            type="text"
                                            name="name"
                                            value={formData.name}
                                            onChange={handleChange}
                                            className="form-input"
                                        />
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label>Email Address</label>
                                    <div className="input-wrapper">
                                        <Mail size={18} className="input-icon" />
                                        <input
                                            type="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            className="form-input"
                                            disabled // Often email is not editable directly
                                        />
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label>Phone Number</label>
                                    <div className="input-wrapper">
                                        <Phone size={18} className="input-icon" />
                                        <input
                                            type="tel"
                                            name="phone"
                                            value={formData.phone}
                                            onChange={handleChange}
                                            className="form-input"
                                            placeholder="+1 (555) 000-0000"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="settings-card mt-6">
                            <h3 className="card-title mb-6">Address Details</h3>
                            <div className="form-grid">
                                <div className="form-group full-width">
                                    <label>Street Address</label>
                                    <div className="input-wrapper">
                                        <MapPin size={18} className="input-icon" />
                                        <input
                                            type="text"
                                            name="address"
                                            value={formData.address}
                                            onChange={handleChange}
                                            className="form-input"
                                            placeholder="123 Main St"
                                        />
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label>City</label>
                                    <input
                                        type="text"
                                        name="city"
                                        value={formData.city}
                                        onChange={handleChange}
                                        className="form-input"
                                    />
                                </div>
                                <div className="form-group">
                                    <label>State</label>
                                    <input
                                        type="text"
                                        name="state"
                                        value={formData.state}
                                        onChange={handleChange}
                                        className="form-input"
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Zip Code</label>
                                    <input
                                        type="text"
                                        name="zip"
                                        value={formData.zip}
                                        onChange={handleChange}
                                        className="form-input"
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Country</label>
                                    <input
                                        type="text"
                                        name="country"
                                        value={formData.country}
                                        onChange={handleChange}
                                        className="form-input"
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="form-actions mt-8">
                            <button type="submit" className="btn btn-primary btn-lg" disabled={isLoading}>
                                {isLoading ? 'Saving...' : (
                                    <>
                                        <Save size={20} /> Save Changes
                                    </>
                                )}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Settings;
