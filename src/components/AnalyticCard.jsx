import * as Icon from "react-feather";

function AnalyticCard({ title, achieved, bgcolor, isAmount }) {
  return (
    <div
      className={`flex flex-col items-center text-white h-fit p-2.5 ${bgcolor} w-40 xs:w-60 rounded-lg`}
    >
      {isAmount ? <Icon.Layers size={34}/> : <Icon.Package size={34}/>}
      <p className="text-xl">{title}</p>
      <p className="text-3xl font-bold">{`${isAmount?"₹":""}${achieved}`}</p>
    </div>
  );
}

export default AnalyticCard;
