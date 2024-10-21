import NoData from "../../components/noData";

const PlanningPage = () => {
  return (
    <div>
      <div className="flex justify-between">
        <div className="space-y-2">
          <h1 className="text-4xl 2xl:text-3xl font-bold">My Plannings</h1>
          <p className="text-base text-muted dark:text-mutedLight">
            Plannings data history
          </p>
        </div>

        <div>
          <button className="py-2 rounded-lg bg-primary text-white  px-4 font-bold">
            Start Planning
          </button>
        </div>
      </div>
      <NoData />
    </div>
  );
};

export default PlanningPage;
