/*
 * Copyright (C) 2023 by Fonoster Inc (https://fonoster.com)
 * http://github.com/fonoster/goodtok
 *
 * This file is part of Goodtok
 *
 * Licensed under the MIT License (the "License");
 * you may not use this file except in compliance with
 * the License. You may obtain a copy of the License at
 *
 *    https://opensource.org/licenses/MIT
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
import { initVideoWidget } from "./widget";
import { useAuth } from "../../../authentication";
import { VideoProps } from "./types";
import { MicrophoneIcon, PhoneIcon, VideoCameraIcon } from "@heroicons/react/24/outline";

export default function Video({ inviteInfo }: VideoProps) {
  const { client } = useAuth() as any;

  if (inviteInfo) initVideoWidget(client, inviteInfo);

  return (
    <div className="video-container">
      <video id="goodtok-video" width="100%" className="video-area">
        <p>Your browser doesn't support HTML5 video.</p>
      </video>
      <div className="controls">
        <button
          type="button"
          id="goodtok-call"
          className="rounded-full bg-gray-600 focus-visible:outline-gray-600 hover:bg-gray-500 p-1 text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
        >
          <PhoneIcon className="h-5 w-5" aria-hidden="true" />
        </button>
        <button
          type="button"
          id="goodtok-mute-audio"
          className="rounded-full bg-gray-600 focus-visible:outline-gray-600 hover:bg-gray-500 p-1 text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
        >
          <MicrophoneIcon className="h-5 w-5" aria-hidden="true" />
        </button>
        <button
          type="button"
          id="goodtok-mute-video"
          className="rounded-full bg-gray-600 focus-visible:outline-gray-600 hover:bg-gray-500 p-1 text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
        >
          <VideoCameraIcon className="h-5 w-5" aria-hidden="true" />
        </button>
      </div>

      <audio className="audio-container" id="goodtok-audio" controls>
        <p>Your browser doesn't support HTML5 audio.</p>
      </audio>

      <style>{`
        .audio-container {
          display: none;
        }

        .video-container {
          width: 100%;
          height: 50vh;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          margin-bottom: 20px;
        }

        .video-area {
          width: 100%;
          height: 50vh;
          border-radius: 10px;
          background-color: #1f1f1f;
          position: relative;
        }

        .controls {
          margin-top: 10px;
          gap: 30px;
          display: flex;
        }

        .control-btn:hover {
          background-color: #ffffff20;
        }

        .clip-icon {
          width: 20px;
          height: 20px;
          cursor: pointer;
        }
      `}</style>
    </div>
  );
}
