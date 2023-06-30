// import {Component, OnInit} from "@angular/core";
//
// @Component({
//   selector: 'app-section-task-notifications',
//   templateUrl: './section-task-notifications.component.html',
//   styleUrls: ['./section-task-notifications.component.css']
// })
//
// // @customElement("section-task-notifications-component")
// export class SectionTaskNotificationsComponent implements OnInit {
//   ngOnInit(): void {
//
//   }
//
//   id!: number;
//   private queryId: any;
//
//   constructor(private messagesService: MessagesService, private activatedRoute: ActivatedRoute) {
//   }
//
//   ngOnInit(): void {
//     this.queryId = this.activatedRoute.params.subscribe(params => {
//       this.id = params['id']
//     });
//   }
//
//   @state() denied = Notification.permission === "denied";
//   @state() subscribed = false;
//
//
//   async firstUpdated() {
//     const registration = await navigator.serviceWorker.getRegistration();
//     this.subscribed = !!(await registration?.pushManager.getSubscription());
//     //console.log(this.subscribed);
//   }
//
//   async subscribe() {
//     const notificationPermission = await Notification.requestPermission();
//
//     if (notificationPermission === "granted") {
//       const publicKey = await this.messagesService.getPublicKey();
//       const registration = await navigator.serviceWorker.getRegistration();
//       console.log(registration);
//       const subscription = await registration?.pushManager.subscribe({
//         userVisibleOnly: true,
//         applicationServerKey: this.urlB64ToUint8Array(publicKey),
//       });
//
//       if (subscription) {
//         this.subscribed = true;
//         // Serialize keys uint8array -> base64
//         //this.messagesService.subscribe(JSON.parse(JSON.stringify(subscription)));
//         console.log(JSON.parse(JSON.stringify(subscription)));
//       }
//     } else {
//       this.denied = true;
//     }
//   }
//
//   async unsubscribe() {
//     await this.firstUpdated();
//     const registration = await navigator.serviceWorker.getRegistration();
//     const subscription = await registration?.pushManager.getSubscription();
//     if (subscription) {
//       await subscription.unsubscribe();
//       await this.messagesService.unsubscribe(subscription.endpoint);
//       this.subscribed = false;
//     }
//   }
//
//   private urlB64ToUint8Array(base64String: string | undefined) {
//     let padding = "";
//     if (base64String != null) {
//       padding = "=".repeat((4 - (base64String.length % 4)) % 4);
//     }
//     const base64 = (base64String + padding)
//       .replace(/\-/g, "+")
//       .replace(/_/g, "/");
//     const rawData = window.atob(base64);
//     const outputArray = new Uint8Array(rawData.length);
//     for (let i = 0; i < rawData.length; ++i) {
//       outputArray[i] = rawData.charCodeAt(i);
//     }
//     return outputArray;
//   }
// }
