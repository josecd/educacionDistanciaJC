import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//
admin.initializeApp();


exports.addAdmin = functions.https.onCall((data, context) => {
    const dataid = new Date().toISOString();
    const email = data.text.email;
    const name = data.text.name;
    const type = data.text.type;
    const startPassword = data.text.startPassword;
    const idGroup = data.text.idGroup;
    return admin.auth().createUser({

        email: email,
        emailVerified: false,
        password: startPassword,
        displayName: name

    }).then(async function (userRecord) {

        if (type === 'STUDENT') {
            await admin.firestore().collection('users').doc(userRecord.uid).set({
                created_at: new Date(),
                updated_at: new Date(),
                startPassword: startPassword,
                email: email,
                type: type,
                name: name,
                isDeleted: false,
                idGroup: idGroup,
                _id: userRecord.uid,
                idGroupStudent: dataid,
            }).catch(error => {
                console.log('falle', error)
            })
            await admin.firestore().collection('groups').doc(idGroup).collection('students').doc(dataid).set({
                created_at: new Date(),
                updated_at: new Date(),
                _id: dataid,
                name: name,
                idGroup: idGroup,
                idUser: userRecord.uid
            }).catch(error => {
                console.log('Fallo ', error);

            })
        } else {
            await admin.firestore().collection('users').doc(userRecord.uid).set({
                created_at: new Date(),
                updated_at: new Date(),
                startPassword: startPassword,
                email: email,
                type: type,
                name: name,
                isDeleted: false,
                _id: userRecord.uid,
            }).catch(error => {
                console.log('falle', error)
            })

        }

        return { success: 'Nuevo usuario creado' };

    }).catch(error => {
        console.log("Error creating new user:", error);
        return { error: error.message };
    });

});

exports.updateUser = functions.firestore.document('users/{usuarioId}').onUpdate(event => {

    console.log(event.after.data());

    const data = event.after.data();
    if (data) {

        if (data._id && data.email) {
            const _id = data._id;
            const email = data.email;
            const displayName = data.name

            return admin.auth().updateUser(_id, {
                email: email,
                emailVerified: false,
                displayName: displayName,
            }).then(function (userRecord) {
                console.log("Successfully update user:", userRecord.uid);

                return 1;
            }).catch(function (error) {
                console.log("Error creating new user:", error);
                return { error: error }
            });
        } else {
            return null;
        }
    }
    return 1;

});
exports.deleteUser = functions.firestore.document('users/{usuarioId}').onDelete(async event => {

    const deleteUser = event.data();
    if (deleteUser) {
        const _id = deleteUser._id;
        return admin.auth().deleteUser(_id)
            .then(function (userRecord) {
                if (deleteUser.type === 'STUDENT') {
                    admin.firestore().collection('groups').doc(deleteUser.idGroup).collection('students').doc(deleteUser.idGroupStudent).delete().then(res => {
                        console.log('Correcto', res);
                    }).catch(error => {
                        console.warn('Fallo', error);
                    })
                }
                console.log("Successfully delete user:");
            }).catch(function (error) {
                console.log("Error creating new user:", error);
            });

    } else {
        return { error: 'data undefined' }
    }
});
