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
        <div><b>Mã lớp:</b> {session.class_id}</div>
        <div><b>Ngày học:</b> {session.session_date}</div>
        <div><b>Thời gian bắt đầu:</b> {session.start_time}</div>
        <div><b>Thời gian kết thúc:</b> {session.end_time}</div>
      </div>
    </div>
  );
};

export default ClassSessionDetail;

