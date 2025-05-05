import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Clock, LogIn, LogOut, CalendarClock, CheckCircle2 } from "lucide-react";
import { useAuthStore } from "@/stores/useAuthStore";

export default function AttendanceTracker() {
  const { user } = useAuthStore();
  const [currentTime, setCurrentTime] = useState(new Date());
  const [checkedIn, setCheckedIn] = useState(false);
  const [checkedOut, setCheckedOut] = useState(false);
  const [checkInTime, setCheckInTime] = useState<Date | null>(null);
  const [checkOutTime, setCheckOutTime] = useState<Date | null>(null);
  const [workTime, setWorkTime] = useState<string>("");

  // Update current time every second
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Format time as HH:MM:SS
  const formatTime = (date: Date) => {
    return new Intl.DateTimeFormat('vi-VN', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false
    }).format(date);
  };

  // Format date as weekday, DD/MM/YYYY
  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('vi-VN', {
      weekday: 'long',
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    }).format(date);
  };

  const handleCheckIn = () => {
    const now = new Date();
    setCheckInTime(now);
    setCheckedIn(true);
    // Here you would make an API call to record check-in time
  };

  const handleCheckOut = () => {
    const now = new Date();
    setCheckOutTime(now);
    setCheckedOut(true);

    // Calculate work time
    if (checkInTime) {
      const diffMs = now.getTime() - checkInTime.getTime();
      const diffHrs = Math.floor(diffMs / (1000 * 60 * 60));
      const diffMins = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
      setWorkTime(`${diffHrs} giờ ${diffMins} phút`);
    }

    // Here you would make an API call to record check-out time
  };

  return (
    <div className="container mx-auto py-6">
      <div className="flex flex-col gap-6">
        <h1 className="text-3xl font-bold tracking-tight">Điểm danh</h1>

        {/* Current time and date card */}
        <Card className="w-full bg-gradient-to-r from-blue-50 to-indigo-50">
          <CardHeader className="pb-2">
            <CardDescription>Thời gian hiện tại</CardDescription>
            <CardTitle className="text-4xl font-bold flex items-center gap-2">
              <Clock className="h-6 w-6 text-blue-600" />
              {formatTime(currentTime)}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-lg text-gray-700">{formatDate(currentTime)}</p>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Check-in card */}
          <Card className={`shadow-md transition-all duration-300 ${checkedIn ? 'bg-green-50 border-green-200' : 'bg-white'}`}>
            <CardHeader className="pb-2">
              <div className="flex justify-between items-center">
                <CardTitle className="text-xl font-semibold flex items-center gap-2">
                  <LogIn className="h-5 w-5 text-blue-600" />
                  Check-in
                </CardTitle>
                {checkedIn && <CheckCircle2 className="h-6 w-6 text-green-500" />}
              </div>
              <CardDescription>Ghi nhận thời gian bắt đầu làm việc</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-4 py-2">
                <Avatar className="h-14 w-14">
                  <AvatarImage src={user?.avatar || ""} alt={user?.name} />
                  <AvatarFallback className="bg-blue-100 text-blue-800">
                    {user?.name?.charAt(0) || "U"}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-semibold text-gray-900">{user?.name}</p>
                  <p className="text-sm text-gray-500">{user?.role}</p>
                </div>
              </div>

              {checkedIn ? (
                <div className="mt-4 bg-green-100 p-3 rounded-lg">
                  <div className="flex items-center gap-2">
                    <CalendarClock className="h-5 w-5 text-green-700" />
                    <span className="font-medium text-green-700">Đã check-in lúc:</span>
                  </div>
                  <p className="text-lg font-bold text-green-800 mt-1">
                    {checkInTime ? formatTime(checkInTime) : ""}
                  </p>
                </div>
              ) : (
                <p className="mt-4 text-gray-600">Bạn chưa check-in hôm nay.</p>
              )}
            </CardContent>
            <CardFooter>
              <Button
                onClick={handleCheckIn}
                className="w-full gap-2"
                disabled={checkedIn}
                variant={checkedIn ? "outline" : "default"}
              >
                <LogIn className="h-4 w-4" />
                {checkedIn ? "Đã check-in" : "Check-in"}
              </Button>
            </CardFooter>
          </Card>

          {/* Check-out card */}
          <Card className={`shadow-md transition-all duration-300 ${checkedOut ? 'bg-orange-50 border-orange-200' : 'bg-white'}`}>
            <CardHeader className="pb-2">
              <div className="flex justify-between items-center">
                <CardTitle className="text-xl font-semibold flex items-center gap-2">
                  <LogOut className="h-5 w-5 text-orange-600" />
                  Check-out
                </CardTitle>
                {checkedOut && <CheckCircle2 className="h-6 w-6 text-orange-500" />}
              </div>
              <CardDescription>Ghi nhận thời gian kết thúc làm việc</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-4 py-2">
                <Avatar className="h-14 w-14">
                  <AvatarImage src={user?.avatar || ""} alt={user?.name} />
                  <AvatarFallback className="bg-orange-100 text-orange-800">
                    {user?.name?.charAt(0) || "U"}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-semibold text-gray-900">{user?.name}</p>
                  <p className="text-sm text-gray-500">{user?.role}</p>
                </div>
              </div>

              {checkedOut ? (
                <div className="mt-4 bg-orange-100 p-3 rounded-lg">
                  <div className="flex items-center gap-2">
                    <CalendarClock className="h-5 w-5 text-orange-700" />
                    <span className="font-medium text-orange-700">Đã check-out lúc:</span>
                  </div>
                  <p className="text-lg font-bold text-orange-800 mt-1">
                    {checkOutTime ? formatTime(checkOutTime) : ""}
                  </p>
                  {workTime && (
                    <div className="mt-2 pt-2 border-t border-orange-200">
                      <p className="text-sm text-orange-700">Thời gian làm việc:</p>
                      <p className="font-semibold text-orange-800">{workTime}</p>
                    </div>
                  )}
                </div>
              ) : (
                <p className="mt-4 text-gray-600">
                  {checkedIn ? "Bạn đã sẵn sàng để check-out." : "Bạn cần check-in trước."}
                </p>
              )}
            </CardContent>
            <CardFooter>
              <Button
                onClick={handleCheckOut}
                className="w-full gap-2"
                disabled={!checkedIn || checkedOut}
                variant={checkedOut ? "outline" : "default"}
                style={{ backgroundColor: checkedOut ? "" : "rgb(234 88 12)" }}
              >
                <LogOut className="h-4 w-4" />
                {checkedOut ? "Đã check-out" : "Check-out"}
              </Button>
            </CardFooter>
          </Card>
        </div>

        {/* Recent attendance history placeholder */}
        <Card className="mt-6">
          <CardHeader>
            <CardTitle>Lịch sử điểm danh gần đây</CardTitle>
            <CardDescription>Thông tin điểm danh của bạn trong 7 ngày gần đây</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[...Array(3)].map((_, i) => {
                const date = new Date();
                date.setDate(date.getDate() - i);

                return (
                  <div key={i} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                    <div>
                      <p className="font-medium">{formatDate(date)}</p>
                      <div className="flex gap-4 mt-1 text-sm text-gray-600">
                        <span className="flex items-center gap-1">
                          <LogIn className="h-3 w-3" /> 08:30
                        </span>
                        <span className="flex items-center gap-1">
                          <LogOut className="h-3 w-3" /> 17:30
                        </span>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800">
                        9 giờ làm việc
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}