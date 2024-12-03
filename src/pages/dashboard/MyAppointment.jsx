import SectionTitle from "../../components/SectionTitle";
import useAppointment from "../../hooks/useAppointment";

const MyAppointment = () => {
  const [appointment] = useAppointment();
  return (
    <div>
      <SectionTitle
        heading="Appointments"
        subHeading="MyAppointment"
      ></SectionTitle>
      <div>
        <p>Total appointment : {appointment.length}</p>
      </div>
    </div>
  );
};

export default MyAppointment;
