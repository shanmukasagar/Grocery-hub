
"use client"
import React, {useState, useEffect, useRef} from "react";
import { Box } from "@mui/material";
import Dashboard from "./components/Dashboard";
import {cookieDataChecking, resetUserAuthData} from './store/actions/userAuthActions';
import {useDispatch, useSelector} from "react-redux";

export default function Home() {

  const dispatch = useDispatch();
  const fetchOnce = useRef(false);
  const userResponse = useSelector((state) => state.authUserDataReducer.generalError);

  useEffect(() => {
    if(userResponse) {
      if(userResponse !== "success") {
        dispatch(resetUserAuthData());
      }
    }
  },[userResponse])

  useEffect(() => {
    if(!fetchOnce.current) {
      if(userResponse === "") {
        dispatch(cookieDataChecking());
        fetchOnce.current = true;
      }
    }
  },[])

  return (
    <Dashboard/>
  );
}
