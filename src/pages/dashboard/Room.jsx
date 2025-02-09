import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import { ZegoUIKitPrebuilt } from "@zegocloud/zego-uikit-prebuilt";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useUsers from "../../hooks/useUser";
import Swal from "sweetalert2";

const Room = () => {
  const { roomId } = useParams();
  const axiosSecure = useAxiosSecure();
  const [appointment, setAppointment] = useState(null);
  const meetingContainer = useRef(null);
  const navigate = useNavigate();
  const [users] = useUsers();

  useEffect(() => {
    if (!roomId) {
      console.error("Room ID is missing in URL");
      // alert("Invalid room ID.");
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Invalid room ID.",
        // footer: '<a href="#">Why do I have this issue?</a>'
      });
      navigate("/dashboard");
      return;
    }

    // Fetch the appointment details for the provider using the roomId
    axiosSecure
      .get(`/appointment/${roomId}`)
      .then((res) => {
        setAppointment(res.data);
        // console.log("Fetched appointment:", res.data); // Debugging
      })
      .catch((err) => {
        // console.error("Error fetching appointment:", err);
        // alert("Failed to fetch appointment data.");
        if (err) {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Failed to fetch appointment data.!",
            // footer: '<a href="#">Why do I have this issue?</a>'
          });
        }
      });
  }, [axiosSecure, roomId, navigate]);

  useEffect(() => {
    if (!appointment || !users || !meetingContainer.current) {
      return;
    }

    const appID = Number(import.meta.env.VITE_ZIGO_APPID);
    const serverSecret = import.meta.env.VITE_ZIGO_SERVERSECRET;

    if (!appID || !serverSecret) {
      // console.error("Zego appID or ServerSecret is missing.");
      return;
    }

    try {
      let providerKitToken = "";
      let userKitToken = "";

      // If the user is a provider, generate provider token
      if (users.role === "provider") {
        providerKitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(
          appID,
          serverSecret,
          roomId,
          users._id,
          users.name
        );

        // Send the request to update the appointment status in the database when the provider joins
        const appointmentUpdateInfo = {
          appointmentId: appointment._id,
          status: "in-progress",
          userMeetingLink: `http://localhost:5173/room/${roomId}`,
        };

        axiosSecure
          .patch("/appointments", appointmentUpdateInfo)
          .then((response) => {
            console.log("Appointment updated:", response.data);
          })
          .catch((error) => {
            console.error("Error updating appointment:", error);
          });
      } else {
        // If the user is not a provider, generate user token
        userKitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(
          appID,
          serverSecret,
          roomId,
          users._id,
          users.name
        );
      }

      if (meetingContainer.current) {
        const providerMeetingInstance = providerKitToken
          ? ZegoUIKitPrebuilt.create(providerKitToken)
          : null;

        const userMeetingInstance = userKitToken
          ? ZegoUIKitPrebuilt.create(userKitToken)
          : null;

        if (userMeetingInstance) {
          userMeetingInstance.joinRoom({
            container: meetingContainer.current,
            // sharedLinks: [
            //   {
            //     name: "Copy Link",
            //     url: `http://localhost:5173/room/${roomId}`,
            //   },
            // ],
            scenario: {
              mode: ZegoUIKitPrebuilt.OneONoneCall,
            },
            showScreenSharingButton: false,
            onUserLeft: () => {
              userMeetingInstance.destroy();
              navigate("/dashboard");
            },
          });
        }

        if (providerMeetingInstance) {
          providerMeetingInstance.joinRoom({
            container: meetingContainer.current,
            // sharedLinks: [
            //   {
            //     name: "Copy Link",
            //     url: `http://localhost:5173/room/${roomId}`,
            //   },
            // ],
            scenario: {
              mode: ZegoUIKitPrebuilt.OneONoneCall,
            },
            showScreenSharingButton: false,
            onUserLeft: () => {
              providerMeetingInstance.destroy();
              navigate("/dashboard");
            },
          });
        }

        return () => {
          if (userMeetingInstance) {
            userMeetingInstance.destroy();
          }
          if (providerMeetingInstance) {
            providerMeetingInstance.destroy();
          }
        };
      } else {
        console.error("Meeting container not available.");
      }
    } catch (error) {
      // console.error("Error initializing Zego meeting:", error);
      // alert("Failed to initialize meeting.");
      if (error) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Failed to initialize meeting.",
          // footer: '<a href="#">Why do I have this issue?</a>'
        });
      }
    }
  }, [appointment, roomId, navigate, users, axiosSecure]);

  if (!appointment || !users._id) {
    return <div>Loading meeting...</div>;
  }

  return (
    <div>
      <div ref={meetingContainer} className="w-full h-screen" />
      {/* <div className="absolute bottom-0 left-0 p-4">
        <button
          onClick={() =>
            alert(
              `Share this link to join the room: http://localhost:5173/room/${roomId}`
            )
          }
          className="px-4 py-2 bg-blue-500 text-white rounded"
        >
          Share Room Link
        </button>
      </div> */}
    </div>
  );
};

export default Room;
