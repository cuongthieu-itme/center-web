# Mô tả chi tiết về dự án

## Mô tả chung
Dự án này là một ứng dụng web quản lý trung tâm, được xây dựng bằng React và TypeScript. Dự án sử dụng các công nghệ hiện đại như Vite, Tailwind CSS, và các thư viện quản lý state như Zustand. Dự án được thiết kế để quản lý người dùng, giáo viên, học sinh, lớp học, buổi học, và điểm danh.

## Cấu trúc dự án
Dự án được tổ chức theo cấu trúc thư mục như sau:
- `src/`: Thư mục chứa mã nguồn chính của dự án.
  - `features/`: Chứa các tính năng chính của dự án, mỗi tính năng được tổ chức thành một thư mục riêng biệt.
    - `users/`: Quản lý người dùng.
    - `teachers/`: Quản lý giáo viên.
    - `students/`: Quản lý học sinh.
    - `classes/`: Quản lý lớp học.
    - `class-sessions/`: Quản lý buổi học.
    - `attendance/`: Quản lý điểm danh.
    - `auth/`: Xác thực người dùng.
  - `types/`: Chứa các kiểu dữ liệu dùng chung.
  - `routes/`: Chứa các route của ứng dụng.
  - `layouts/`: Chứa các layout của ứng dụng.
  - `components/`: Chứa các component dùng chung.
  - `hooks/`: Chứa các custom hook.
  - `context/`: Chứa các context.
  - `config/`: Chứa các cấu hình.
  - `assets/`: Chứa các tài nguyên tĩnh.
  - `lib/`: Chứa các thư viện tiện ích.
  - `validations/`: Chứa các validation.
  - `stores/`: Chứa các store quản lý state.
  - `pages/`: Chứa các trang của ứng dụng.
  - `providers/`: Chứa các provider.
  - `index.css`: File CSS chính.
  - `main.tsx`: File khởi tạo ứng dụng.
  - `App.tsx`: Component gốc của ứng dụng.
- `public/`: Thư mục chứa các tài nguyên tĩnh.
- `node_modules/`: Thư mục chứa các thư viện bên thứ ba.
- `package.json`: File cấu hình dự án.
- `tsconfig.json`: File cấu hình TypeScript.
- `vite.config.ts`: File cấu hình Vite.
- `tailwind.config.js`: File cấu hình Tailwind CSS.
- `postcss.config.js`: File cấu hình PostCSS.
- `eslint.config.js`: File cấu hình ESLint.
- `index.html`: File HTML chính.
- `.gitignore`: File cấu hình Git.
- `components.json`: File cấu hình components.

## Các model
### User
```typescript
export type User = {
  id: number;
  name: string;
  email: string;
  avatar?: string;
  role: "admin" | "teacher" | "student";
  isActive: boolean;
  createdAt: string;
  deleted_at?: string | null;
};
```

### Teacher
```typescript
export type Teacher = {
  id: number;
  name: string;
  email: string;
  role: string;
  teacher: {
    id: number;
    full_name: string;
    phone: string;
    email: string;
    specialization: string;
    avatar_url?: string;
    user_id: number;
    created_at: string;
    updated_at: string;
  } | null;
  student: null;
  created_at: string;
  updated_at: string;
  deleted_at?: string | null;
};
```

### Student
```typescript
export type Student = {
  id: number;
  full_name: string;
  dob: string;
  phone: string;
  email: string;
  address: string;
  avatar?: string;
  avatar_url?: string;
  user_id: number;
  class_id?: number;
  createdAt: string;
  updatedAt: string;
  deleted_at?: string | null;
};
```

### Class
```typescript
export type Class = {
  id: number;
  class_name: string;
  teacher_id: number;
  teacher?: {
    id: number;
    full_name: string;
  };
  createdAt: string;
};
```

### ClassSession
```typescript
export type ClassSession = {
  id: number;
  class_id: number;
  session_date: string;
  start_time: string;
  end_time: string;
  created_at?: string;
  updated_at?: string;
  class_model?: {
    id?: number;
    class_name: string;
    teacher_id?: number;
    created_at?: string;
    updated_at?: string;
  };
};
```

### Attendance
```typescript
export type Attendance = {
  id: number;
  student_id: number;
  session_id: number;
  status: "present" | "absent" | "late" | "excused";
  check_in_time: string | null;
  check_out_time: string | null;
  created_at: string;
  updated_at: string;
  student: Student;
  class_session: ClassSession;
};
```

## Mối quan hệ các model
- **User**: Có thể là admin, giáo viên hoặc học sinh.
- **Teacher**: Liên kết với User thông qua `user_id`.
- **Student**: Liên kết với User thông qua `user_id` và có thể thuộc một lớp học thông qua `class_id`.
- **Class**: Liên kết với Teacher thông qua `teacher_id`.
- **ClassSession**: Liên kết với Class thông qua `class_id`.
- **Attendance**: Liên kết với Student thông qua `student_id` và với ClassSession thông qua `session_id`.

## Các chức năng của dự án
1. **Xác thực người dùng**:
   - Đăng nhập.
   - Đăng xuất.
   - Thay đổi mật khẩu.

2. **Quản lý người dùng**:
   - Xem danh sách người dùng.
   - Xem chi tiết người dùng.
   - Chỉnh sửa thông tin người dùng.

3. **Quản lý giáo viên**:
   - Xem danh sách giáo viên.
   - Xem chi tiết giáo viên.
   - Chỉnh sửa thông tin giáo viên.

4. **Quản lý học sinh**:
   - Xem danh sách học sinh.
   - Xem chi tiết học sinh.
   - Chỉnh sửa thông tin học sinh.
   - Xem lớp học của học sinh.
   - Xem lịch học của học sinh.
   - Xem điểm danh của học sinh.

5. **Quản lý lớp học**:
   - Xem danh sách lớp học.
   - Xem chi tiết lớp học.

6. **Quản lý buổi học**:
   - Xem danh sách buổi học.
   - Xem chi tiết buổi học.

7. **Quản lý điểm danh**:
   - Xem danh sách điểm danh.
   - Xem chi tiết điểm danh.
   - Theo dõi điểm danh.

8. **Quản lý đơn hàng**:
   - Xem danh sách đơn hàng.

9. **Dashboard**:
   - Xem tổng quan về hệ thống.

10. **Lỗi 404**:
    - Xử lý khi không tìm thấy trang. 