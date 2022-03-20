import clsx from "clsx";
import { useRouter } from "next/router";
import { AllImage } from ".";
import { Img } from "../../pages/admin";
import { Item, useStore } from "../../store";
import Popover from "../Popover";

export default function JigSawSettings(props: {
  getItems: () => void;
  items: Item[];
  imgs: Img[];
  update: (p: Partial<Item>) => void;
}) {
  const router = useRouter();
  const id = router.query.id;
  const idx = props.items.findIndex((e) => e._id === id);
  const selectedItem = { ...props.items[idx] };

  return (
    <>
      <label className="block text-left text-xs font-medium mb-2 text-gray-200">
        jigSaw image url
      </label>
      <input
        value={selectedItem.jigSawUrl}
        onChange={(evt) => {
          props.update({
            jigSawUrl: evt.currentTarget.value,
          });
        }}
        className=" text-sm  bg-transparent w-full focus:outline-none h-10 p-2 border border-gray-600"
      ></input>
      <br />
      <Popover
        label={
          <>
            <label className="block text-left text-xs font-medium mb-2 text-gray-200">
              Reward
            </label>
            <div className="border p-2 w-full  h-28 text-2xl  border-gray-700 flex items-center justify-center">
              {selectedItem.reward ? (
                <div>
                  <img src={selectedItem.reward?.src} className="w-20 h-auto" />
                </div>
              ) : (
                "➕"
              )}
            </div>
          </>
        }
      >
        <AllImage
          imgs={props.items}
          onClick={async (o) => {
            props.update({
              reward: o as Item | null,
            });
          }}
        />
      </Popover>
    </>
  );
}