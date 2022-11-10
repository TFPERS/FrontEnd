import React, { useRef, useState } from "react";
import FolderSVG from "../../../public/svg/folder.svg";
import Image from "next/image";
import DeleteIcon from "@mui/icons-material/Delete";
import { red } from "@mui/material/colors";
import Swal from "sweetalert2";
import { WindowSize } from "../../helper/useBreakpoint";

type Props = {
  onFileChange: any;
};

const DragDrop = ({ onFileChange }: Props) => {
  const { isMobile, isTablet, isDesktop } = WindowSize();
  const wrapperRef = useRef<any>(null);
  const [fileList, setFileList] = useState([]);
  const onDragEnter = () => wrapperRef.current.classList.add("dragover");
  const onDragLeave = () => wrapperRef.current.classList.remove("dragover");
  const onDrop = () => wrapperRef.current.classList.remove("dragover");
  const onFileDrop = (e: any) => {
    const newFile = e.target.files[0];
    if (newFile) {
      if (newFile.type === "application/pdf") {
        if (fileList.length > 1) {
          Swal.fire({
            background: "#FA4616",
            color: "#fff",
            title: "ผิดพลาด",
            icon: "error",
            iconColor: "#fff",
            text: "ต้องการไฟล์PDFเพียง2ไฟล์",
            confirmButtonText: "ปิด",
          });
        } else {
          const updatedList: any = [...fileList, newFile];
          setFileList(updatedList);
          onFileChange(updatedList);
        }
      } else {
        Swal.fire({
          background: "#FA4616",
          color: "#fff",
          title: "ผิดพลาด",
          icon: "error",
          iconColor: "#fff",
          text: "ต้องการไฟล์ PDF",
          confirmButtonText: "ปิด",
        });
      }
    }
  };

  const fileRemove = (index: any) => {
    const updatedList = [...fileList];
    updatedList.splice(index, 1);
    setFileList(updatedList);
    onFileChange(updatedList);
  };
  return (
    <div
      ref={wrapperRef}
      onDragEnter={onDragEnter}
      onDragLeave={onDragLeave}
      onDrop={onDrop}
      className={`flex flex-col items-center border-4 rounded-[0.625rem] bg-slate-50 p-5 relative p-10
      ${fileList.length < 2 ? "hover:bg-slate-100 hover:opacity-95" : ""}
      `}
    >
      {fileList.length > 0 ? (
        <div className="flex flex-col w-full">
          {fileList.map((item: any, index) => (
            <div key={index}>
              <div className="flex items-center space-x-4 relative z-50 hover:bg-white p-4 rounded-[0.625rem]">
                <Image src="/images/pdf.png" alt="" width={40} height={40} />
                <div className="mr-auto">{item.name}</div>
                <div className="absolute right-4">
                  <DeleteIcon
                    sx={{ color: red[500] }}
                    onClick={() => fileRemove(index)}
                    className="cursor-pointer"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <>
          <div>
            <FolderSVG />
          </div>
          <div
            className={`${isMobile ? "text-xl text-center" : "text-3xl mt-5"}`}
          >
            ลากและวางไฟล์ที่ต้องการอัปโหลด
          </div>
        </>
      )}

      {fileList.length < 2 && (
        <>
          <div className="bg-primary-coquelicot text-white p-1 px-3 rounded-[0.625rem] mt-5">
            เลือกไฟล์
          </div>
          <input
            className="opacity-0 absolute bottom-0 top-0 p-10 w-full h-full cursor-pointer bg-black"
            type="file"
            placeholder="file"
            accept="application/pdf"
            value=""
            onChange={onFileDrop}
          />
        </>
      )}
    </div>
  );
};

export default DragDrop;
