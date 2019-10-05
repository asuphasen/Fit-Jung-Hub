import * as firebase from 'firebase';
export interface User {
    id: string;
    firstname: string;
    lastname: string;
    birthday: string;
    about: string;
    image_url: string;
    email: string;
    idcard: string;
    sex: string;
    weight: string;
    height: string;
    type: string;
    food: string;
    age: string;
    address: {
        location: any;
        place: string;
        name: string;
    },
    contact: {
        facebook: string;
        line: string;
        phone: string;
    }
    verify: boolean;
    uid: string;
    role: string
}

export const UserInit = {
    id: "",
    firstname: "",
    lastname: "",
    birthday: "",
    about: "",
    image_url: "https://firebasestorage.googleapis.com/v0/b/fitjunghub.appspot.com/o/images%2Ffitjunghub%2Fdefule.jpg?alt=media&token=642f7543-cbcc-47cf-acea-e9d6e90fe51f",
    email: "",
    idcard: "",
    sex: "",
    weight: "",
    height: "",
    type: "",
    food: "",
    age: "",
    address: {
        location: {},
        place: "",
        name: "",
    },
    contact: {
        facebook: "",
        line: "",
        phone: "",
    },
    verify: true,
    uid: "",
    role:''
}


export interface Comment {
    comment: string;
    date: string;
    username: string;
    trainerid: string;
    timestamp:firebase.firestore.Timestamp;
}

export const CommentInit = {
    comment: "",
    date: "",
    username: "",
    trainerid: "",
    timestamp:null
}