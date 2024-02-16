import { GetServerSideProps } from "next";
import Link from "next/link";
import { useEffect } from "react";
import { useT } from "../Hooks/useT";
import { withSessionSsr } from "../lib/withSession";
import { useStore } from "../store";
import myDb from "../helpers/mongo";
import { ObjectId } from "mongodb";
import { User } from "../lib/users";

export default function GameOver(props: User) {
  const store = useStore();
  const t = useT();
  return (
    <main
      style={{
        backgroundImage: `url(/images/congrats.jpg) `,
      }}
      className="h-screen bg-auto bg-no-repeat bg-center  w-full flex flex-col justify-center  items-center bg-black"
    >
      <img className="fixed right-4 bottom-4 z-50 w-80" src="/espa-logo.jpg" />
      <div className="max-w-4xl text-center mx-auto  bg-black bg-opacity-50 p-8">
        <h1 className="text-6xl font-extrabold text-white">
          {t("congrats")} {props.userName}!
        </h1>
        <div className="divider"></div>
        <div className="mx-auto felx   max-w-xl">
          <p className="text-lg text-white font-bold ">
            {t("congrats_text")}
            <br />
          </p>
          <span className="text-sm block mt-10">{t("congrats_hint")}</span>
          <br />
          <br />
        </div>
        <form action="/api/auth?type=reset" method="POST">
          <a className="mt-5 w-full">
            <button className=" hover:scale-105 w-full bg-black px-8 py-4 rounded-xl border border-dashed border-white  text-center bg-opacity-70 text-xl font-bold text-white drop-shadow ">
              {t("congrats_continue")}
            </button>
          </a>
        </form>
      </div>
    </main>
  );
}

export const getServerSideProps: GetServerSideProps = withSessionSsr(
  async function getServerSideProps({ req }) {
    const user = req.session.user;
    let destination = null;
    const db = await myDb();

    const account = await db
      .collection("users")
      .findOne({ _id: new ObjectId(`${user?.id ?? ""}`) });

    return {
      props: { userName: account?.userName },
    };
  }
);
