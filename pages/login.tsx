import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import { useT } from "../Hooks/useT";

export default function Login() {
  const router = useRouter();
  const { locale } = router;
  const t = useT();
  const setLang = (e: string) => {
    if (typeof window !== "undefined") localStorage.setItem("lang", e);
  };
  const [error, setError] = useState<"error" | null>(null);

  return (
    <div className="bg-black w-screen h-screen">
      <img
        src="/images/start_map.png"
        className="z-0 absolute w-screen h-screen object-contain"
        alt=""
      />
      <section className="h-screen z-50 absolute flex items-center  justify-center  w-screen overflow-hidden">
        <select
          value={locale}
          onChange={(evt) => {
            const locale = evt.currentTarget.value;
            setLang(locale);
            router.push("/login", "/login", { locale });
          }}
          className="cursor-pointer bg-opacity-70 absolute top-0 right-0  bg-black text-center text-2xl appearance-none block px-3 py-4 w-fit   text-yellow-500 font-bold   border border-opacity-25 border-white outline-none"
        >
          <option
            className=" text-yellow-500 uppercase  bg-black text-2xl "
            value="en"
          >
            🇬🇧 &nbsp; {(locale === "el" ? "ΑΓΓΛΙΚΑ" : `English`).toUpperCase()}
          </option>
          <option
            className="text-yellow-500 uppercase  bg-black text-2xl "
            value="el"
          >
            🇬🇷 &nbsp;{(locale === "el" ? "ΕΛΛΗΝΙΚΑ" : `Greek`).toUpperCase()}
          </option>
        </select>
        <form
          onSubmit={async (e) => {
            e.preventDefault();
            const form = e.currentTarget;
            const formData = new FormData(form);
            const data = Object.fromEntries(formData.entries());
            const res = await fetch(form.action, {
              method: form.method,
              body: JSON.stringify(data),
              headers: {
                "Content-Type": "application/json",
              },
            });
            const d = await res.json();
            if (res.status > 299) {
              setError(d.msg);
            } else {
              if (d.admin) router.push("/admin");
              else router.push("/");
            }
          }}
          method="post"
          action="/api/auth?type=login"
          className="max-w-xl  w-full grid gap-y-8  bg-black bg-opacity-80 border border-white border-opacity-30 p-8 rounded"
        >
          <h1 className="text-3xl font-bold h-12 text-yellow-500">
            {t("login_title")}
          </h1>
          <input
            name="userName"
            required
            placeholder={t("login_username")}
            type="text"
            className="input placeholder-yellow-800  input-bordered bg-black bg-opacity-60  w-full bordered text-yellow-500  outline-none focus:outline-none text-2xl  "
          />

          <input
            autoComplete=""
            name="password"
            required
            placeholder={t("login_password")}
            minLength={6}
            type="password"
            className="input placeholder-yellow-800  input-bordered bg-black bg-opacity-60  w-full bordered text-yellow-500  outline-none focus:outline-none text-2xl  "
          />

          <input
            required
            role="button"
            type="submit"
            value={t("login_button")}
            className="input hover:bg-white hover:scale-95 hover:bg-opacity-5 placeholder-yellow-800  input-bordered bg-black bg-opacity-70  w-full bordered text-yellow-500  outline-none focus:outline-none text-2xl  "
          />
          {error && (
            <div className="text-red-500 text-center text-sm">{t(error)}</div>
          )}
          <Link href="/register">
            <a
              role="button"
              className="text-right text-sm text-yellow-300 w-full"
            >
              {t("login_signup")}
            </a>
          </Link>
        </form>
      </section>
    </div>
  );
}
