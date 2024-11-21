"use client";

import { Button } from "../Buttons/Button";
import { useRef, useState } from "react";
import clsx from "classnames";
import { AddressInput } from "../Inputs/AddressInput";
import { ReasonableTextarea } from "../Inputs/ReasonableTextarea";
import { useTranslations } from "next-intl";
import { PutBlobResult } from "@vercel/blob";
import { NameInput } from "../Inputs/NameInput";

// Alternative prompt and use as validation or confirmation details
const prompts = ["LoL, value investor here.", "I smell a nerd."];

interface SubmissionFormProps extends Common.ComponentProps {
  className?: string;
}

export const SubmissionForm = ({ testID, ...props }: SubmissionFormProps) => {
  const t = useTranslations("Submissions.Form");
  const uploadInputRef = useRef<HTMLInputElement>(null);
  const [walletAddress, setWalletAddress] = useState<string>();
  const [virginName, setVirginName] = useState<string>();
  const [result, setResult] = useState<PutBlobResult | null>(null);

  const [attributes, setAttributes] = useState({
    file: "",
    address: {
      value: "",
      isValid: false,
    },
    name: "",
    reason: "",
  });

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log(event.target.files);
  };

  const highlightDragRegion = (event: React.DragEvent<HTMLElement>) => {
    event.preventDefault();
    switch (event.type) {
      case "dragenter":
        event.currentTarget.style.borderColor = "blue";
        break;
      case "dragleave":
        event.currentTarget.style.borderColor = "initial";
        break;
    }
  };

  const uploadAddressSubmission = async (address: string, file: File) => {
    const response = await fetch(`/api/submission/upload?address=${address}`, {
      method: "POST",
      body: file,
    });

    const blob = await response.json();

    setResult(blob);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    console.log(
      "Submitting form",
      uploadInputRef.current?.files?.[0].name,
      walletAddress,
      virginName
    );

    if (!uploadInputRef.current?.files) throw new Error(t("Errors.FileEmpty"));

    if (!walletAddress) throw new Error(t("Errors.AddressEmpty"));

    if (!virginName) throw new Error(t("Errors.NameEmpty"));

    const file = uploadInputRef.current.files[0];

    uploadAddressSubmission(walletAddress, file);
  };

  return (
    <form
      data-testid={testID}
      onSubmit={handleSubmit}
      className={clsx(props.className, "grid grid-cols-panels gap-5")}
    >
      <label
        htmlFor="file"
        className="border-2 border-neutral-300 border-dashed bg-white rounded-md cursor-pointer"
        onDragEnter={highlightDragRegion}
        onDragLeave={highlightDragRegion}
      >
        <p>Display file here</p>
        <input
          ref={uploadInputRef}
          id="file"
          type="file"
          onChange={handleFileChange}
          className="hidden"
          required
        />
        <div>Drag & drop or click here to select a file</div>
        <div>File format not supported</div>
        <div>File size exceeds limit</div>
      </label>
      <div className="grid grid-cols-1 gap-5">
        <AddressInput
          testID={`${testID}.address`}
          label={t("AddressLabel")}
          onChange={setWalletAddress}
        />
        <NameInput
          testID={`${testID}.name`}
          label={t("NameLabel")}
          onChange={setVirginName}
        />
        <ReasonableTextarea
          testID={`${testID}.reason`}
          label={t("ReasonLabel")}
        />
        <Button testID={`${testID}.submit`} type={"submit"}>
          {t("SubmitLabel")}
        </Button>
      </div>
    </form>
  );
};
