export interface SurveyData {
    occupation: string,
    income: string
    education: string
    email: string,
    userId: UserId,
    _id: string
}

interface UserId {
    _id: string,
    name: string,
    email: string,
    phone: string,
    dob: string,
    address: Address,
    role: string,
    password: boolean,
    is_blocked: string,
    create_at: string,
    _v: string
}

interface Address {
    state: string,
    country: string
}