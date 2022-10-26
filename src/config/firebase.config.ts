// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import getConfig from "next/config";
const { publicRuntimeConfig } = getConfig();
// import { getAuth } from "firebase/auth";
const firebaseConfig = {
    apiKey: publicRuntimeConfig.apiKey,
    authDomain: publicRuntimeConfig.authDomain,
    projectId: publicRuntimeConfig.projectId,
    storageBucket: publicRuntimeConfig.storageBucket,
    messagingSenderId: publicRuntimeConfig.messagingSenderId,
    appId: publicRuntimeConfig.appId,
    measurementId: publicRuntimeConfig.measurementId,
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

export const initFirebase = () => {
    return app
}
