export interface AuthResponseData {
    kind: string;
    idToken: string;
    email: string;
    refreshToken: string;
    expiresIn: string;
    localId: string;
    registered?: boolean
}

export interface User {
    email: string,
    id: string,
    token: string,
    _tokenExpirationDate: Date
}
