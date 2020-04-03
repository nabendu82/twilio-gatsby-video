import React, { useState, useRef, useEffect } from "react"
import TwilioVideo from "twilio-video"
import StartForm from "../components/start-form"
import Layout from "../components/layout"
import SEO from "../components/seo"

const Video = ({ token }) => {
  const localVidRef = useRef()
  const remoteVidRef = useRef()

  useEffect(() => {
    TwilioVideo.connect(token, { video: true, audio: true, name: "test" }).then(
      room => {
        // Attach the local video
        TwilioVideo.createLocalVideoTrack().then(track => {
          localVidRef.current.appendChild(track.attach())
        })

        const addParticipant = participant => {
          console.log("new participant!")
          console.log(participant)
          participant.tracks.forEach(publication => {
            if (publication.isSubscribed) {
              const track = publication.track

              remoteVidRef.current.appendChild(track.attach())
              console.log("attached to remote video")
            }
          })

          participant.on("trackSubscribed", track => {
            console.log("track subscribed")
            remoteVidRef.current.appendChild(track.attach())
          })
        }

        room.participants.forEach(addParticipant)
        room.on("participantConnected", addParticipant)
      }
    )
  }, [token])

  return (
    <div>
      <div ref={localVidRef} />
      <div ref={remoteVidRef} />
    </div>
  )
}

const IndexPage = () => {
  const [token, setToken] = useState(false);
  return (
    <Layout>
    <SEO title="Home" />
    {!token ? <StartForm storeToken={setToken} /> : <Video token={token} />}
  </Layout>
  )
}

export default IndexPage
