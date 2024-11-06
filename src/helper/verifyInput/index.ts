export const isValidPassword = (password: string) => {
  // Password validation regex: At least 8 characters, one letter, one number, one special character
  const passwordPattern =
    /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  return passwordPattern.test(password);
};

export const isValidPhone = (phone: string) => {
  // Password validation regex: At least 8 characters, one letter, one number, one special character
  const phonePattern = /^[0-9]{10,11}$/;
  return phonePattern.test(phone);
};
