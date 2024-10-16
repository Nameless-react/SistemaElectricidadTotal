import * as admin from 'firebase-admin';
import serviceAccount from './et-001-firebase-adminsdk-fuypa-e0325d382d.json';

if (!admin.apps.length) {
    admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),
        storageBucket: 'et-001.appspot.com'
    });
}

const bucket = admin.storage().bucket();
export { admin, bucket };