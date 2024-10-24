import NoData from "../../components/noData";

const AdvertiserPaymentReport = () => {
  return (
    <div>
      <div className="flex justify-between">
        <div className="space-y-2">
          <h1 className="text-4xl 2xl:text-3xl font-bold">Payments Report</h1>
          <p className="text-base text-muted dark:text-white dark:text-opacity-50">
            Advertiser payment report
          </p>
        </div>

        <div>
          <button className="py-2 rounded-lg bg-primary text-white  px-4 font-bold">
            All Time
          </button>
        </div>
      </div>
      <NoData />
    </div>
  );
};

export default AdvertiserPaymentReport;
