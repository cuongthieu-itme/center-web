import {
    Assignment as AssignmentIcon,
    EmojiEvents as EmojiEventsIcon,
    FilterList as FilterListIcon,
    Group as GroupIcon,
    MoreVert as MoreVertIcon,
    Refresh as RefreshIcon,
    School as SchoolIcon,
    TrendingDown as TrendingDownIcon,
    TrendingUp as TrendingUpIcon
} from '@mui/icons-material';
import {
    Box,
    Card,
    CardContent,
    CardHeader,
    Chip,
    Grid,
    IconButton,
    LinearProgress,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Tooltip,
    Typography,
    useTheme
} from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { CartesianGrid, Line, LineChart, Tooltip as RechartsTooltip, ResponsiveContainer, XAxis, YAxis } from 'recharts';

const Dashboard = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const theme = useTheme();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/dashboard');
        setData(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const formatNumber = (value) => {
    return new Intl.NumberFormat('vi-VN').format(value);
  };

  const calculateTotal = (key) => {
    return data.reduce((sum, item) => sum + item[key], 0);
  };

  const getTrendIcon = (value) => {
    return value >= 0 ? 
      <TrendingUpIcon color="success" /> : 
      <TrendingDownIcon color="error" />;
  };

  const getTrendColor = (value) => {
    return value >= 0 ? 'success.main' : 'error.main';
  };

  const statsCards = [
    {
      title: 'Tổng Số Học Sinh',
      value: formatNumber(calculateTotal('students')),
      trend: 8.5,
      icon: <SchoolIcon sx={{ color: 'primary.main' }} />
    },
    {
      title: 'Tổng Số Giáo Viên',
      value: formatNumber(calculateTotal('teachers')),
      trend: 5.2,
      icon: <GroupIcon sx={{ color: 'secondary.main' }} />
    },
    {
      title: 'Số Lớp Học',
      value: formatNumber(calculateTotal('classes')),
      trend: 3.7,
      icon: <AssignmentIcon sx={{ color: 'info.main' }} />
    },
    {
      title: 'Tỷ Lệ Đạt Chuẩn',
      value: `${calculateTotal('passRate')}%`,
      trend: 2.1,
      icon: <EmojiEventsIcon sx={{ color: 'success.main' }} />
    }
  ];

  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4" component="h1" sx={{ fontWeight: 'bold' }}>
          Bảng Điều Khiển Giáo Dục
        </Typography>
        <Box>
          <Tooltip title="Làm mới dữ liệu">
            <IconButton sx={{ mr: 1 }}>
              <RefreshIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Bộ lọc">
            <IconButton>
              <FilterListIcon />
            </IconButton>
          </Tooltip>
        </Box>
      </Box>

      <Grid container spacing={3} sx={{ mb: 3 }}>
        {statsCards.map((card, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <Card elevation={2}>
              <CardContent>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                  <Typography variant="subtitle2" color="text.secondary">
                    {card.title}
                  </Typography>
                  {card.icon}
                </Box>
                <Typography variant="h5" component="div" sx={{ mb: 1 }}>
                  {card.value}
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Chip 
                    label={`${card.trend > 0 ? '+' : ''}${card.trend}%`}
                    size="small"
                    sx={{ 
                      backgroundColor: getTrendColor(card.trend),
                      color: 'white',
                      mr: 1
                    }}
                  />
                  <Typography variant="body2" color="text.secondary">
                    so với học kỳ trước
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          <Card elevation={2}>
            <CardHeader
              title="Biểu Đồ Kết Quả Học Tập"
              action={
                <IconButton>
                  <MoreVertIcon />
                </IconButton>
              }
            />
            <CardContent>
              <Box sx={{ height: 300 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={data}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <RechartsTooltip />
                    <Line 
                      type="monotone" 
                      dataKey="averageScore" 
                      name="Điểm Trung Bình"
                      stroke={theme.palette.primary.main} 
                      strokeWidth={2}
                      dot={{ r: 4 }}
                    />
                    <Line 
                      type="monotone" 
                      dataKey="passRate" 
                      name="Tỷ Lệ Đạt"
                      stroke={theme.palette.success.main} 
                      strokeWidth={2}
                      dot={{ r: 4 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={4}>
          <Card elevation={2}>
            <CardHeader
              title="Tóm Tắt"
              action={
                <IconButton>
                  <MoreVertIcon />
                </IconButton>
              }
            />
            <CardContent>
              <Box sx={{ mb: 2 }}>
                <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                  Tỷ Lệ Chuyên Cần
                </Typography>
                <LinearProgress 
                  variant="determinate" 
                  value={95} 
                  sx={{ 
                    height: 8,
                    borderRadius: 4,
                    backgroundColor: 'grey.200',
                    '& .MuiLinearProgress-bar': {
                      backgroundColor: 'success.main'
                    }
                  }}
                />
                <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                  95% - Xuất sắc
                </Typography>
              </Box>
              <Box>
                <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                  Tỷ Lệ Hoàn Thành Khóa Học
                </Typography>
                <LinearProgress 
                  variant="determinate" 
                  value={88} 
                  sx={{ 
                    height: 8,
                    borderRadius: 4,
                    backgroundColor: 'grey.200',
                    '& .MuiLinearProgress-bar': {
                      backgroundColor: 'primary.main'
                    }
                  }}
                />
                <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                  88% - Tốt
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Card elevation={2} sx={{ mt: 3 }}>
        <CardHeader
          title="Danh Sách Lớp Học"
          action={
            <IconButton>
              <MoreVertIcon />
            </IconButton>
          }
        />
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Mã Lớp</TableCell>
                <TableCell>Tên Lớp</TableCell>
                <TableCell align="right">Số Học Sinh</TableCell>
                <TableCell align="right">Giáo Viên Chủ Nhiệm</TableCell>
                <TableCell align="right">Điểm Trung Bình</TableCell>
                <TableCell align="center">Trạng Thái</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.map((row) => (
                <TableRow key={row.id}>
                  <TableCell>{row.classId}</TableCell>
                  <TableCell>{row.className}</TableCell>
                  <TableCell align="right">{row.students}</TableCell>
                  <TableCell align="right">{row.teacher}</TableCell>
                  <TableCell align="right">
                    <Box sx={{ 
                      color: row.averageScore >= 5 ? 'success.main' : 'error.main',
                      fontWeight: 'bold'
                    }}>
                      {row.averageScore.toFixed(1)}
                    </Box>
                  </TableCell>
                  <TableCell align="center">
                    <Chip 
                      label={row.status} 
                      size="small"
                      sx={{ 
                        backgroundColor: row.status === 'Đang học' ? 'success.light' : 
                                      row.status === 'Tạm nghỉ' ? 'warning.light' : 
                                      'error.light',
                        color: 'white'
                      }}
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Card>
    </Box>
  );
};

export default Dashboard; 