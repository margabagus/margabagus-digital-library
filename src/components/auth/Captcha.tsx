
import React, { useEffect, useState } from 'react';
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { Label } from "@/components/ui/label";

interface CaptchaProps {
  onValidate: (isValid: boolean) => void;
}

export const Captcha = ({ onValidate }: CaptchaProps) => {
  const [captchaValue, setCaptchaValue] = useState("");
  const [generatedCaptcha, setGeneratedCaptcha] = useState("");

  const generateCaptcha = () => {
    const newCaptcha = Math.floor(1000 + Math.random() * 9000).toString();
    setGeneratedCaptcha(newCaptcha);
    setCaptchaValue("");
  };

  useEffect(() => {
    generateCaptcha();
  }, []);

  useEffect(() => {
    onValidate(captchaValue === generatedCaptcha);
  }, [captchaValue, generatedCaptcha, onValidate]);

  return (
    <div className="space-y-2">
      <div className="flex justify-between items-center">
        <Label htmlFor="captcha">Captcha</Label>
        <button
          type="button"
          onClick={generateCaptcha}
          className="text-sm text-library-600 hover:text-library-800 dark:text-library-400 dark:hover:text-library-300"
        >
          Refresh Captcha
        </button>
      </div>
      <div className="flex gap-4 items-center">
        <div className="bg-gray-100 dark:bg-gray-800 px-4 py-2 rounded select-none font-mono text-lg">
          {generatedCaptcha}
        </div>
        <InputOTP
          value={captchaValue}
          onChange={setCaptchaValue}
          maxLength={4}
          render={({ slots }) => (
            <InputOTPGroup>
              {slots.map((slot, index) => (
                <InputOTPSlot key={index} index={index} {...slot} />
              ))}
            </InputOTPGroup>
          )}
        />
      </div>
    </div>
  );
};
