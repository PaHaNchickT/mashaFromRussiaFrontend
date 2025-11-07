"use client";

import type { ReactNode } from "react";
import { useEffect, useState } from "react";

import type { SpeakFn } from "@/types/commonTypes";

type SpeechContextProps = {
  children: (props: { isSpeaking: boolean; speak: SpeakFn }) => ReactNode;
};

export const SpeechContext = ({ children }: SpeechContextProps) => {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);

  const synth = window.speechSynthesis;

  const speak = (text: string, rate = 0.3, pitch = 1) => {
    const utterance = new SpeechSynthesisUtterance(text);
    const voice = voices.find((v) => v.lang === "en-US");

    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = (event) => {
      // TODO: Обработка ошибки
      console.error("Speech error:", event.error);
    };

    if (!synth.speaking && voice) {
      utterance.voice = voice;
      utterance.rate = rate;
      utterance.pitch = pitch;

      synth.speak(utterance);
    }
  };

  useEffect(() => {
    const newVoices = synth.getVoices();

    if (newVoices.length) {
      setVoices((prev) =>
        prev.length !== newVoices.length ? newVoices : prev
      );
    }
  }, [synth.getVoices()]);

  return <>{children({ isSpeaking, speak })}</>;
};
