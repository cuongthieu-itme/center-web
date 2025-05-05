import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuthStore } from "@/stores/useAuthStore";
import { CalendarClock, CheckCircle2, Clock, LogIn, LogOut } from "lucide-react";
import { useEffect, useState } from "react";

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
    <div className="py-6 w-full">
      <div className="flex flex-col md:flex-row gap-4">
        {/* LEFT SIDE - User profile card */}
        <div className="md:w-1/3">
          <Card className="h-full shadow-md">
            <CardContent className="p-5">
              <div className="flex flex-col items-center text-center pt-4">
                <Avatar className="h-24 w-24 border-2 border-white shadow-sm mb-4">
                  <AvatarImage src={user?.avatar || ""} alt={user?.name} />
                  <AvatarFallback className="bg-blue-100 text-blue-800 text-xl">
                    {user?.name?.charAt(0) || "U"}
                  </AvatarFallback>
                </Avatar>
                <h2 className="font-bold text-xl text-gray-900">{user?.name}</h2>
                <p className="text-sm text-gray-600 mb-6">{user?.role}</p>
                
                <div className="w-full bg-blue-50 p-4 rounded-lg">
                  <p className="text-sm text-gray-600 mb-1">Thời gian hiện tại</p>
                  <div className="flex items-center justify-center gap-2">
                    <Clock className="h-5 w-5 text-blue-600" />
                    <span className="text-3xl font-bold text-gray-800">{formatTime(currentTime)}</span>
                  </div>
                  <p className="text-sm text-gray-600 mt-1">{formatDate(currentTime)}</p>
                </div>
                
                {/* Summary appears here when checked in and out */}
                {checkedIn && checkedOut && (
                  <div className="mt-4 w-full bg-green-50 p-4 rounded-lg">
                    <h3 className="font-semibold text-gray-900">Tổng kết hôm nay</h3>
                    <p className="text-sm text-gray-600 mt-1">{formatDate(currentTime)}</p>
                    <span className="inline-flex items-center rounded-full bg-green-100 px-3 py-1 text-sm font-medium text-green-800 mt-2">
                      {workTime}
                    </span>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
        
        {/* RIGHT SIDE - Check-in and Check-out cards */}
        <div className="md:w-2/3">
          <div className="flex flex-col gap-4 h-full">
            {/* Current time card - gradient background for visual interest */}
            <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 shadow-sm">
              <CardContent className="p-4">
                <h2 className="text-xl font-bold mb-0">Điểm danh</h2>
                <p className="text-sm text-gray-600">Hãy điểm danh để ghi nhận thời gian làm việc của bạn</p>
              </CardContent>
            </Card>
            
            {/* Check-in card */}
            <Card className={`shadow-sm transition-all duration-300 ${checkedIn ? 'bg-green-50 border-green-200' : 'bg-white'}`}>
              <CardHeader className="pb-3 pt-5">
                <div className="flex justify-between items-center">
                  <CardTitle className="text-lg font-semibold flex items-center gap-2">
                    <LogIn className="h-5 w-5 text-blue-600" />
                    Check-in
                  </CardTitle>
                  {checkedIn && <CheckCircle2 className="h-5 w-5 text-green-500" />}
                </div>
              </CardHeader>
              <CardContent className="pt-0">
                {checkedIn ? (
                  <div className="bg-green-100 p-3 rounded-lg">
                    <div className="flex items-center gap-2">
                      <CalendarClock className="h-4 w-4 text-green-700" />
                      <span className="font-medium text-green-700 text-sm">Đã check-in lúc:</span>
                    </div>
                    <p className="text-lg font-bold text-green-800 mt-1">
                      {checkInTime ? formatTime(checkInTime) : ""}
                    </p>
                  </div>
                ) : (
                  <p className="text-sm text-gray-600">Bạn chưa check-in hôm nay.</p>
                )}
              </CardContent>
              <CardFooter className="pt-0">
                <Button
                  onClick={handleCheckIn}
                  className="w-full gap-2"
                  disabled={checkedIn}
                  variant={checkedIn ? "outline" : "default"}
                  size="sm"
                >
                  <LogIn className="h-4 w-4" />
                  {checkedIn ? "Đã check-in" : "Check-in"}
                </Button>
              </CardFooter>
            </Card>

            {/* Check-out card */}
            <Card className={`shadow-sm transition-all duration-300 ${checkedOut ? 'bg-orange-50 border-orange-200' : 'bg-white'}`}>
              <CardHeader className="pb-3 pt-5">
                <div className="flex justify-between items-center">
                  <CardTitle className="text-lg font-semibold flex items-center gap-2">
                    <LogOut className="h-5 w-5 text-orange-600" />
                    Check-out
                  </CardTitle>
                  {checkedOut && <CheckCircle2 className="h-5 w-5 text-orange-500" />}
                </div>
              </CardHeader>
              <CardContent className="pt-0">
                {checkedOut ? (
                  <div className="bg-orange-100 p-3 rounded-lg">
                    <div className="flex items-center gap-2">
                      <CalendarClock className="h-4 w-4 text-orange-700" />
                      <span className="font-medium text-orange-700 text-sm">Đã check-out lúc:</span>
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
                  <p className="text-sm text-gray-600">
                    {checkedIn ? "Bạn đã sẵn sàng để check-out." : "Bạn cần check-in trước."}
                  </p>
                )}
              </CardContent>
              <CardFooter className="pt-0">
                <Button
                  onClick={handleCheckOut}
                  className="w-full gap-2"
                  disabled={!checkedIn || checkedOut}
                  variant={checkedOut ? "outline" : "default"}
                  size="sm"
                  style={{ backgroundColor: checkedOut ? "" : "rgb(234 88 12)" }}
                >
                  <LogOut className="h-4 w-4" />
                  {checkedOut ? "Đã check-out" : "Check-out"}
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
