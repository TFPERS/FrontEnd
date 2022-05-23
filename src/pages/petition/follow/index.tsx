import React from "react";
import Link from "next/link";
import Layout from "../../../components/Layout/index";
import { useState, useEffect } from "react";
import axios from "../../../config/axios.config";

function Follow() {
  return (
    <Layout>
      <div className="bg-primary-white p-8 rounded-[0.625rem] w-[1200px] mx-auto">
        <div className="text-4xl font-semibold">ติดตามคำร้องและสถานะ</div>
        <div></div>
      </div>
      <Link href="/petition">back </Link>
    </Layout>
  );
}

export default Follow;
