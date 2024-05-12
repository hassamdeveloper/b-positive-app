import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthService } from './auth.service';
import {
  collection,
  getDocs,
  doc,
  where,
  query,
  orderBy,
  setDoc,
  addDoc,
} from 'firebase/firestore';
import { getFirestore } from 'firebase/firestore';
import { environment } from 'src/environments/environment';
import { initializeApp } from '@firebase/app';
import { GlobalService } from './global.service';
export interface Message {
  senderId: string;
  receiverId: string;
  message: string;
  timestamp: number;
}
const app = initializeApp(environment.firebaseConfig);
const db = getFirestore(app);
@Injectable({
  providedIn: 'root',
})
export class ChatService {
  private messagesCollection: Message;

  constructor(private authService: AuthService, private global: GlobalService) {
    // this.messagesCollection = afs.collection<Message>('messages');
    // this.get();
  }
  async get(senderId:any, receiverId:any) {
    const docRef = doc(db, "messages", "messages");
    const querySnapshot = await getDocs(collection(db, "messages"));
      console.log("🚀 ~ file: chat.service.ts:32 ~ ChatService ~ get ~ querySnapshot:", querySnapshot.docs)
      const messages: Message[] = [];
      querySnapshot.docs.forEach((doc:any) => {
        // const filter = doc.filter(doc => {
        //   console.log("🚀 ~ file: chat.service.ts:44 ~ ChatService ~ querySnapshot.docs.forEach ~ filter:", filter)
        //   return doc.data().id === senderId && doc.data().id === receiverId
        // })
        messages.push({ id: doc.id, ...doc.data() } as Message);
      });
          this.global.set_fireChat(messages)
  }

  // Get Messages with Condition
  async getMessages(senderId: string, receiverId: string) {
    console.log(senderId, receiverId);
    const q = query(
      collection(db, 'messages'),
      where('senderId', '==', senderId),
      where('receiverId', '==', receiverId),
      orderBy('timestamp')
    );
    const querySnapshot = await getDocs(q);
    const messages: Message[] = [];
    console.log(
      '🚀 ~ file: chat.service.ts:32 ~ ChatService ~ get ~ querySnapshot:',
      querySnapshot
    );
    // querySnapshot.docs.forEach((doc:any) => {
    //   messages.push({ id: doc.id, ...doc.data() } as Message);
    // });
    //     this.global.set_fireChat(messages)
  }

  // Send Message
  async sendMessage(
    senderId: string,
    receiverId: string,
    message: string
  ): Promise<void> {
    console.log('sendMessage', senderId, receiverId)
    const timestamp = Date.now();
    try {
      const docRef = await setDoc(doc(db, 'messages',`${timestamp}`), {
        senderId: `${senderId}`,
        receiverId: `${receiverId}`,
        message: `${message}`,
        timestamp: `${timestamp}`,
      });
      console.log('Document written with ID: ', docRef);
    } catch (e) {
      console.error('Error adding document: ', e);
    }
  }
  async getChatPartners(userId: string) {
    const q = query(
      collection(db, 'messages'),
      where('senderId', '==', userId)
    );
    const querySnapshot = await getDocs(q).then((docs) => {
      // const messages: Message[] = [];
       
      //   docs.forEach((doc:any) => {
      //     messages.push({ id: doc.id, ...doc.data() } as Message);
      //   });
      //   this.global.set_fireChat(messages)
        //  console.log("🚀 ~ file: chat.service.ts:92 ~ ChatService ~ querySnapshot ~ messages:", messages)
        // return messages;
    })
    .then(async (messages) => {
        const q = query(
          collection(db, 'messages'),
          where('receiverId', '==', userId)
        );
        const querySnapshot = await getDocs(q).then((docs) => {
          const messages: Message[] = [];
            docs.forEach((doc:any) => {
              messages.push({ id: doc.id, ...doc.data() } as Message);
            });
            
            return messages;
    })
    .then((messages) => {
      messages.sort((a, b) => b.timestamp - a.timestamp);
      return messages;
    })
    .then((messages) => {
      messages.sort((a, b) => b.timestamp - a.timestamp);
      return messages;
    });
    })
  }
}
