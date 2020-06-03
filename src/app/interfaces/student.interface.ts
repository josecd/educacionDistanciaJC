export interface Istudent {
    _id?: string;
    name?: string;
    phoneNumber?: string;
    type?: 'STUDENT'|'TEACHER'|'ADMIN';
    created_at?: Date;
    updated_at?: Date;
    isDeleted?: boolean;
    status?: 'ACTIVE' | 'INACTIVE';
}
