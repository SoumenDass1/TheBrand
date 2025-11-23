// Email validation
export const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
};

// Password validation
export const validatePassword = (password) => {
    const errors = [];

    if (password.length < 8) {
        errors.push('Password must be at least 8 characters long');
    }

    if (!/[A-Z]/.test(password)) {
        errors.push('Password must contain at least one uppercase letter');
    }

    if (!/[a-z]/.test(password)) {
        errors.push('Password must contain at least one lowercase letter');
    }

    if (!/\d/.test(password)) {
        errors.push('Password must contain at least one number');
    }

    return {
        isValid: errors.length === 0,
        errors
    };
};

// Password strength calculator
export const getPasswordStrength = (password) => {
    let strength = 0;

    if (password.length >= 8) strength++;
    if (password.length >= 12) strength++;
    if (/[a-z]/.test(password)) strength++;
    if (/[A-Z]/.test(password)) strength++;
    if (/\d/.test(password)) strength++;
    if (/[^a-zA-Z\d]/.test(password)) strength++; // Special characters

    if (strength <= 2) return { level: 'weak', color: '#ff4444', percentage: 33 };
    if (strength <= 4) return { level: 'medium', color: '#ffa500', percentage: 66 };
    return { level: 'strong', color: '#00c851', percentage: 100 };
};

// Name validation
export const isValidName = (name) => {
    return name && name.trim().length >= 2;
};
