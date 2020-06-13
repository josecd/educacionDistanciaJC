export interface ITask {
    _id?: string;
    name?: string;
    idGroup?: string;
    idSubjectByGroup?: string;
    idTeacher?: string;
    type?: 'TASK'|'VIDEO'|'PROYECT'|'DIRECTO';
    created_at?: Date;
    updated_at?: Date;
    isDeleted?: boolean;
    status?: 'ACTIVO' | 'FINALIZADO';
    dataTeacher?: any;
    dataGRoup?: any;
}
