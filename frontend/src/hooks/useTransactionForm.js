// src/pages/hooks/useTransactionForm.js

import axios from "../api/axios";
import { useState, useEffect } from "react";
import { transactionService } from "../services/transactionService";

export const useTransactionForm = (type) => {
  const [incomeChannel, setIncomeChannel] = useState(null);
  const [source, setSource] = useState("");

  const [otherSource, setOtherSource] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [amount, setAmount] = useState("");
  const [detail, setDetail] = useState("");
  const [file, setFile] = useState(null);

  const [openSuccess, setOpenSuccess] = useState(false);

  useEffect(() => {
    const loadProfile = async () => {
      try {
        const res = await axios.get("/users/profile");

        const channel = res.data?.data?.income_channel || "";

        setIncomeChannel(channel);
        setSource(channel);

      } catch (err) {
        console.error("Failed to load profile", err);
      }
    };

    loadProfile();
  }, []);

  const resetForm = () => {
    setSource(incomeChannel || "");
    setOtherSource("");
    setDate("");
    setTime("");
    setAmount("");
    setDetail("");
    setFile(null);
  };

  const handleSubmit = async (payload) => {
    try {
      const combinedDate = new Date(
        `${payload.date}T${payload.time || "00:00"}`
      );

      await transactionService.create({
        amount: payload.amount,
        category: payload.source,
        description: payload.detail,
        date: combinedDate,
        transaction_type: type,
      });

      setOpenSuccess(true);

    } catch (err) {
      console.error("Transaction create failed:", err);
    }
  };

  return {
    incomeChannel,
    source,
    setSource,
    otherSource,
    setOtherSource,
    date,
    setDate,
    time,
    setTime,
    amount,
    setAmount,
    detail,
    setDetail,
    file,
    setFile,
    openSuccess,
    setOpenSuccess,
    handleSubmit,
    resetForm,
  };
};