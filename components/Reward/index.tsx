import clsx from "clsx";
import { useRouter } from "next/router";
import { useT } from "../../Hooks/useT";
import { useStore } from "../../store";

const shadow = {
  WebkitTextStroke: "0.2px black",
};

export default function Reward() {
  const store = useStore();
  const router = useRouter();
  const locale = router?.locale as "el" | "en";
  const getMaxW =
    (store.guideLines?.length ?? 100) > 450 ? "max-w-5xl" : "max-w-3xl";
  const t = useT();
  return (
    <div
      onClick={() => {
        store.setReward(null);
      }}
      className={clsx(
        "fixed  h-screen select-none  w-screen flex  pointer-events-auto  items-center  justify-center z-50",
        {
          hidden: store.status !== "REWARD",
        }
      )}
    >
      <div
        className={clsx(
          "w-full p-1 max-h-screen  relative border-2 border-dashed rounded-2xl m-auto  text-3xl font-bold  text-white text-center",
          getMaxW
        )}
      >
        <div className="px-20 bg-opacity-80 bg-black border  py-10 rounded-2xl">
          <h1 className=" text-lg text-yellow-400">{t("reward_title")}</h1>
          <div className="divider"></div>
          <div className="bg-gray-300 bg-opacity-10 w-full h-[50vh] p-8 flex justify-center my-auto">
            <img
              className="w-fit h-full object-scale-down "
              src={store.reward?.src}
            />
          </div>
          <div className="mt-4 text-xl" style={shadow}>
            {store.reward?.[locale === "en" ? "enDescription" : "description"]}
          </div>
          {/* <div className="my-10 border-b border-white border-opacity-50 " /> */}
          <div className="divider"></div>
          <h1 className=" text-lg mt-4 text-yellow-400">
            {t("reward_continue")}
          </h1>
        </div>
      </div>
    </div>
  );
}
