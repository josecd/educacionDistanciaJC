export interface INotification {
    idUser?: string;
    type: 'LOAN_REQUEST' | 'LOAN_UPDATE';
    role: 'ADMIN' | 'USER';
    payload?: any;
    created_at: Date;
    updated_at: Date;
    viewed: boolean;
}