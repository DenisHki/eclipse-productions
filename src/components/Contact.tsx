import { useState, useEffect } from "react";
import Title from "./Title";
import { FadeIn } from "./FadeIn";
import emailjs from "emailjs-com";
import Map from "./Map";
import PrimaryButton from "./PrimaryButton";
import { useLanguage } from "../i18n/LanguageContext";

const Contact = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const { t } = useLanguage();

  const emailValidation = (email: string) => {
    return String(email)
      .toLocaleLowerCase()
      .match(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/);
  };

  useEffect(() => {
    if (successMsg || errMsg) {
      const timer = setTimeout(() => {
        setSuccessMsg("");
        setErrMsg("");
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [successMsg, errMsg]);

  const handleSend = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (username === "") {
      setErrMsg(t.contact.form.errors.nameRequired);
    } else if (email === "") {
      setErrMsg(t.contact.form.errors.emailRequired);
    } else if (!emailValidation(email)) {
      setErrMsg(t.contact.form.errors.emailInvalid);
    } else if (message === "") {
      setErrMsg(t.contact.form.errors.messageRequired);
    } else {
      emailjs
        .send(
          import.meta.env.VITE_EMAILJS_SERVICE_ID,
          import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
          { username, to_email: email, message },
          import.meta.env.VITE_EMAILJS_PUBLIC_KEY,
        )
        .then(
          (response) => {
            console.log("SUCCESS!", response.status, response.text);
            setSuccessMsg(t.contact.form.success.replace("{name}", username));
            setErrMsg("");
            setUsername("");
            setEmail("");
            setMessage("");
          },
          (err) => {
            console.error("FAILED...", err);
            setErrMsg(t.contact.form.errors.sendFailed);
          },
        );
    }
  };

  return (
    <section
      id="contact"
      className="w-full py-20 border-b-[1px] border-b-gray-700"
    >
      <FadeIn>
        <div className="flex justify-center items-center text-center">
          <Title title={t.contact.title} des={t.contact.subtitle} />
        </div>
        <div className="flex justify-center items-center w-full">
          <div className="w-full max-w-2xl py-10 bg-black flex flex-col gap-8 p-4 lgl:p-8 rounded-lg">
            <form
              onSubmit={handleSend}
              className="w-full flex flex-col gap-4 lgl:gap-6 py-2 lgl:py-5"
            >
              {errMsg && (
                <p className="py-3 bg-gradient-to-r from-[#1e2024] to-[#23272b] shadow-shadowOne text-center text-orange-500 text-base tracking-wide animate-bounce">
                  {errMsg}
                </p>
              )}
              {successMsg && (
                <p className="py-3 bg-gradient-to-r from-[#1e2024] to-[#23272b] shadow-shadowOne text-center text-green-500 text-base tracking-wide animate-bounce">
                  {successMsg}
                </p>
              )}
              <div className="w-full flex flex-col lgl:flex-row gap-10">
                <div className="w-full flex flex-col gap-4">
                  <p className="text-sm text-gray-400 uppercase tracking-wide">
                    {t.contact.form.name}
                  </p>
                  <input
                    onChange={(e) => setUsername(e.target.value)}
                    value={username}
                    className={`${
                      errMsg === t.contact.form.errors.nameRequired &&
                      "outline-designColor"
                    } contactInput`}
                    type="text"
                  />
                </div>
              </div>
              <div className="flex flex-col gap-4">
                <p className="text-sm text-gray-400 uppercase tracking-wide">
                  {t.contact.form.email}
                </p>
                <input
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
                  className={`${
                    errMsg === t.contact.form.errors.emailRequired &&
                    "outline-designColor"
                  } contactInput`}
                  type="email"
                />
              </div>
              <div className="flex flex-col gap-4">
                <p className="text-sm text-gray-400 uppercase tracking-wide">
                  {t.contact.form.message}
                </p>
                <textarea
                  onChange={(e) => setMessage(e.target.value)}
                  value={message}
                  className={`${
                    errMsg === t.contact.form.errors.messageRequired &&
                    "outline-designColor"
                  } contactTextArea`}
                  cols={30}
                  rows={8}
                ></textarea>
              </div>
              <div className="w-full">
                <PrimaryButton type="submit">
                  {t.contact.form.send}
                </PrimaryButton>
              </div>
              {errMsg && (
                <p className="py-3 bg-gradient-to-r from-[#141518] to-[#141518] shadow-shadowOne text-center text-orange-500 text-base tracking-wide animate-bounce">
                  {errMsg}
                </p>
              )}
              {successMsg && (
                <p className="py-3 bg-gradient-to-r from-[#141518] to-[#141518] shadow-shadowOne text-center text-green-500 text-base tracking-wide animate-bounce">
                  {successMsg}
                </p>
              )}
            </form>
          </div>
        </div>
        <Map
          lat={60.18514501686832}
          lng={24.966133354712397}
          zoom={15}
          className="mt-20 mb-20"
        />
      </FadeIn>
    </section>
  );
};

export default Contact;
