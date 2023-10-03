import { Web } from "sip.js";
import {
  getVideoLogoSVG,
  getVideoSVG,
  getPhoneSVG,
  getVideoSlashSVG,
  getMicrophoneSVG,
  getMicrophoneSlashSVG,
  getCalendarSVG,
  getVideoDarkSVG,
  getCloseWidgetVG
} from "./icons";
import { shadowRootContent } from "./shadowRootContent";
import { mediaToggle } from "./utils";
import { getConnectionObject } from "./connection";

class GoodTokComponent extends HTMLElement {
  
  constructor() {
    super();
    const shadowRoot = this.attachShadow({ mode: 'open' });
    shadowRoot.innerHTML = shadowRootContent
    this.initGoodTok();
  }

  initGoodTok() {
    const connectionObject = getConnectionObject(this.ownerDocument);

    // Control elements
    const phoneButton = this.shadowRoot.querySelector("#goodtok-phone");
    const microphoneButton = this.shadowRoot.querySelector("#goodtok-microphone");
    const cameraButton = this.shadowRoot.querySelector("#goodtok-camera");
    const meetNow = this.shadowRoot.querySelector("#goodtok-meet-now");
    const calendarIcon = this.shadowRoot.querySelector("#goodtok-calendar-icon");
    const meetNowIcon = this.shadowRoot.querySelector("#goodtok-meet-now-icon");
    const closeWidgetBtn = this.shadowRoot.querySelector(".close-widget-btn");

    // Media elements
    const audioElement = this.shadowRoot.querySelector("#goodtok-audio") as HTMLAudioElement;
    const videoElement = this.shadowRoot.querySelector("#goodtok-video") as HTMLVideoElement;

    // Toggle button
    const toggleButton = this.shadowRoot.querySelector("#toggle-btn");
    const goodTokWrapper = this.shadowRoot.querySelector(".wrapper");
    const chatWidget = this.shadowRoot.querySelector("#chat-widget");
    toggleButton.innerHTML = getVideoLogoSVG();

    // Set icons
    microphoneButton.innerHTML = getMicrophoneSVG();
    cameraButton.innerHTML = getVideoSVG();
    phoneButton.innerHTML = getPhoneSVG();
    calendarIcon.innerHTML = getCalendarSVG();
    meetNowIcon.innerHTML = getVideoDarkSVG();
    closeWidgetBtn.innerHTML = getCloseWidgetVG();

    // Initial state
    let microphoneEnabled = true;
    let cameraEnabled = true;

    toggleButton.addEventListener("click", () => {
      const toggleBtn = toggleButton as HTMLButtonElement;
      const chatWidgetBtn = chatWidget as HTMLElement | HTMLDivElement;
      chatWidgetBtn.style.display = "block";
      toggleBtn.style.display = "none";
    });

    const options: Web.SimpleUserOptions = {
      aor: connectionObject.aor,
      media: {
        constraints: { audio: true, video: true },
        remote: {
          audio: audioElement,
          video: videoElement
        }
      }
    };

    const simpleUser = new Web.SimpleUser(connectionObject.signalingServer, options);

    const delegate: Web.SimpleUserDelegate = {
      onCallReceived: () => {
        simpleUser.answer();
      },
      onCallAnswered: () => {
        const wrapper = goodTokWrapper as HTMLElement | HTMLDivElement;
        const toggleBtn = toggleButton as HTMLButtonElement;
        wrapper.style.display = "block";
        toggleBtn.style.display = "none";
      },
      onCallHangup: () => {
        const toggleBtn = toggleButton as HTMLButtonElement;
        const wrapper = goodTokWrapper as HTMLElement | HTMLDivElement;
        wrapper.style.display = "none";
        toggleBtn.style.display = "block";
      },
    }

    simpleUser.delegate = delegate;

    phoneButton.addEventListener("click", async () => {
      const toggleBtn = toggleButton as HTMLButtonElement;
      const wrapper = goodTokWrapper as HTMLElement | HTMLDivElement;
      wrapper.style.display = "none";
      toggleBtn.style.display = "block"; // Show the logo when the component is hidden
      await simpleUser.hangup();
    });

    cameraButton.addEventListener("click", () => {
      if (cameraEnabled) {
        cameraEnabled = false;
        cameraButton.innerHTML = getVideoSlashSVG();
        mediaToggle(simpleUser, false, "video")
      } else {
        cameraEnabled = true;
        cameraButton.innerHTML = getVideoSVG();
        mediaToggle(simpleUser, true, "video")
      }
    })

    microphoneButton.addEventListener("click", () => {
      if (microphoneEnabled) {
        microphoneEnabled = false;
        microphoneButton.innerHTML = getMicrophoneSlashSVG();
        mediaToggle(simpleUser, false, "audio")
      } else {
        microphoneEnabled = true;
        microphoneButton.innerHTML = getMicrophoneSVG();
        mediaToggle(simpleUser, true, "audio")
      }
    })

    meetNow.addEventListener("click", () => {
      alert("Your meettings has been scheduled. The next available agent will contact you shortly.");

      console.log("Sending registration message and adding user to the queue");
      const toggleBtn = toggleButton as HTMLButtonElement;
      const chatWidgetBtn = chatWidget as HTMLElement | HTMLDivElement;

      toggleBtn.style.display = "block";
      chatWidgetBtn.style.display = "none";

      simpleUser.connect()
        .then(() => {
          simpleUser.register({ 
            requestOptions: { 
              extraHeaders: [`X-Connect-Token: ${connectionObject.token}`] 
            } 
          });
        })
        .catch((error: Error) => {
          console.error("Failed to connect to server");
        });
    })

    closeWidgetBtn.addEventListener("click", () => {
      const toggleBtn = toggleButton as HTMLButtonElement;
      const chatWidgetBtn = chatWidget as HTMLElement | HTMLDivElement;
      toggleBtn.style.display = "block";
      chatWidgetBtn.style.display = "none";
    })
  }
}

export default GoodTokComponent;
