import { getCalApi } from "@calcom/embed-react";
import { useEffect } from "react";

const CalComEmbed = () => {
  useEffect(() => {
    (async function () {
      const cal = await getCalApi({"namespace":"45-strategy-call"});
      cal("ui", {"hideEventTypeDetails":false,"layout":"month_view"});
    })();
  }, []);

  return (
    <div className="w-full">
      <iframe
        src="https://cal.com/stafflyai/45-strategy-call?embed=true"
        width="100%"
        height="700"
        frameBorder="0"
        title="Book a Consultation"
        className="rounded-xl"
        data-cal-namespace="45-strategy-call"
        data-cal-link="stafflyai/45-strategy-call"
        data-cal-config='{"layout":"month_view"}'
      ></iframe>
    </div>
  );
};

export default CalComEmbed;
