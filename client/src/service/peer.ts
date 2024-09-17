class PeerService {
  peer: RTCPeerConnection | null = null;
  constructor() {
    if (!this.peer) {
      this.peer = new RTCPeerConnection({
        iceServers: [
          {
            urls: [
              "stun:stun.l.google.com:19302",
              "stun:global.stun.twilio.com:3478",
            ],
          },
        ],
      });
    }
  }

  async getAnswer(offer: any) {
    if (this.peer) {
      await this.peer.setRemoteDescription(offer);
      const ans = await this.peer.createAnswer();
      await this.peer.setLocalDescription(new RTCSessionDescription(ans));
      return ans;
    }
  }

  async setLocalDescription(ans: any) {
    if (this.peer) {
      await this.peer.setRemoteDescription(new RTCSessionDescription(ans));
    }
  }

  async getOffer() {
    if (this.peer) {
      const offer = await this.peer.createOffer();
      await this.peer.setLocalDescription(new RTCSessionDescription(offer));
      return offer;
    }
  }
}

export default new PeerService();
// class PeerService {
//   peer: RTCPeerConnection | null = null;
//   localStream: MediaStream | null = null;
//   remoteStream: MediaStream | null = null;

//   constructor() {
//     if (!this.peer) {
//       this.peer = new RTCPeerConnection({
//         iceServers: [
//           {
//             urls: [
//               "stun:stun.l.google.com:19302",
//               "stun:global.stun.twilio.com:3478",
//             ],
//           },
//         ],
//       });

//       // Setup peer event handlers (e.g., for receiving remote streams)
//       this.peer.ontrack = (event) => {
//         this.handleRemoteTrack(event);
//       };
//     }
//   }

//   // Method to handle incoming remote tracks
//   handleRemoteTrack(event: RTCTrackEvent) {
//     if (!this.remoteStream) {
//       this.remoteStream = new MediaStream();
//     }
//     event.streams[0].getTracks().forEach((track) => {
//       this.remoteStream?.addTrack(track);
//     });
//     console.log("Remote stream added: ", this.remoteStream);
//   }

//   // Method to attach the local stream
//   setLocalStream(stream: MediaStream) {
//     this.localStream = stream;
//     stream.getTracks().forEach((track) => {
//       this.peer?.addTrack(track, stream);
//     });
//     console.log("Local stream set: ", stream);
//   }

//   // Method to toggle the microphone
//   toggleAudio(micOn: boolean) {
//     if (this.localStream) {
//       const audioTrack = this.localStream.getAudioTracks()[0];
//       if (audioTrack) {
//         audioTrack.enabled = micOn;
//         console.log(
//           "Audio track state: ",
//           audioTrack.enabled ? "enabled" : "disabled",
//         );
//       }
//     }
//   }

//   // Method to toggle the video
//   toggleVideo(videoOn: boolean) {
//     if (this.localStream) {
//       const videoTrack = this.localStream.getVideoTracks()[0];
//       if (videoTrack) {
//         videoTrack.enabled = videoOn;
//         console.log(
//           "Video track state: ",
//           videoTrack.enabled ? "enabled" : "disabled",
//         );
//       }
//     }
//   }

//   // Peer connection related methods
//   async getAnswer(offer: any) {
//     if (this.peer) {
//       await this.peer.setRemoteDescription(offer);
//       const ans = await this.peer.createAnswer();
//       await this.peer.setLocalDescription(new RTCSessionDescription(ans));
//       return ans;
//     }
//   }

//   async setLocalDescription(ans: any) {
//     if (this.peer) {
//       await this.peer.setRemoteDescription(new RTCSessionDescription(ans));
//     }
//   }

//   async getOffer() {
//     if (this.peer) {
//       const offer = await this.peer.createOffer();
//       await this.peer.setLocalDescription(new RTCSessionDescription(offer));
//       return offer;
//     }
//   }
// }

// export default new PeerService();
