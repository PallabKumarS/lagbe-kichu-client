import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  tokenSelector,
  userSelector,
  setUser,
  clearUser,
} from "@/redux/features/authSlice";
import { useGetMeQuery } from "@/redux/api/userApi";

export const useUser = () => {
  const dispatch = useDispatch();
  const token = useSelector(tokenSelector);
  const user = useSelector(userSelector);

  // Only fetch user data if we have a token but no user data
  const shouldFetchUser = !!token && !user;

  const {
    data: userData,
    isFetching,
    isError,
    error,
  } = useGetMeQuery(undefined, {
    skip: !shouldFetchUser,
    refetchOnMountOrArgChange: true,
    refetchOnReconnect: true,
  });

  // Set user data when query succeeds
  useEffect(() => {
    if (userData?.success && userData?.data) {
      dispatch(setUser(userData.data));
    }
  }, [userData, dispatch]);

  // Clear user data if query fails (token might be invalid)
  useEffect(() => {
    if (isError && token) {
      dispatch(clearUser());
    }
  }, [isError, token, dispatch]);

  // Clear user data when token is removed
  useEffect(() => {
    if (!token && user) {
      dispatch(clearUser());
    }
  }, [token, user, dispatch]);

  return {
    user,
    token,
    isFetching,
    isError,
    error,
    isAuthenticated: !!token && !!user,
  };
};
