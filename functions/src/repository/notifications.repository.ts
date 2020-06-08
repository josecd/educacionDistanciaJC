import * as admin from 'firebase-admin';

const COLLECTION_END = 'notifications';

export async function changeLoanComplete(idLoan: string): Promise<any> {
    return new Promise(async (resolve, reject) => {
        await admin.firestore().collection(`${COLLECTION_END}`).doc(idLoan).update({
            status: 'COMPLETED',
            updated_at: new Date(),
        }).then((r) => resolve(r)).catch(e => reject(e));
    });
}

export async function addNotification(notification: { [x: string]: any; name?: any; idUser?: any; }): Promise<any> {
    return new Promise(async (resolve, reject) => {
        await admin.firestore().collection(`${COLLECTION_END}`).add(notification).then(d => resolve(d)).catch(e => reject(e)); 
    });
}