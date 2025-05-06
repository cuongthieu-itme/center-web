import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useClassSessionStore } from "../hooks/useClassSessionStore";
import { ClassSession } from "../types";
import { CalendarDays, Clock, School, Tag, ArrowLeft } from "lucide-react";
import LoadingSpinner from "@/components/shared/loading-spinner";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatDate } from "@/lib/utils";

const ClassSessionDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getClassSessionById } = useClassSessionStore();
  const [session, setSession] = useState<ClassSession | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      if (id) {
        try {
          setIsLoading(true);
          const data = await getClassSessionById(Number(id));
          if (data) {
            setSession(data);
          } else {
            setError("Không tìm thấy thông tin buổi học");
          }
        } catch (error) {
          console.error("Error fetching class session:", error);
          setError("Có lỗi xảy ra khi tải thông tin buổi học");
        } finally {
          setIsLoading(false);
        }
      }
    };
    
    fetchData();
  }, [id, getClassSessionById]);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (error || !session) {
    return (
      <div className="container mx-auto">
        <div className="max-w-4xl mx-auto">
          <Button
            variant="ghost"
            className="mb-6"
            onClick={() => navigate(-1)}
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Quay lại
          </Button>
          <Card>
            <CardContent className="pt-6">
              <p className="text-center text-red-500">{error || "Không tìm thấy thông tin buổi học"}</p>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto">
      <div className="max-w-4xl mx-auto">
        <Button
          variant="ghost"
          className="mb-6"
          onClick={() => navigate(-1)}
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Quay lại
        </Button>
        
        {/* Session Information */}
        <Card className="mb-8">
          <CardHeader className="border-b">
            <div className="flex justify-between items-center">
              <CardTitle>Thông tin buổi học</CardTitle>
              {/* You can add edit button here if needed */}
              {/* <Button
                variant="outline"
                onClick={() => navigate(`/class-sessions/${id}/edit`)}
              >
                <Pencil className="mr-2 h-4 w-4" />
                Chỉnh sửa
              </Button> */}
            </div>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="grid gap-6">
              <div className="flex items-center gap-3">
                <Tag className="text-gray-500 h-5 w-5" />
                <div>
                  <p className="text-sm text-gray-500">ID buổi học</p>
                  <p className="font-medium">{session.id}</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <School className="text-gray-500 h-5 w-5" />
                <div>
                  <p className="text-sm text-gray-500">Lớp</p>
                  <p className="font-medium">
                    {session.class_model?.class_name ? (
                      <>
                        {session.class_model.class_name} <span className="text-sm text-gray-400">(ID: {session.class_id})</span>
                      </>
                    ) : (
                      <>ID: {session.class_id}</>
                    )}
                  </p>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <CalendarDays className="text-gray-500 h-5 w-5" />
                <div>
                  <p className="text-sm text-gray-500">Ngày học</p>
                  <p className="font-medium">{session.session_date}</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <Clock className="text-gray-500 h-5 w-5" />
                <div>
                  <p className="text-sm text-gray-500">Thời gian</p>
                  <p className="font-medium">{session.start_time} - {session.end_time}</p>
                </div>
              </div>
              
              {session.created_at && (
                <div className="flex items-center gap-3">
                  <CalendarDays className="text-gray-500 h-5 w-5" />
                  <div>
                    <p className="text-sm text-gray-500">Ngày tạo</p>
                    <p className="font-medium">{formatDate(session.created_at)}</p>
                  </div>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
        
        {/* Class information */}
        {session.class_model && (
          <Card>
            <CardHeader className="border-b">
              <CardTitle>Thông tin lớp học</CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="grid gap-6">
                <div className="flex items-center gap-3">
                  <School className="text-gray-500 h-5 w-5" />
                  <div>
                    <p className="text-sm text-gray-500">Tên lớp</p>
                    <p className="font-medium">{session.class_model.class_name}</p>
                  </div>
                </div>
                
                {session.class_model.teacher_id && (
                  <div className="flex items-center gap-3">
                    <School className="text-gray-500 h-5 w-5" />
                    <div>
                      <p className="text-sm text-gray-500">Mã giáo viên</p>
                      <p className="font-medium">{session.class_model.teacher_id}</p>
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default ClassSessionDetail;

