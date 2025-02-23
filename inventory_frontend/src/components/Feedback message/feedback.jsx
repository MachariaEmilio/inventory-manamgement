import {  useEffect } from "react";

import "./LoginSuccess.css";

export default function LoginSuccess({ onClose,message ,className }) {
  useEffect(() => {
    const timer = setTimeout(onClose, 4000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className={className}>
      <p>{message} </p>
      <div className={className==="login-failed"?"progress-bar-failed":"progress-bar"}></div>
    </div>
  );
}
