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
    <button 
      data-cal-namespace="45-strategy-call"
      data-cal-link="migueldiaz/45-strategy-call"
      data-cal-config='{"layout":"month_view"}'
      className="w-full h-full min-h-[700px] bg-gradient-to-r from-blue-500 to-purple-600 text-white font-bold py-4 px-8 rounded-xl hover:shadow-lg transition-all duration-300 flex items-center justify-center text-xl"
    >
      Click to Open Calendar
    </button>
  );
};

export default CalComEmbed;
