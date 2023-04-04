import Head from "next/head";
import Image from "next/image";
import { Nunito } from "@next/font/google";
import styles from "@/styles/Home.module.css";
import Card from "../Components/Card/Card";
import Link from "next/link";
import { useGuestGuard } from "@/Hooks/UseGuestGuard";
import { useRefreshTokensQuery } from "@/apis/authApi";
// import { useRefreshTokenWithLoading } from "@/Hooks/useRefreshTokenWithLoading";
import Loader from "@/Components/Loader/Loader";

const nunito = Nunito({ subsets: ["latin"] });

export default function Home() {
  useGuestGuard();
  return (
    <>
      <Head>
        <title>Souls House</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
     
      </Head>
      <main>

        <section className="page-height grid place-items-center">
          <Card>
            <div className="center-me flex-col  text-center">
              <div className="center-me gap-2">
                <Image
                  src={"/Images/emoji.png"}
                  width={25}
                  height={25}
                  alt="Hi Emoji"
                ></Image>
                <h1 className="font-semibold">Welcome to Codershouse!</h1>
              </div>
              <p className="normal-text">
                We’re working hard to get Codershouse ready for everyone! While
                we wrap up the finishing youches, we’re adding people gradually
                to make sure nothing breaks :)
              </p>
             <Link href={'/authenticate'}> <button className="btn-primary">Get Your Username</button></Link>
              <div className="text-my-blue center-me gap-2 mt-5">
                <span>Have an invite text?</span>
                <Link href="#" className="font-bold">
                  Sign in
                </Link>
              </div>
            </div>
          </Card>
        </section>
      </main>
    </>
  );
}
