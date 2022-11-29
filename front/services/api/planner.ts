import { Planner } from "@type/planner";
import axios from "axios";
import { axiosInstance } from "./axiosInstance";

//백엔드랑 맞춰봐야야함,,

//전체 날짜의 일정
export const getPlans = async (userId: string) => {
  try {
    const { data } = await axiosInstance.get(`planner/${userId}`);
    return data;
  } catch (err) {
    console.log(err);
  }
};

//지정한 날짜의 일정
export const getDayPlan = async (date: string) => {
  console.log(date);
  try {
    const { data } = await axiosInstance.get(`planner?date=${date}`);
    return data;
  } catch (err) {
    console.log(err);
  }
};

//플랜생성
export const createPlan = async (planInfo: Planner) => {
  try {
    const { status } = await axiosInstance.post("planner", planInfo);
    return status;
  } catch (err) {
    if (axios.isAxiosError(err) && err?.response?.status === 422) {
      return err.response.status;
    }
  }
};

//플랜수정
export const updatePlan = async (planInfo: Planner) => {
  const { id } = planInfo;
  try {
    const { status } = await axiosInstance.put(`planner/${id}`, planInfo);
    return status;
  } catch (err) {
    if (axios.isAxiosError(err) && err?.response?.status === 412) {
      return err.response.status;
    }
  }
};

//플랜삭제
export const deletePlan = async (id: string) => {
  try {
    const { status } = await axiosInstance.put(`planner/${id}`);
    return status;
  } catch (err) {
    if (axios.isAxiosError(err) && err?.response?.status === 422) {
      return err.response.status;
    }
  }
};
