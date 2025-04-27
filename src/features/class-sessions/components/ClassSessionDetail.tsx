import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useClassSessionStore } from "../hooks/useClassSessionStore";
import { ClassSession } from "../types";

const ClassSessionDetail = () => {
  const { id } = useParams();
  const { getClassSessionById } = useClassSessionStore();
  const [session, setSession] = useState<ClassSession | null>(null);

  useEffect(() => {
    if (id) {
      getClassSessionById(Number(id)).then(setSession);
    }
  }, [id, getClassSessionById]);

  if (!session) return <div>Đang tải thông tin buổi học...</div>;

  return (
    <div className="container mx-auto py-6">
      <h1 className="text-2xl font-bold mb-4">Chi tiết buổi học</h1>
      <div className="space-y-2">
        <div><b>ID:</b> {session.id}</div>
        <div><b>Tên buổi học:</b> {session.session_name}</div>
        <div><b>Mã lớp:</b> {session.class_id}</div>
        <div><b>Bắt đầu:</b> {session.start_time}</div>
        <div><b>Kết thúc:</b> {session.end_time}</div>
        <div><b>Ngày tạo:</b> {session.createdAt}</div>
      </div>
    </div>
  );
};

export default ClassSessionDetail;

