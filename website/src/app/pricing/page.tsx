"use client";

import {
  ChangeEvent,
  Dispatch,
  RefObject,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from "react";
import PricingTable from "./pricingTable";

import styles from "./styles.module.css";
import { useCacheContext } from "@context/cacheProvider";
import Link from "next/link";
import { useRouter } from "next/navigation";
import axios, { AxiosResponse } from "axios";

function useCheckLoggedIn(): boolean {
  let [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const cacheContext = useCacheContext();

  useEffect(() => {
    setIsLoggedIn(cacheContext.cache["name"] ? true : false);
  }, [cacheContext]);

  return isLoggedIn;
}

type OrderToken = {
  id: string;
  amount: number;
  currency: string;
  notes: {
    planName: string;
    pricingSchedule: string;
  };
};
type RazorpayResponse = {
  razorpay_payment_id: string;
  razorpay_order_id: string;
  razorpay_signature: string;
};
async function requestUserPlanUpgrade(
  token: string,
  plan: string,
  pricingSchedule: string,
  dialogRef: RefObject<HTMLDialogElement>,
  setOrderData: Dispatch<SetStateAction<OrderData | null>>
) {
  const axiosInstance = axios.create({
    headers: { Authorization: `bearer ${token}` },
  });

  const data = {
    planName: plan,
    pricingSchedule: pricingSchedule.toLowerCase(),
  };
  let res: AxiosResponse<OrderToken>;
  try {
    res = await axiosInstance.put("/api/users/planUpgrade", data);
  } catch (err) {
    console.log(err);
    return null;
  }
  let order = res.data;

  const options = {
    key: process.env.RAZORPAY_KEY_ID,
    amount: order.amount,
    currency: order.currency,
    name: "Plan Upgrade",
    description: `Upgrading existing plan to ${order.notes.planName}`,
    order_id: order.id,
    handler: async (response: RazorpayResponse) => {
      try {
        const { data } = await axiosInstance.put("/api/users/planVerify", {
          ...response,
          pricingSchedule: pricingSchedule.toLowerCase(),
          planName: plan,
        });
      } catch (err) {
        console.log(err);
        return;
      }
      setOrderData({ ...response, planName: plan });
      dialogRef.current?.showModal();
    },
  };
  // @ts-ignore "Razorpay is dynamically loaded from script tag"
  const razorInstance = new window.Razorpay(options);
  razorInstance.open();
}

type OrderData = {
  planName: string;
  razorpay_payment_id: string;
  razorpay_order_id: string;
  razorpay_signature: string;
};
const Pricing: React.FC = () => {
  const isLoggedIn = useCheckLoggedIn();
  const cacheContext = useCacheContext();
  const [token, setToken] = useState("");
  const router = useRouter();
  const [pricingSchedule, setPricingSchedule] = useState("ANNUALLY");
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [subData, setSubData] = useState<OrderData | null>(null);
  const checkAction = (e: ChangeEvent<HTMLInputElement>) =>
    setPricingSchedule(e.target.checked ? "MONTHLY" : "ANNUALLY");
  const planSubscribeAction = (plan: string) => {
    if (!isLoggedIn) {
      const condition = confirm("Need to create an account. Visit Signup?");
      if (!condition) return;
      router.push("/signup");
    }
    requestUserPlanUpgrade(token, plan, pricingSchedule, dialogRef, setSubData);
  };

  useEffect(() => {
    const script = document.createElement("script");
    script.setAttribute("src", "https://checkout.razorpay.com/v1/checkout.js");
    const pricingComponent = document.getElementById("pricing-component");
    pricingComponent?.appendChild(script);
  }, []);

  useEffect(() => {
    setToken(cacheContext.cache["token"]);
  }, [cacheContext]);

  return (
    <main id="pricing-component" className={styles["pricing-component"]}>
      <dialog ref={dialogRef} className={`${styles["modal"]}`} id="modal">
        <i className={`bi-check-circle-fill ${styles["success-icon"]}`} />
        <h2 className={styles["modal-header"]}>PAYMENT DONE</h2>
        <p className={styles["modal-task"]}>
          Upgrade to {subData?.planName ?? ""} Plan
        </p>
        <p className={styles["order-detail"]}>
          OrderId: {subData?.razorpay_order_id ?? ""}
        </p>
        <p className={styles["order-detail"]}>
          PaymentId: {subData?.razorpay_payment_id ?? ""}
        </p>
        <p className={styles["order-detail"]}>
          Digital Signature:{" "}
          {subData?.razorpay_signature.slice(0, 10).concat("...") ?? ""}
        </p>
        <div className={styles["modal-action-group"]}>
          <a href="/profile" role="button" className={styles["profile-btn"]}>
            Go to Profile
          </a>
          <button
            className={styles["done-btn"]}
            onClick={() => dialogRef.current?.close()}
          >
            Done
          </button>
        </div>
      </dialog>

      <section className={styles["pricing-card-section"]}>
        <p className={styles["title-text"]}>PRICING</p>
        <h1 className={styles["header-text"]}>
          Get Started Now! Pick A Plan Later
        </h1>
        <p className={styles["description-text"]}>
          Try The Free Plan And Get Access To Our Products
        </p>
        <label className={styles["switch"]}>
          <input type="checkbox" onChange={checkAction} />
          <div className={styles["slider"]}>
            <span className={styles["off"]}>ANNUALLY</span>
            <span className={styles["on"]}>MONTHLY</span>
          </div>
        </label>

        <div className={styles["card-holder"]}>
          <article className={styles["card"]}>
            <header className={styles["header"]}>
              <p className={styles["feature-title"]}>Free</p>
              <p className={styles["feature-text"]}>
                ₹{" "}
                {pricingSchedule === "ANNUALLY" ? "0 per annum" : "0 per month"}
              </p>
            </header>
            <ul>
              <li className={styles["feature-item"]}>
                Creation of blogs and content
              </li>
              <li className={styles["feature-item"]}>
                Access to other communities
              </li>
              <li className={styles["feature-item"]}>Forum Tech Support</li>
            </ul>
            <Link href="/signup" className={styles["btn"]}>
              Try for Free
            </Link>
          </article>
          <article className={styles["card"]}>
            <header className={styles["header"]}>
              <p className={styles["feature-title"]}>Starter</p>
              <p className={styles["feature-text"]}>
                ₹{" "}
                {pricingSchedule === "ANNUALLY"
                  ? "1000 per annum"
                  : "100 per month"}
              </p>
            </header>
            <ul>
              <li className={styles["feature-item"]}>
                Creation of blogs and content
              </li>
              <li className={styles["feature-item"]}>
                Access to other communities
              </li>
              <li className={styles["feature-item"]}>Forum Tech Support</li>
              <li className={styles["feature-item"]}>Email Tech Support</li>
              <li className={styles["feature-item"]}>
                Limited Access to Premium
              </li>
            </ul>
            <button
              onClick={() => planSubscribeAction("starter")}
              className={styles["btn"]}
            >
              Subscribe
            </button>
          </article>
          <article className={styles["card"]}>
            <header className={styles["header"]}>
              <p className={styles["feature-title"]}>Pro</p>
              <p className={styles["feature-text"]}>
                ₹{" "}
                {pricingSchedule === "ANNUALLY"
                  ? "8500 per annum"
                  : "1000 per month"}
              </p>
            </header>
            <ul>
              <li className={styles["feature-item"]}>
                Creation of blogs and content
              </li>
              <li className={styles["feature-item"]}>
                Access to other communities
              </li>
              <li className={styles["feature-item"]}>Email Tech Support</li>
              <li className={styles["feature-item"]}>Call Tech Support</li>
              <li className={styles["feature-item"]}>Full Access to Premium</li>
              <li className={styles["feature-item"]}>Full Access to Beta</li>
            </ul>
            <button
              onClick={() => planSubscribeAction("pro")}
              className={styles["btn"]}
            >
              Subscribe
            </button>
          </article>
          <article className={styles["card"]}>
            <header className={styles["header"]}>
              <p className={styles["feature-title"]}>Enterprise</p>
              <p className={styles["feature-text"]}>Custom</p>
            </header>
            <ul>
              <li className={styles["feature-item"]}>
                Creation of blogs and content
              </li>
              <li className={styles["feature-item"]}>
                Access to other communities
              </li>
              <li className={styles["feature-item"]}>Email Tech Support</li>
              <li className={styles["feature-item"]}>Call Tech Support</li>
              <li className={styles["feature-item"]}>24/7 Live Support</li>
              <li className={styles["feature-item"]}>Full Access to Premium</li>
              <li className={styles["feature-item"]}>Full Access to Beta</li>
              <li className={styles["feature-item"]}>Custom Payment Cycle</li>
            </ul>
            <button className={styles["btn"]}>Contact Us</button>
          </article>
        </div>
      </section>
      <aside className={styles["table-container"]}>
        <p className={styles["table-description"]}>Compare all the features</p>
        <PricingTable />
      </aside>
    </main>
  );
};

export default Pricing;
