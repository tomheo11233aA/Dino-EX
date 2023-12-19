import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import contants from '@util/contants';

const axiosInstance = axios.create({
  baseURL: contants.HOSTING,
  timeout: 10000, // hủy request sau 10 giây không có tín hiệu phản hồi
  validateStatus: (status) => {
    return status == 200 || status == 400; // status hợp lệ
  },
});
// khi gửi một request lên server sẽ chạy hàm này trước
axiosInstance.interceptors.request.use(
  async config => {
    // lấy token từ storage
    const token: string = await AsyncStorage.getItem(contants.TOKEN) || '';
    config.headers = {
      Authorization: `Bearer ${token}`,
      Accept: 'application/json',
      'Content-Type': 'application/json',
    };
    return config;
  },
  err => Promise.reject(err),
);
// khi có response từ server sẽ chạy vào hàm này trước
axiosInstance.interceptors.response.use(
  res => res.data, // nếu thành công thì trả về data
  err => Promise.reject(err), // nếu thất bại trả về promise reject
); // callback
export default axiosInstance;
