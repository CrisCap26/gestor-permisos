import crypto from 'crypto'

export function hashPassword(password: string) {
    return crypto.createHash('sha256').update(password).digest('hex');
}

export function comparePasswords(plainPassword: string, hashedPassword: string) {
    const hashedPlainPassword = hashPassword(plainPassword);
    return hashedPlainPassword === hashedPassword;
}
